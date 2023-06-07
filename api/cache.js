const functions = {};

export const setFunctionsCache = (project, value) => {
  functions[project] = value;
}

export const getFunctionsCache = (project) => {
  return functions[project];
}

export const clearFunctionsCache = (project) => {
  functions[project] = null;
}