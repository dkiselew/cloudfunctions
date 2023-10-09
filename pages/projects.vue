<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Projects</h1>
    <div class="flex">
      <button v-for="project in projects" class="p-10 border-solid border-2 border-gray-300 hover:border-gray-500 rounded-lg font-medium w-80">
        <div class="text-xl">{{ project.name }}</div>
      </button>
      <button class="p-10 border-dashed border-2 border-gray-300 hover:border-gray-500 rounded-lg font-medium w-80">
        <FolderPlusIcon class="h-10 w-10 inline-block text-gray-500" />
        <div class="mt-1">Create new project</div>
      </button>
    </div>
    {{ projects }}
  </div>
</template>

<script setup>
import { FolderPlusIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'user',
  middleware: ['auth'],
});

const { data: projects } = await useFetch('/api/projects');
</script>