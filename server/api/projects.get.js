import { getProjectsByUserId } from "~/api/projects";

export default defineEventHandler((event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized',
    });
  }

  const app = useNitroApp();
  return getProjectsByUserId(app.$database, event.context.user.id);
});