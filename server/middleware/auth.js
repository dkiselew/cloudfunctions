import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = getCookie(event, 'authToken');
  if (token) {
    const tokenResult = jwt.verify(token, config.jwtSecret);
    event.context.user = { ...tokenResult };
  }
});