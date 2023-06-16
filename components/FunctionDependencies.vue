<template>
  <div>
    <div class="flex flex-row items-center justify-between mb-4">
      <h2 class="text-2xl font-bold">Dependencies</h2>
    </div>    
    <FunctionDependenciesSearch @select="add" class="mb-4" />
    <textarea 
      :value="text"
      @input="$emit('update:dependencies', $event.target.value)"
      class="p-4 font-mono rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full"
      rows="10">
    </textarea>
  </div>
</template>

<script>
import FunctionDependenciesSearch from './FunctionDependenciesSearch.vue';

export default {
  components: {
    FunctionDependenciesSearch,
  },
  props: {
    dependencies: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    text: '',
  }),
  created() {
    this.text = this.dependencies;
  },
  emits: ['update:dependencies'],
  methods: {
    add(dependency) {
      const object = JSON.parse(this.text);
      object.dependencies[dependency.name] = dependency.latest_release_number;
      this.text = JSON.stringify(object, null, 2);
      this.$emit('update:dependencies', this.text);
    },
  }
}
</script>