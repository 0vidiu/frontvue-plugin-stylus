/**
 * Name: process.ts
 * Description: Process Stylus partials
 * Author: Ovidiu Barabula <lectii2008@gmail.com>
 * @since 1.0.0
 */

import * as autoprefixer from 'autoprefixer-stylus';
import chalk from 'chalk';
import * as gulpif from 'gulp-if';
import * as insert from 'gulp-insert';
import * as plumber from 'gulp-plumber';
import * as sourcemaps from 'gulp-sourcemaps';
import * as stylint from 'gulp-stylint';
import * as stylus from 'gulp-stylus';
import * as uglify from 'gulp-uglifycss';
import * as path from 'path';
import { existsAsync } from '../util/functions';


// Custom messages
const STRINGS = {
  NO_ENTRY_POINT: 'Make sure the Stylus template files have been copied by running the <template> tasks',
};

// Custom error messages
const ERRORS = {
  ENTRYPOINT_NOT_FOUND: 'Stylus entry point not found',
};


/**
 * Check if main entry point file exists
 * @param filepath Entry point path
 * @param logger Logger instance
 */
async function checkEntrypoint(filepath: string, logger: any): Promise<boolean> {
  // Check if entry point file exists
  let hasEntryPoint: boolean = false;
  try {
    hasEntryPoint = await existsAsync(filepath);
  } catch (error) {
    logger.fatal(error.message);
    return false;
  }

  // Log out error message if entry point not found
  if (!hasEntryPoint) {
    logger.warn(STRINGS.NO_ENTRY_POINT);
    return false;
  }

  return hasEntryPoint;
}


/**
 * Main task function
 * @param done Async callback function
 * @param pluginProvider Plugin utilities provider
 */
async function taskFn(done: any, { logger, config, paths, env, gulp }: any = {}): Promise<any> {
  // TODO: Cache config related variables to run only one time
  const {
    buildDir, buildFilename, entryPoint, sourceDir,
  } = await config.get();

  // Stylus source directory
  const sourceDirPath: string = path.join(paths.sourceDir, sourceDir);
  // Stylus entry point file path
  const entryPointPath: string = path.join(sourceDirPath, entryPoint);
  // Compiled CSS path
  const dest: string = path.join(paths.buildDir, buildDir);

  // Check if Stylus entry point file exists
  if (!await checkEntrypoint(entryPointPath, logger)) {
    return Promise.reject(
      new Error(`${ERRORS.ENTRYPOINT_NOT_FOUND} ${chalk.cyan.bold(entryPointPath)}`),
    );
  }

  // Plugins configs
  const configs = {
    // Stylint configuration
    stylint: {
      config: path.join(sourceDirPath, '.stylintrc'),
      reporter: {
        reporter: 'stylint-stylish',
        reporterOptions: {
          absolutePath: false,
          ruleName: false,
        },
      },
    },
    // Stylus configuration
    stylus: {
      import: [
        'jeet/styl',
        'normalize-styl',
        'rupture',
      ],
      paths: [
        'node_modules',
      ],
      use: autoprefixer(),
    },
  };

  return new Promise((resolve, reject) => {
    // Create stream for linting Stylus partials
    gulp.src(path.join(sourceDirPath, '**/*.styl'))
      // Initialize gulp-plumber to prevent process termination in case of error
      .pipe(plumber({ errorHandler: error => logger.fatal(error.message) }))
      // Perform Stylus linting
      .pipe(stylint(configs.stylint))
      // Report Stylint errors if any
      .pipe(stylint.reporter())
      .pipe(plumber.stop());

    // Create stream for Stylus partials processing
    gulp.src(entryPointPath, { since: gulp.lastRun(taskFn) })
      // Initialize gulp-plumber to prevent process termination in case of error
      .pipe(plumber({ errorHandler: error => logger.fatal(error.message) }))
      // Initialize source-maps only in development mode
      .pipe(gulpif(env === 'development', sourcemaps.init()))
      // Compile Stylus files
      .pipe(stylus(configs.stylus))
      // Compress only in production mode
      .pipe(gulpif(env === 'production', uglify()))
      // TODO: Insert banner
      // .pipe(insert.prepend(banner('app.css')))
      // Enable source maps only in development mode
      .pipe(gulpif(env === 'development', sourcemaps.write('./')))
      .pipe(plumber.stop())
      // Catch errors
      .on('error', (error: any) => {
        logger.fatal(error.message);
        reject();
      })
      // Output compiled CSS to file
      .pipe(gulp.dest(dest))
      // Resolve the promise when task finishes
      .on('end', resolve);
  });
}


/**
 * Task export object
 */
export default {
  description: 'Process Stylus partials',
  hook: 'process',
  name: 'stylus:process',
  taskFn,
};
