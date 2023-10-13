import prisma from '~/api/prisma';

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized',
    });
  }

  return await prisma.users.findUnique({
    where: {
      id: event.context.user.id
    },
    select: {
      id: true,
      email: true,
      name: true,
      projects: {
        select: {
          id: true,
          name: true,
        }
      }
    },
  });
});