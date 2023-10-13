export async function getProjectsByUserId(client, userId) {
  const query = `SELECT * FROM projects WHERE user_id = $1;`
  const values = [userId];
  const result = await client.query(query, values);

  if (result.rows.length > 0) {
    return result.rows[0];
  } else {
    return null;
  }
}

export async function createProject(client) {

}