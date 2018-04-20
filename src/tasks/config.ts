/**
 * Name: config.ts
 * Description: Config Stylus plugin
 * Author: Ovidiu Barabula <lectii2008@gmail.com>
 * @since 0.1.0
 */

import configDefaults from '../config/config-defaults';
import configQuestionnaire from '../config/config-questionnaire';

export default {
  // Meta description
  description: 'Configure Stylus plugin',
  hook: 'config',
  name: 'stylus:config',
  taskFn: () => true,

  // Configuration
  configDefaults,
  configQuestionnaire,
};
