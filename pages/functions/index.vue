<template>
  <div>
    <FunctionsList />
    <!-- <h1 class="text-2xl font-bold mb-4">Functions</h1>
    <div v-if="loading">
      <Spinner size="lg" />
    </div>
    <div v-else class="mb-6">
      <ul class="mb-6">
        <li v-for="func in functions" :key="func.name" class="mb-2 flex gap-x-2">
          <NuxtLink :to="`/functions/edit/${func.name}`" class="w-1/4 p-4 rounded-lg bg-white ring-1 ring-inset ring-gray-300 shadow-sm flex justify-between hover:bg-gray-50">
            <div>{{ func.path }} </div>
            <div class="text-slate-400">{{ func.env }}</div>
          </NuxtLink>
          <a :href="`${appConfig.functionsDomain}${func.path}`" target="_blank" class="p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
            <ArrowTopRightOnSquareIcon class="h-5 w-5" aria-hidden="true" /></a>
        </li>
      </ul>
      <button @click="$router.push('/functions/new')" type="button" class="inline-flex items-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        <PlusIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        New Function
      </button>
    </div> -->
  </div>
</template>

<script>
import { PlusIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import Spinner from '~/components/Spinner.vue';

export default {
  name: 'Functions',
  components: {
    PlusIcon,
    ArrowTopRightOnSquareIcon,
    Spinner,
  },
  setup() {
    definePageMeta({
      middleware: ['auth'],
    });
    const appConfig = useAppConfig();
    return {
      appConfig
     }
  },
  data() {
    return {
      functions: [],
      loading: false,
    }
  },
  mounted() {
     this.getFunctions();
  },
  methods: {
    async getFunctions() {
      this.loading = true;
      this.functions = await $fetch('/api/functions');
      this.loading = false;
    },
  }
}
</script>