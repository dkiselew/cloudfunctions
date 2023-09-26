import shell from 'shelljs';
import getFunctionsList from '~/api/getFunctionsList';
import { downloadFunctionSource } from '~/api/functions';

const username = 'user';
const project = 'myproject';

export default defineEventHandler(async (event) => {
  const namespace = 'default';
  const name = event.context.params.name;
  const functions = await getFunctionsList();
  const func = functions.find((func) => func.name === name);
  console.log(func);
  if (!func) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Function not found',
    });
  }

  // check if file index.js exists in workspace
  const workspacePath = `${shell.pwd().stdout}/workspace/${username}`;
  const codePath = `${workspacePath}/${name}/index.js`;
  const dependenciesPath = `${workspacePath}/${name}/package.json`;

  if (!shell.test('-f', codePath)) {
    // Download archive
    const archiveFilename = downloadFunctionSource(name, workspacePath);
    if (!archiveFilename) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Archive not found',
      });
    }

    shell.exec(`unzip -o ${archiveFilename} -d ${workspacePath}/${name}`);
    shell.exec(`rm ${archiveFilename}`);
  }

  // Read function code from index.js
  const code = shell.cat(codePath).stdout;

  // Read dependencies file
  const dependencies = shell.cat(dependenciesPath).stdout;

  return {
    ...func,
    code,
    dependencies,
  };
});