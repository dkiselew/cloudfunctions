<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Database</h1>
    <div class="flex">
      <DatabaseTables class="w-32 mr-6" />
      <DatabaseDashboard class="flex-grow" />
    </div>    
  </div>
</template>

<script>
import { PlusIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import Spinner from '~/components/Spinner.vue';
import DatabaseDashboard from '~/components/DatabaseDashboard.vue';

export default {
  name: 'Database',
  components: {
    PlusIcon,
    ArrowTopRightOnSquareIcon,
    Spinner,
    DatabaseDashboard,
  },
  
}
</script>