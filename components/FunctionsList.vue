<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Functions</h1>
    <div class="text-sm text-gray-400 pl-3" v-if="loading">Loading...</div>
    <div v-else>
      <UVerticalNavigation :links="menuItems" />
      <span v-if="!functions.length" class="text-sm text-gray-400 pl-3">No functions</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      functions: [],
      loading: true,
    }
  },
  created() {
    this.fetchFunctions();
  },
  computed: {
    menuItems() {
      const addFunctionItem = {
        label: 'Create function',
        icon: 'i-heroicons-plus',
        to: '/functions/new'
      };

      const items = this.functions.map((fn) => ({
        label: fn.path,
        icon: 'i-heroicons-code-bracket-square',
        to: `/functions/edit/${fn.name}`
      }));

      return [...items, addFunctionItem];
    }
  },
  methods: {
    async fetchFunctions() {
      this.loading = true;
      this.functions = await $fetch('/api/functions');
      this.loading = false;
    }
  }
}
</script>
