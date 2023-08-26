import pg from 'pg';
import OpenAI from 'openai';

export default defineEventHandler(async (event) => {
  const { query, prompt } = await readBody(event);
  if (prompt && prompt.length) {
    const sqlQuery = await generateSqlQuery(prompt);    
    return sqlQuery;
  }
  if (query && query.length) {
    const result = await performQuery(query);    
    return result;
  }
  throw new Error('Invalid request: query or prompt must be provided');
});

async function generateSqlQuery(prompt) {
  const apiKey = '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';
  const content = `Create SQL query to ${prompt}. table_schema is "public". Don't include any explanations in your responses.`;  
  const openai = new OpenAI({ apiKey });    
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content }],
    model: 'gpt-3.5-turbo',
    temperature: 0.7,    
  });

  return completion.choices[0].message.content;
}

async function performQuery(sqlQuery) {
  const client = await getDatabaseClient();        
  try {    
    await client.connect();
    const result = await client.query(sqlQuery);
    return result.rows;
  } catch (error) {
    console.error('Error fetching features: ', error);
    throw error;
  } finally {
    await client.end();
  }
}

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