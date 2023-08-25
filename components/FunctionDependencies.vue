<template>
  <div>
    <div class="flex flex-row items-center justify-between mb-4">
      <h2 class="text-2xl font-bold">Dependencies</h2>
    </div>    
    <FunctionDependenciesSearch @select="add" class="mb-4" />
    <textarea 
      :value="text"
      @input="onChange"
      class="p-4 font-mono rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full"
      rows="10">
    </textarea>
    <div class="text-red-500 text-sm" v-show="isSyntaxError">JSON syntax error</div>
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
    isSyntaxError: false,
  }),
  created() {
    this.text = this.dependencies;
    // console.log(this.text);
    //   const object = JSON.parse(this.text);      
    //   console.log(object);
    //   const dependency = {
    //     name: 'test',
    //     latest_release_number: '1.0.0',
    //   };
    //   object.dependencies[dependency.name] = `^${dependency.latest_release_number}`;
  },
  emits: ['update:dependencies'],
  methods: {
    add(dependency) {      
      const object = JSON.parse(this.text);      
      if (object.hasOwnProperty('dependencies') === false) {
        object.dependencies = {};
      }
      object.dependencies[dependency.name] = `^${dependency.latest_release_number}`;
      this.text = JSON.stringify(object, null, 2);
      this.$emit('update:dependencies', this.text);
    },
    onChange(event) {
      this.text = event.target.value;
      try {
        const object = JSON.parse(this.text); 
        this.isSyntaxError = false;
        this.$emit('update:dependencies', this.text);
      } catch (error) {        
        this.isSyntaxError = true;
      }      
    },
  },
  watch: {
    dependencies() {
      this.text = this.dependencies;
    }
  }
}
</script>