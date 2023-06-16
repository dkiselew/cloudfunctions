import shell from 'shelljs';
import getFunctionsList from '~/api/getFunctionsList';
import { getFunctionFileName, getDependenciesFileName, pathIsValid } from '~/api/functions';

const username = 'user';

// Update existing function
export default defineEventHandler(async (event) => {  
  const { path, code, dependencies } = await readBody(event); 
  const name = event.context.params.name;

  const functions = await getFunctionsList();  
  const func = functions.find((func) => func.name === name);
  if (!func) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Function not found',
    });
  }  

  if (!pathIsValid(path)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid path',
    });
  }
  
  const functionFileName = getFunctionFileName(func.env);
  const dependenciesFileName = getDependenciesFileName(func.env);
  
  const workspacePath = `${shell.pwd().stdout}/workspace/${username}`;
  const codePath = `${workspacePath}/${name}/${functionFileName}`;
  const dependenciesPath = `${workspacePath}/${name}/${dependenciesFileName}`;  

  // put code to workspace directory
  shell.ShellString(code).to(codePath);
  // put dependencies to workspace directory
  shell.ShellString(dependencies).to(dependenciesPath);
  // zip workspace directory
  shell.exec(`zip -jr ${workspacePath}/${name}.zip ${workspacePath}/${name}/`);

  const createStdout = shell.exec(`fission function update --name ${name} --sourcearchive ${workspacePath}/${name}.zip`).stdout;    

  // Cleanup local archive
  shell.rm(`${workspacePath}/${name}.zip`);    

  // Update path if needed
  if (func.path !== path) {    
    const triggersStdout = shell.exec(`fission httptrigger update --name ${func.triggerName} --url ${path}`).stdout;      
  }    
    
  return {
    createStdout,
    //triggersStdout,
  };    
});
