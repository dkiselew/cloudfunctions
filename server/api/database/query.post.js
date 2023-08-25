import pg from 'pg';

export default defineEventHandler(async (event) => {
  const { query } = await readBody(event);    
  const client = await getDatabaseClient();        
  
  try {    
    await client.connect();
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching features: ', error);
    
    throw error;
  } finally {
    await client.end();
  }
});

function getDatabaseClient() {
  const client = new pg.Client({
    user: 'doadmin',
    host: 'db-postgresql-fra1-31287-do-user-13158922-0.b.db.ondigitalocean.com',
    database: 'defaultdb',
    password: 'AVNS_Q1leQKChch95DuYDaz1',
    port: 25060,
    ssl: true,
  });  
  return client;
}