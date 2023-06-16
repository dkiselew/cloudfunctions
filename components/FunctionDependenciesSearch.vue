<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
    </div>
    <input
      v-model="searchTerm"
      @input="handleInput"
      @focus="isDropdownOpen = true"
      @blur="isDropdownOpen = false"      
      @keydown.escape="isDropdownOpen = false"
      class="w-full px-10 py-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      placeholder="Search and add package..."
    />
    <div v-show="isLoading" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <Spinner />
    </div>

    <div v-if="isDropdownOpen" class="absolute w-full mt-2 bg-white rounded-md shadow-lg">
      <ul>
        <li v-for="result in results" :key="result.id" @click="selectResult(result)" class="px-4 py-2 cursor-pointer hover:bg-gray-100">
          {{ result.name }} <span class="text-gray-400">({{ result.latest_release_number }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Spinner from '~/components/Spinner.vue';

const debounce = (callback, wait = 500) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {      
      callback.apply(null, args);
    }, wait);
  };
}

export default {  
  components: {
    Spinner,
  },
  data() {
    return {
      searchTerm: '',
      results: [],
      isDropdownOpen: false,
      isLoading: false,
    };
  },
  methods: {
    async fetchResults() {      
      this.isLoading = true;
      this.results = await $fetch(`https://libraries.io/api/search?q=${this.searchTerm}&platforms=npm&api_key=0f27f7ecfcfe4f020829c2a0e5812848&per_page=5`);      
      this.isLoading = false;
    },
    handleInput() {      
      if (this.searchTerm === '') {
        this.results = [];
        this.isDropdownOpen = false;
      } else {
        const debouncedSearch = debounce(() => {        
          this.fetchResults();
        });
        debouncedSearch();
        this.isDropdownOpen = true;
      }
    },
    selectResult(result) {
      this.searchTerm = '';
      this.isDropdownOpen = false;
      this.$emit('select', result);
    },    
  },
  // watch: {
  //   searchTerm(newTerm) {
  //     // Fetch results whenever the search term changes
  //     if (newTerm.length >= 3) {
  //       debounce(this.fetchResults());
  //     }
  //   },
  // },
};
</script>

<style>
/* Add Tailwind CSS classes here or import the Tailwind CSS file */
</style>
