import shell from 'shelljs';
import { getFunctionFileName } from '~/api/functions';

const username = 'user';

/**
 * Code autosave
 */
export default defineEventHandler(async (event) => {   
  const { code, env } = await readBody(event);   
  const name = event.context.params.name;

  // Quick check for function name
  // TODO: add more checks
  if (!name.match(/^[a-zA-Z0-9]{6}$/)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid function name',
    });
  }

  const functionFileName = getFunctionFileName(env);
  
  const workspacePath = `${shell.pwd().stdout}/workspace/${username}`;
  const codePath = `${workspacePath}/${name}/${functionFileName}`;

  // put code to workspace directory
  shell.ShellString(code).to(codePath);
});