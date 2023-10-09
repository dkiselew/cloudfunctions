export default defineNuxtRouteMiddleware(async (to, from) => {
  const authUser = useCookie('authUser');
  if (!authUser.value) {
    return navigateTo('/login');
  }
  const user = useState('user');
  if (!user.value) {
    const { data: userData } = await useFetch('/api/user');
    user.value = userData;
    console.log("user fetched from server", userData);
  }
});