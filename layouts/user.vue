<template>
  <div class="flex h-full h-screen">
    <!-- Navigation -->
    <div class="flex flex-col w-60">
      <div class="p-8">
        <CompanyLogo />
      </div>
      <nav class="flex-grow">
        <ul class="flex flex-col space-y-2 p-4">
          <!-- <li>
            <NuxtLink to="/projects" active-class="bg-gray-300" class="flex items-center py-2 px-4 rounded-md hover:bg-gray-300">
              <HomeIcon class="h-6 w-6 mr-2" />
              <span>Projects</span>
            </NuxtLink>
          </li> -->
        </ul>
      </nav>
      <div>
        <ul class="flex flex-col space-y-2 p-4">
          <li>
            <UserSelector class="p-2" />
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-grow bg-white p-8" style="min-width: 0">
      <!-- Add your main content here -->
      <slot />
    </div>
  </div>
</template>

<script>
import { HomeIcon } from '@heroicons/vue/24/outline'
import UserSelector from '~/components/UserSelector.vue'

export default {
  components: {
    HomeIcon,
    UserSelector,
  },
  data() {
    return {
    }
  }
}
</script>
