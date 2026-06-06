const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withMetroConfig } = require('react-native-monorepo-config');

const root = path.resolve(__dirname, '..');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = withMetroConfig(getDefaultConfig(__dirname), {
  root,
  dirname: __dirname,
});

module.exports = mergeConfig(config, {
  resetCache: true,
  resolver: {
    blockList: [
      ...[config.resolver.blockList].flat().filter(Boolean),
      new RegExp(`${path.resolve(root, 'media')}/.*`),
    ],
  },
});
