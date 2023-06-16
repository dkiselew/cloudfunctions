<template>
  <div class="mb-4 -ml-4 flex justify-between">
    <button @click="$router.push('/functions')" type="button" class="inline-flex rounded-md items-center px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50">              
      <ArrowLeftIcon class="h-5 w-5" aria-hidden="true" />
    </button>    
    <slot />
    <div class="flex justify-end gap-x-4">
      <a :href="functionUrl" target="_blank" class="inline-flex items-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        Preview
      </a>
      <button v-if="!saving" @click="$emit('save')" type="button" class="inline-flex items-center rounded-md px-4 py-3 text-sm font-semibold  shadow-sm  text-white bg-blue-600 hover:bg-blue-700">              
          Save      
      </button>    
      <button v-if="saving" disabled type="button" class="inline-flex items-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <Spinner class="mr-3" />
        Saving...
      </button>
    </div>
  </div>
</template>

<script>
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import Spinner from '~/components/Spinner.vue';

export default {
  components: {
    Spinner,
    ArrowLeftIcon,
  },
  props: {
    functionUrl: {
      type: String,
      required: true,
    },
    saving: {
      type: Boolean,
      default: false,
    },
  },  
  data() {
    return {
      tabs: ['code', 'run', 'logs', 'settings'],
    }
  },    
}
</script>