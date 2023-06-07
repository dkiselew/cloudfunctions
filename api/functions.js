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