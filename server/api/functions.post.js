import shell from 'shelljs';
import shellParser from 'node-shell-parser';
import getFunctionsList from '~/api/getFunctionsList';

const username = 'user';
const project = 'myproject';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default defineEventHandler(async (event) => {  
  const { path, language } = await readBody(event);  
  const name = project + '-' + path.replace(/\//g, '-');

  const functions = getFunctionsList();  
  if (functions.find((func) => func.name === name)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'function already exists',
    })
  }

  const code = getDefaultTemplate(language);
  const environment = getEnvironmentName(language);
  const extension = getFileExtension(language);
  
  const workspacePath = `${shell.pwd().stdout}/workspace/${username}/${name}`;
  const codePath = `${workspacePath}/index.${extension}`;

  // cleanup workspace directory 
  shell.rm('-rf', workspacePath);
  // create workspace directory 
  shell.mkdir('-p', workspacePath);  
  // create function file
  shell.ShellString(code).to(codePath);
  // create package.json file in workspace directory  
  shell.ShellString('{}').to(`${workspacePath}/package.json`);
  // zip workspace directory
  shell.exec(`zip -jr ${workspacePath}/${name}.zip ${workspacePath}/`);

  const createStdout = shell.exec(`fission function create --name ${name} --sourcearchive ${workspacePath}/${name}.zip --env ${environment}`).stdout;    
  const triggersStdout = shell.exec(`fission route create --function ${name} --url ${path} --method GET --method POST --method PUT --method DELETE --method HEAD`).stdout;  
    
  return {
    createStdout,
    triggersStdout,
  };  
});

//zip -jr moment.zip moment/
//fission fn create --name moment --sourcearchive moment.zip --env node

function getEnvironmentName(language) {
  switch (language) {
    case 'node':
      return 'node';
    case 'python':
      return 'python';
    case 'php':
      return 'php';  
  }
}

function getFileExtension(language) {
  switch (language) {
    case 'node':
      return 'js';
    case 'python':
      return 'py';
    case 'php':
      return 'php';  
  }
}

function getDefaultTemplate(language) {
  switch (language) {
    case 'node':
      return getNodeDefaultTemplate();
    case 'python':
      return getPythonDefaultTemplate();
    case 'php':
      return getPhpDefaultTemplate();  
  }
}

function getNodeDefaultTemplate() {
  return `module.exports = function(context) {
  return {
    status: 200,
    body: {
      text: 'Hello, world!'
    }
  };
};`;
}

function getPhpDefaultTemplate() {
  return `<?php ` + "\n" + `function main() {` + "\n" + `  return "Hello, world!";` + "\n" + `}` + "\n" + `?>`;
}

function getPythonDefaultTemplate() {
  return `def main():
  return "Hello, world!"`;
}