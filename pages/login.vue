<template>
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <NuxtLink to="/"><img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"></NuxtLink>
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <UInput name="email" type="email" variant="outline" :required="true" v-model="email" />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <UInput name="password" type="password" :required="true" v-model="password" />
        </div>
      </div>

      <div>
        <button @click="login" :loading="loading" type="button" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        <div v-if="error" class="mt-4 text-red-500 text-center">Wrong user or password</div>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
    </p>
  </div>
</div>
</template>

<script setup>
definePageMeta({
  layout: 'visitor',
});

const email = ref('dkiselew@gmail.com');
const password = ref('12345');
const loading = ref(false);
const error = ref(false);
const authUser = useCookie('authUser');
const redirectTo = '/functions';

if (authUser.value) {
  navigateTo(redirectTo);
}

const login = async () => {
  const payload = {
    email: email.value,
    password: password.value,
  };
  loading.value = true;

  try {
    await $fetch('/api/login', { method: 'post', body: payload });
    navigateTo(redirectTo);
  } catch (e) {
    error.value = true;
  } finally {
    loading.value = false;
  }
};
</script>