import shell from 'shelljs';
import shellParser from 'node-shell-parser';

/**
 * Function logs
 */
export default defineEventHandler(async (event) => {     
  const name = event.context.params.name;  

  // Quick check for function name
  // TODO: add more checks
  if (!name.match(/^[a-zA-Z0-9]{6}$/)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid function name',
    });
  }

  const output = shell.exec(`fission function logs --name ${name} --recordcount=100`, { silent: true }).stdout;
  //const logs = shellParser(output);
  
  if (output.startsWith('Warning:')) {
    return '';
  }
  
  return output;
});