<template>    
  <div class="flex h-screen">
    <!-- Navigation -->
    <div class="flex flex-col bg-gray-200 w-1/6">
      <div class="p-4">
        <h2 class="text-xl font-bold">Magic</h2>
      </div>
      <nav class="flex-grow">
        <ul class="flex flex-col space-y-2 p-4">
          <li>
            <a href="/functions" class="flex items-center py-2 px-4 rounded-md hover:bg-gray-300 bg-gray-300">              
              <BoltIcon class="h-6 w-6 mr-2" />
              <span>Functions</span>
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center py-2 px-4 rounded-md hover:bg-gray-300">
              <AdjustmentsHorizontalIcon class="h-6 w-6 mr-2" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    
    <!-- Main Content -->
    <div class="flex-grow bg-white p-8">      
      <!-- Add your main content here -->
      <slot />
    </div>
  </div>
</template>

<script>
import { AdjustmentsHorizontalIcon, BoltIcon } from '@heroicons/vue/24/outline'

export default {
  components: {
    AdjustmentsHorizontalIcon,
    BoltIcon,
  },
  data() {
    return {  
    }
  }
}
</script>
