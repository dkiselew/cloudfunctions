<template>
  <div>
    <UButton icon="i-heroicons-sparkles" color="white" variant="solid" label="AI assistant" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <div class="p-6">
        <h3 class="text-xl font-bold mb-3">What do you want to do?</h3>
        <textarea 
          v-model="prompt"      
          :disabled="loading"
          placeholder="Example: get list of all tables"
          class="mb-2 p-4 font-mono rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full"
          rows="3">
        </textarea>     
        <UButton 
          :loading="loading"
          variant="outline"
          @click="generateQuery">
          Generate query
        </UButton>                   
      </div>
    </UModal>
  </div>
</template>

<script>
export default {    
  data: () => ({
    isOpen: false,
    prompt: '',        
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
        this.$emit('generated', response);
        this.isOpen = false;
      })
      .catch((error) => {        
        this.toast.add({ title: error.data.message, icon: 'i-heroicons-x-circle', color: 'red' });        
      })
      .finally(() => {
        this.loading = false;
      });
    },    
  }
}
</script>
