import pg from 'pg';

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig();
  const client = new pg.Client({
    user: config.dbUser,
    host: config.dbHost,
    password: config.dbPassword,
    database: 'defaultdb',
    port: 25060,
    ssl: true,
  });

  await client.connect();

  nitroApp.$database = client;
})