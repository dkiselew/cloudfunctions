import shell from 'shelljs';
import getFunctionsList from '~/api/getFunctionsList';
import { getDefaultTemplate, getFunctionFileName, getDependenciesFileName, pathIsValid, envIsValid } from '~/api/functions';

const username = 'user';

// Create new function
export default defineEventHandler(async (event) => {  
  const { path, env } = await readBody(event);    

  // generate function name as random alphanumeric string of length 6
  const name = Math.random().toString(36).substring(2, 8);  

  // check if this function name already exists
  const functions = await getFunctionsList();  
  if (functions.find((func) => func.name === name)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'function already exists',
    });
  }

  if (!pathIsValid(path)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid path',
    });
  }

  if (!envIsValid(env)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid environment name',
    });
  }

  const code = getDefaultTemplate(env);
  const functionFileName = getFunctionFileName(env);
  const dependenciesFileName = getDependenciesFileName(env);
  
  const workspacePath = `${shell.pwd().stdout}/workspace/${username}`;
  const codePath = `${workspacePath}/${name}/${functionFileName}`;
  const dependenciesPath = `${workspacePath}/${name}/${dependenciesFileName}`;

  // cleanup workspace directory 
  shell.rm('-rf', `${workspacePath}/${name}`);
  // create workspace directory 
  shell.mkdir('-p', `${workspacePath}/${name}`);  
  // create function file
  shell.ShellString(code).to(codePath);
  // create dependencies file
  shell.ShellString('{}').to(dependenciesPath);
  // zip workspace directory
  shell.exec(`zip -jr ${workspacePath}/${name}.zip ${workspacePath}/${name}`);

  const createStdout = shell.exec(`fission function create --name ${name} --sourcearchive ${workspacePath}/${name}.zip --env ${env}`).stdout;    
  const triggersStdout = shell.exec(`fission route create --function ${name} --url ${path} --method GET --method POST --method PUT --method DELETE --method HEAD`).stdout;  
    
  return {
    name,
    path,
    env,
  };  
});
