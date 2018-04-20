/**
 * Name: clean.ts
 * Description: Clean output directory
 * Author: Ovidiu Barabula <lectii2008@gmail.com>
 * @since 1.0.0
 */

import * as path from 'path';
import * as rimraf from 'rimraf';


/**
 * Main task function
 * @param done Async callback function
 * @param pluginProvider Plugin utilities provider
 */
async function taskFn(done: any, { config, paths }: any = {}) {
  const { buildDir } = await config.get();
  // Compiled CSS path
  const dest = path.join(paths.buildDir, buildDir);
  return new Promise((resolve, reject) =>
    // Remove CSS compiled folder
    rimraf(dest, error => error ? reject(error) : resolve()));
}


/**
 * Task export object
 */
export default {
  // Meta description
  description: 'Remove compiled Stylus files',
  hook: 'clean',
  name: 'stylus:clean',
  taskFn,
};
