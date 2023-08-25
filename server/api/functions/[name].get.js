import shell from 'shelljs';
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import getFunctionsList from '~/api/getFunctionsList';

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
    const adapter = new JSONFile(`${workspacePath}/archives.json`);
    const defaultData = { posts: [] };
    const db = new Low(adapter, defaultData);
    await db.read();

    const latestArchiveRecord = db.data.find((archive) => archive.name === name);
    if (!latestArchiveRecord) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Archive not found',
      });
    }  

    shell.exec(`fission archive download --id ${latestArchiveRecord.archive} -o ${workspacePath}/${latestArchiveRecord.archive} --namespace ${namespace}`);
    shell.exec(`unzip -o ${workspacePath}/${latestArchiveRecord.archive} -d ${workspacePath}/${name}`);
    shell.exec(`rm ${workspacePath}/${latestArchiveRecord.archive}`);
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