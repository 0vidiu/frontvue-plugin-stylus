/**
 * Name: watch.ts
 * Description: Watch for changes in stylus partials
 * Author: Ovidiu Barabula <lectii2008@gmail.com>
 * @since 0.1.0
 */

import chalk from 'chalk';
import * as path from 'path';
import { existsAsync } from '../util/functions';


// Custom error messages
const ERRORS = {
  NO_SOURCE: 'Stylus source directory not found',
};


/**
 * Main task function
 * @param done Async callback function
 * @param pluginProvider Plugin utilities provider
 */
async function taskFn(done: any, { logger, config, paths, gulp }: any = {}) {
  const { sourceDir } = await config.get();
  // Stylus source directory path
  const sourcePath = path.join(paths.sourceDir, sourceDir);

  if (!await existsAsync(sourcePath)) {
    return Promise.reject(new Error(`${ERRORS.NO_SOURCE} ${chalk.cyan(sourcePath)}`));
  }

  // Watch Stylus partials and run stylus:process
  logger.debug('Stylus watcher started\u2026');
  return new Promise(() =>
    gulp.watch(`${sourcePath}/**/**.styl`, gulp.series('stylus:process')));
}

/**
 * Task export object
 */
export default {
  // Meta description
  description: 'Watch for changes in Stylus partials',
  hook: 'watch',
  name: 'stylus:watch',
  taskFn,
};
