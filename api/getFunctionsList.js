import shell from 'shelljs';
import shellParser from 'node-shell-parser';

export default () => {  
  const functionsStdout = shell.exec('fission function list', { silent: true }).stdout;
  const functions = shellParser(functionsStdout);

  // TODO: run in parallel
  const triggersStdout = shell.exec('fission httptrigger list', { silent: true }).stdout;
  const triggers = shellParser(triggersStdout);

  return functions.map((func) => {
    const trigger = triggers.find((trigger) => trigger['FUNCTION(s)'] === func.NAME);
    return {
      name: func.NAME,
      env: func.ENV,
      method: trigger ? trigger.METHOD : null,
      url: trigger ? trigger.URL : null,
      path: trigger ? trigger.PATH : null,
      triggerName: trigger ? trigger.NAME : null,      
    };
  });  
}