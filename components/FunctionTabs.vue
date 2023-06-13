<template>
  <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">    
    <li v-for="item in tabs" class="mr-2 capitalize">
      <a href="#" @click="$emit('selected', item)" :class="getLinkClass(item)">{{ item }}</a>
    </li>    
  </ul>  
</template>

<script>
export default {
  props: {
    tab: {
      type: String,
      default: 'code',
    },
  },  
  data() {
    return {
      tabs: ['code', 'run', 'logs', 'dependencies', 'settings'],
    }
  },  
  methods: {
    getLinkClass(item) {
      return this.tab === item ? 
        'inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active' :
        'inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white';            
    },    
  }
}
</script>