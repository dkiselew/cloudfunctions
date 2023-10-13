import prisma from '~/api/prisma';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { email } = await readBody(event);

  const user = await prisma.users.findUnique(({
    where: {
      email
    },
  }));

  // TODO: Add password check

  if (!user) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Wrong email or password',
    });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret);

  setCookie(event, 'authToken', token, { httpOnly: true, secure: true, sameSite: 'none' });
  setCookie(event, 'authUser', user.email);

  return { user };
});