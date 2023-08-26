<template>
  <div class="h-full p-4 rounded-md bg-slate-50">
    <div class="flex items-center mb-4">      
      <button v-if="!loading" @click="refresh" type="button" class="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">              
        Refresh  
      </button>    
      <button v-if="loading" disabled type="button" class="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <Spinner class="mr-3" />
        Loading...
      </button>
    </div>        
    <div style="min-width: 0;">
      <div class="text-xs font-mono mb-6"
        v-html="logs ? logs : 'Nothing to show yet...'"
        style="white-space: pre; overflow: auto; height: 550px;"
      >        
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
  mounted() {
    this.refresh();
  },
  methods: {    
    async refresh() {    
      this.loading = true;        
      this.logs = await $fetch(`/api/functions/${this.functionName}/logs`);    
      this.loading = false;
      this.logs = this.cleanLogs(this.logs);
      this.logs = this.hightlightLogs(this.logs);
    },
    // wrap logs in span with red color if it starts with "Function error"
    hightlightLogs(logs) {      
      return logs.split('\n').map((log) => {
        if (log.startsWith('Function error')) {
          return `<span class="text-red-500">${log}</span>`;
        }
        if (log.startsWith('::ffff:')) {
          return `<span class="text-gray-400">${log}</span>`;
        }
        if (log.startsWith('(node:25) Warning:')) {
          return `<span class="text-gray-500">${log}</span>`;
        }
        return log;
      }).join('\n');
    },
    // remove logs from fission-nodejs-runtime
    cleanLogs(logs) {      
      return logs.split('\n').filter((log) => {
        return !log.includes('POST /v2/specialize HTTP/1.1') 
          && !log.includes('> fission-nodejs-runtime@0.1.0 start /usr/src/app')
      }).join('\n');
    },
  }
}
</script>