<template>
<div class="w-1/2 mx-auto">
  <h1 class="text-2xl font-bold mb-4">New function</h1>
  <form class="border-b border-gray-900/10 pb-12">    
    <div class="sm:col-span-4 mb-6">
      <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Endpoint URL path</label>
      <div class="mt-2">
        <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">/</span>
          <input v-model="form.path" required type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 focus:outline-0  sm:text-sm sm:leading-6" >
        </div>
      </div>
    </div>

    <div class="sm:col-span-4 mb-6">
      <label for="language" class="block text-sm font-medium leading-6 text-gray-900">Language</label>
      <ul class="grid w-full gap-6 md:grid-cols-2 mt-2">
        <li>
          <input v-model="form.language" type="radio" id="node" name="language" value="node" class="hidden peer" required>
          <label for="node" class="inline-flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm">                           
              NodeJS
          </label>
        </li>
        <li>
          <input v-model="form.language" type="radio" id="php" name="language" value="php" class="hidden peer">
          <label for="php" class="inline-flex items-center justify-between w-full p-4 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-indigo-600 peer-checked:text-indigo-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm">
              PHP                
          </label>
        </li>
      </ul>
    </div>    
  </form>
  <div class="py-6 flex justify-end gap-x-4">        
    <button v-if="!loading" @click="$router.push('/functions')" type="button" class="inline-flex rounded-md items-center px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50">              
      Cancel
    </button>    
    <button v-if="!loading" @click="create" type="button" class="inline-flex items-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">              
      Create      
    </button>    
    <button v-if="loading" disabled type="button" class="inline-flex items-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <Spinner class="mr-3" />
        Creating...
    </button>
  </div>  
</div>
</template>

<script>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import Spinner from '~/components/Spinner.vue';

export default {
  components: {
    ArrowRightIcon,
    Spinner,
  },
  data() {
    return {
      form: {
        path: '',
        language: null,
      },
      loading: false,      
    }
  },
  methods: {
    async create() {
      this.loading = true;
      try {
        await $fetch('/api/functions', { method: 'post', body: this.form });         
        this.$notify({
          group: "generic",
          title: "Done",
          text: "Function created successfully"
        }, 5000);
      } catch (e) {
        this.$notify({
          group: "error",
          title: "Error",
          text: "Function could not be created."
        }, 5000);
        console.log(e);
      } finally {
        this.loading = false;        
      }    
    }
  }
}
</script>