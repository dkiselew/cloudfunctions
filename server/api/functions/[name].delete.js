import shell from 'shelljs';
import getFunctionsList from '~/api/getFunctionsList';

const username = 'user';

// Delete existing function
export default defineEventHandler(async (event) => {    
  const namespace = 'default';
  const name = event.context.params.name;

  const functions = await getFunctionsList();  
  const func = functions.find((func) => func.name === name);
  if (!func) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Function not found',
    });
  }    
  
  const workspacePath = `${shell.pwd().stdout}/workspace/${username}`;
  const codePath = `${workspacePath}/${name}`;  

  shell.exec(`fission httptrigger delete --name ${func.triggerName} --namespace ${namespace}`).stdout;      
  shell.exec(`fission function delete --name ${name} --namespace ${namespace}`).stdout;

  // delete code path folder recursively
  shell.rm('-rf', codePath);  
    
  return {};    
});
