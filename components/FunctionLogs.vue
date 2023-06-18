<template>
  <div class="h-full p-4 rounded-md bg-slate-50">
    <div class="flex items-center mb-4">
      <h3 class="text-lg leading-6 font-medium text-gray-900 mr-4">Logs</h3>
      <button v-if="!loading" @click="refresh" type="button" class="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">              
        Refresh  
      </button>    
      <button v-if="loading" disabled type="button" class="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <Spinner class="mr-3" />
        Loading...
      </button>
    </div>        
    <div style="min-width: 0" class="h-full">
      <div class="text-xs font-mono mb-6" style="white-space: pre; overflow: auto; ">
        {{ logs ? logs : 'Nothing to show yet...' }}
      </div>              
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
    functionName: {
      type: String,
      required: true,
    },    
  },
  data() {
    return {      
      logs: null,
      loading: false,
    }
  },
  methods: {    
    async refresh() {    
      this.loading = true;        
      this.logs = await $fetch(`/api/functions/${this.functionName}/logs`);    
      this.loading = false;
    },
  }
}
</script>