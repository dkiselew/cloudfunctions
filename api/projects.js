export async function getProjectsByUserId(client, userId) {
  const query = `
  SELECT projects.*
  FROM users
  INNER JOIN users_projects ON users.id = users_projects.user_id
  INNER JOIN projects ON users_projects.project_id = projects.id
  WHERE users.id = $1;`
  const values = [userId];
  const result = await client.query(query, values);

  if (result.rows.length > 0) {
    return result.rows[0];
  } else {
    return null;
  }
}