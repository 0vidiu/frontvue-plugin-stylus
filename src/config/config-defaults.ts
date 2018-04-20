/**
 * Name: config-defaults.ts
 * Description: Default configuration values
 * Author: Ovidiu Barabula <lectii2008@gmail.com>
 * @since 0.1.0
 */

export default {
  // Source files directory name
  sourceDir: 'stylus',

  // Source entry point file (all other partials are imported into this main file)
  entryPoint: 'app.styl',

  // Directory name where the CSS file will be created
  buildDir: 'css',

  // Name of the compiled CSS file
  buildFilename: 'app.css',
};
