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
  },
  emits: ['update:path']
}
</script>