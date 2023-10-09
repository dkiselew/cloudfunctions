import jwt from 'jsonwebtoken';
import { getUserByEmail } from '~/api/users';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const app = useNitroApp();
  const { email } = await readBody(event);
  const user = await getUserByEmail(app.$database, email);

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