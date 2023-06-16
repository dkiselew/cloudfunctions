<template>
  <div class="sm:col-span-4 mb-6">
    <label for="path" class="block text-sm font-medium leading-6 text-gray-900">Endpoint URL path</label>
    <div class="mt-2">
      <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">            
        <input 
          :value="path"
          @input="$emit('update:path', $event.target.value)"
          required
          type="text"
          name="path"
          id="path"
          autocomplete="path"
          class="font-mono block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:ring-offset-0 focus:outline-0  sm:text-sm sm:leading-6"
        />
      </div>
      <div class="mt-8">
        <button @click="showDeleteModal" type="button" class="inline-flex items-center rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600">              
          Delete Function  
        </button>    
        <dialog ref="deleteModal" class="p-4 rounded-lg shadow-lg">
          <div>
            <div class="mb-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Delete Function</h3>
              <p class="mt-1 text-sm text-gray-500">Are you sure you want to delete this function?</p>
            </div>
            <div class="flex flex-row space-x-4 justify-start">
              <button v-if="!loading" @click="deleteFunction" type="button" class="inline-flex items-center rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600">              
                Delete  
              </button> 
              <button v-if="loading" type="button" class="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm text-gray-500">              
                <Spinner class="mr-3" />
                Deleting...
              </button>                           
              <button v-if="!loading" @click="$refs.deleteModal.close()" type="button" class="inline-flex items-center rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600">              
                Cancel  
              </button>    
            </div>
          </div>
        </dialog>
      </div>
    </div>
  </div>   
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  emits: ['update:path'],
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    showDeleteModal() {
      this.$refs.deleteModal.showModal();
    },
    async deleteFunction() {      
      this.$refs.deleteModal.close();      
      try {
        this.loading = true;
        await $fetch(`/api/functions/${this.name}`, { method: 'DELETE' });
        this.$notify({
          group: "success",
          title: "Done",
          text: "Function deleted"
        }, 5000);
        this.$router.push('/functions');
        this.loading = false;
      } catch (e) {
        this.$notify({
          group: "error",
          title: "Error",
          text: e.message
        }, 5000);
      }
    }
  }
}
</script>