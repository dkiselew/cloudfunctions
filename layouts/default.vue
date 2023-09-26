<template>    
  <div class="flex h-full h-screen">
    <!-- Navigation -->
    <div class="flex flex-col bg-gray-100 w-60">
      <div class="p-4">
        <h2 class="text-xl font-bold">Project</h2>
      </div>
      <nav class="flex-grow">
        <ul class="flex flex-col space-y-2 p-4">
          <li>
            <NuxtLink to="/functions" active-class="bg-gray-300" class="flex items-center py-2 px-4 rounded-md hover:bg-gray-300">              
              <BoltIcon class="h-6 w-6 mr-2" />
              <span>Functions</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/database" active-class="bg-gray-300" class="flex items-center py-2 px-4 rounded-md hover:bg-gray-300">              
              <CircleStackIcon class="h-6 w-6 mr-2" />
              <span>Database</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/settings" active-class="bg-gray-300" class="flex items-center py-2 px-4 rounded-md hover:bg-gray-300">
              <AdjustmentsHorizontalIcon class="h-6 w-6 mr-2" />
              <span>Settings</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="p-4 text-gray-300">v1</div>        
    </div>
    
    <!-- Main Content -->
    <div class="flex-grow bg-white p-8" style="min-width: 0">      
      <!-- Add your main content here -->
      <slot />
    </div>
  </div>
</template>

<script>
import { AdjustmentsHorizontalIcon, BoltIcon, CircleStackIcon } from '@heroicons/vue/24/outline'

export default {
  components: {
    AdjustmentsHorizontalIcon,
    BoltIcon,
    CircleStackIcon,
  },
  data() {
    return {  
    }
  }
}
</script>
