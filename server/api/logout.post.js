export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized',
    });
  }

  deleteCookie(event, 'authToken');
  deleteCookie(event, 'authUser');

  return {};
});