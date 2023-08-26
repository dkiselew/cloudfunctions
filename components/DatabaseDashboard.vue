<template>
  <div>    
    <div class="pb-6">
      <h3>What do you want to do?</h3>
      <textarea 
        v-model="prompt"      
        placeholder="Example: get list of all tables"
        class="p-4 font-mono rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full"
        rows="3">
      </textarea>
      <button @click="generateQuery" type="button" class="inline-flex items-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-blue-600 hover:bg-blue-700">              
        Generate query
      </button>        
    </div>

    <div class="pb-6">
      <h3 class="text-xl font-bold">SQL</h3>
      <textarea 
        v-model="query"      
        placeholder=""
        class="p-4 font-mono rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full"
        rows="4">
      </textarea>    
      <button @click="runQuery" type="button" class="inline-flex items-center rounded-md px-4 py-3 text-sm font-semibold text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">              
        Run query
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
export default {
  data: () => ({
    prompt: '',
    //query: `select * from information_schema.tables where table_schema = 'public'`,
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
        //console.log(error, error.message);
        this.response = error.data.message;
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
        //console.log(error, error.message);
        this.response = error.data.message;
      })
      .finally(() => {
        this.loading = false;
      });
    }
  }
}
</script>