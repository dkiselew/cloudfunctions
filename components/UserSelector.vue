<template>
  <UDropdown :items="items" :popper="{ placement: 'top-start' }">
    <UButton
      icon="i-heroicons-user-circle"
      color="white"
      :label="user.email"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    />
  </UDropdown>
</template>

<script setup>
const user = useState('user');
const logout = async () => {
  await useFetch('/api/logout', { method: 'POST' });
  navigateTo('/login');
};
const projectsMenuItems = [
  {
    label: 'Project 1',
    icon: 'i-heroicons-folder-solid',
  }
];
const items = ref([
  [{
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    }
  }], [
    ...projectsMenuItems,
  {
    label: 'Create new project',
    icon: 'i-heroicons-folder-plus-solid',
    disabled: true,
    click: () => {
      console.log('Edit')
    }
  }], [{
    label: 'Sign Out',
    icon: 'i-heroicons-arrow-left-on-rectangle-solid',
    click: logout
  }]
]);
</script>