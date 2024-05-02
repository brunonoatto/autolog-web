import { addBabelPlugins, override } from 'customize-cra';

export const configsOverrides = override(
  process.env.USE_BABEL_PLUGIN_ISTANBUL && addBabelPlugins('babel-plugin-istanbul'),
);
