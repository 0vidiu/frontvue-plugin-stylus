/**
 * Name: config-questionnaire.ts
 * Description: Configuration questionnaire
 * Author: Ovidiu Barabula <lectii2008@gmail.com>
 * @since 1.0.0
 */

import defaults from './config-defaults';

export default {
  namespace: 'stylus',

  questions: [
    {
      default: defaults.sourceDir,
      message: 'Set the source directory name',
      name: 'sourceDir',
      type: 'input',
    },
    {
      default: defaults.buildDir,
      message: 'Set the name of the compiled css directory',
      name: 'buildDir',
      type: 'input',
    },
    {
      default: defaults.buildFilename,
      message: 'Set the name of the compiled CSS file',
      name: 'buildFilename',
      type: 'input',
    },
  ],
};
