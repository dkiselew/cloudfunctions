<template>
  <div>    
    <h3>SQL Console</h3>
    <textarea 
      v-model="query"      
      placeholder=""
      class="p-4 font-mono rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full"
      rows="4">
    </textarea>
    
    <button @click="runQuery" type="button" class="inline-flex items-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">              
      Run Query
    </button>  
    <div class="py-4 text-sm">
      <pre style="height: 400px; overflow: scroll;">{{ response }}</pre>
    </div>
    
  </div>
</template>

<script>
export default {
  data: () => ({
    query: `select * from information_schema.tables where table_schema = 'public'`,
    response: '',
  }),
  methods: {
    runQuery() {
      this.response = 'Loading...';
      $fetch('/api/database/query', {
        method: 'POST',
        body: JSON.stringify({ query: this.query }),
      })
      .then((response) => {
        this.response = response;
      })
      .catch((error) => {
        //console.log(error, error.message);
        this.response = error.data.message;
      });
    }
  }
}
</script>