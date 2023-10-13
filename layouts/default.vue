<template>
  <div class="flex h-full h-screen">
    <!-- Navigation -->
    <div class="flex flex-col w-48 pt-4">
      <div class="px-4">
        <CompanyLogo />
      </div>
      <div class="p-4">
        <h2 class="text-xl font-bold">Project 1</h2>
      </div>
      <nav class="flex-grow">
        <ul class="flex flex-col space-y-2 p-4">
          <li>
            <NuxtLink to="/functions" active-class="bg-gray-50 text-primary-600" class="flex items-center py-2 px-4 rounded-md font-medium hover:bg-gray-50">
              <BoltIcon class="h-6 w-6 mr-2" />
              <span>Functions</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/database" active-class="bg-gray-50 text-primary-600" class="flex items-center py-2 px-4 rounded-md font-medium hover:bg-gray-50">
              <CircleStackIcon class="h-6 w-6 mr-2" />
              <span>Database</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/settings" active-class="bg-gray-50 text-primary-600" class="flex items-center py-2 px-4 rounded-md font-medium hover:bg-gray-50">
              <AdjustmentsHorizontalIcon class="h-6 w-6 mr-2" />
              <span>Settings</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <ul class="flex flex-col space-y-2 p-2">
        <li>
          <UserSelector class="p-2" />
        </li>
      </ul>
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
