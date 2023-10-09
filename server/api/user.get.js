import { getUserById } from '~/api/users';

export default defineEventHandler((event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized',
    });
  }

  const app = useNitroApp();
  return getUserById(app.$database, event.context.user.id);
});