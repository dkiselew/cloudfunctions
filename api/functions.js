import shell from 'shelljs';
import fs from 'fs';

export function getFunctionFileName(env) {
  switch (env) {
    case 'node':
      return 'index.js';
    case 'python':
      return 'main.py';
    case 'php':
      return 'index.php';
  }
}

export function getDependenciesFileName(env) {
  switch (env) {
    case 'node':
      return 'package.json';
    case 'python':
      return 'requirements.txt';
    case 'php':
      return 'composer.json';
  }
}

export function getDefaultTemplate(env) {
  switch (env) {
    case 'node':
      return getNodeDefaultTemplate();
    case 'python':
      return getPythonDefaultTemplate();
    case 'php':
      return getPhpDefaultTemplate();
  }
}

export function getNodeDefaultTemplate() {
  return `module.exports = function(context) {
  return {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: {
      text: 'Hello, world!'
    }
  };
};`;
}

export function getPhpDefaultTemplate() {
  return `<?php ` + "\n" + `function main() {` + "\n" + `  return "Hello, world!";` + "\n" + `}` + "\n" + `?>`;
}

export function getPythonDefaultTemplate() {
  return `def main():
  return "Hello, world!"`;
}

/**
 * Check if path is valid url path string (includes only letters, numbers, dashes, slashes)
 */
export function pathIsValid(path) {
  return /^\/[a-zA-Z0-9\-\/]+$/.test(path);
}

/**
 * Check env is valid existing environment
 */
export function envIsValid(env) {
  return ['node', 'python', 'php'].includes(env);
}

/**
 * Get function source from archive
 */
export function downloadFunctionSource(name, workspacePath) {
  const functionDefinition = getFunctionDefinition(name);
  if (functionDefinition) {
    const packageDefinition = getPackageDefinition(functionDefinition.spec.package.packageref.name);
    if (packageDefinition) {
      return downloadSourceArchive(packageDefinition, workspacePath);
    }
  }
}

function getFunctionDefinition(name) {
  const result = shell.exec(`kubectl get function.fission.io/${name} --namespace=default -o json`).stdout;
  return JSON.parse(result);
}

function getPackageDefinition(name) {
  const result = shell.exec(`kubectl get packages.fission.io/${name} --namespace=default -o json`).stdout;
  return JSON.parse(result);
}

function downloadSourceArchive(packageDefinition, workspacePath) {
  if (packageDefinition.spec.source.type !== 'literal') {
    throw new Error('Source type is not literal and must be downloaded');
  }
   const buffer = Buffer.from(packageDefinition.spec.source.literal, 'base64');
   const filename = `${workspacePath}/myarchive.zip`

   fs.writeFileSync(filename, buffer);
   return filename;
}