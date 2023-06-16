<template>
  <div class="h-full p-4 rounded-md bg-slate-50">
    <div class="flex items-center mb-4">
      <div class="font-mono sm:text-sm">
        GET
      </div>
      <input 
        :value="url"        
        required
        type="text"
        name="url"                
        class="font-mono block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 focus:outline-0 sm:text-sm sm:leading-6"
      />
      <button v-if="!loading" @click="exec" type="button" class="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">              
        Run  
      </button>    
      <button v-if="loading" disabled type="button" class="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <Spinner class="mr-3" />
        Loading...
      </button>
    </div>        
    <div class="text-xs font-mono mb-6" style="white-space: pre; overflow: scroll;">
      {{ response !== '' ? response : 'Response is empty' }}
    </div>              
  </div>
</template>

<script>
import Spinner from '~/components/Spinner.vue';

export default {
  components: {
    Spinner,
  },
  props: {
    functionUrl: {
      type: String,
      required: true,
    },
    saving: {
      type: Boolean,
      default: false,
    },
  },  
  data() {
    return {
      url: this.functionUrl,
      response: null,
      loading: false,
    }
  },
  methods: {
    async exec() {      
      this.response = null;
      this.loading = true;
      this.response = await $fetch(this.url);    
      this.loading = false;
      this.$emit('executed');
    },
  }
}
</script>