<template>
  <div>        
    <div class="mb-6">
      <div class="flex items-center mb-2">
        <!-- <h3 class="text-xl font-bold mr-4">SQL</h3> -->
        <DatabaseQueryAssistant @generated="query = $event" />
      </div>
      <textarea 
        v-model="query"      
        placeholder="Example: select * from information_schema.tables where table_schema = 'public'"
        class="mb-1 p-4 font-mono rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full"
        rows="4">
      </textarea>    
      <button @click="runQuery" type="button" class="inline-flex items-center rounded-md px-4 py-3 text-sm font-semibold text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">              
        Run SQL query
      </button>  
    </div>

    <div v-show="loading">
      <Spinner size="lg" />
    </div>

    <div v-show="response" class="py-4 text-sm">
      <h3 class="text-xl font-bold">Result</h3>
      <pre class="w-full" style="overflow-x: scroll;">{{ response }}</pre>
    </div>
    
  </div>
</template>

<script>
import DatabaseQueryAssistant from './DatabaseQueryAssistant.vue';
import Spinner from '~/components/Spinner.vue';

export default {
  components: {
    DatabaseQueryAssistant,
    Spinner,
  },
  data: () => ({
    prompt: '',    
    query: '',
    response: null,
    loading: false,
  }),
  methods: {
    generateQuery() {
      this.loading = true;
      $fetch('/api/database/query', {
        method: 'POST',
        body: JSON.stringify({ prompt: this.prompt }),
      })
      .then((response) => {
        this.query = response;        
      })
      .catch((error) => {
        this.toast.add({ title: error.data.message, icon: 'i-heroicons-x-circle', color: 'red' });        
      })
      .finally(() => {
        this.loading = false;
      });
    },
    runQuery() {
      this.loading = true;
      $fetch('/api/database/query', {
        method: 'POST',
        body: JSON.stringify({ query: this.query }),
      })
      .then((response) => {
        this.response = response;        
      })
      .catch((error) => {
        this.toast.add({ title: error.data.message, icon: 'i-heroicons-x-circle', color: 'red' });        
      })
      .finally(() => {
        this.loading = false;
      });
    }
  }
}
</script>