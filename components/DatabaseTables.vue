<template>  
  <div class="text-sm text-gray-400 pl-3" v-if="loading">Loading...</div>
  <div v-else>
    <UVerticalNavigation :links="menuItems" />    
    <span v-if="!tables.length" class="text-sm text-gray-400 pl-3">No tables</span>
  </div>
</template>

<script>
export default {
  data() {
    return {      
      tables: [],      
      loading: true,
    }
  },
  created() {
    this.fetchTables();
  },
  computed: {
    menuItems() {
      const editorItem = {
        label: 'SQL editor',
        icon: 'i-heroicons-command-line',
        to: '/database'
      };

      const tablesItems = this.tables.map((table) => ({
        label: table,
        icon: 'i-heroicons-table-cells',
        to: `/database/${table}`,
      }));      

      return [editorItem, ...tablesItems];
    }
  },
  methods: {
    fetchTables() {
      const query = `select * from information_schema.tables where table_schema = 'public'`;      

      this.loading = true;      
      $fetch('/api/database/query', {
        method: 'POST',
        body: JSON.stringify({ query }),
      })
      .then((response) => {
        this.tables = response.map(record => record['table_name']);
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
