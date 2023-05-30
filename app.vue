<template>    
  <NuxtLayout>
    <NuxtPage />
    <ToastNotifications />  
  </NuxtLayout>
</template>

<script>
import ToastNotifications from '~/components/ToastNotifications.vue'

export default {
  components: {
    ToastNotifications
  }
}
</script>
