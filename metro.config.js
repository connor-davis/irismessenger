/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  resolver: {
    extraNodeModules: { ...require('node-libs-react-native'), net: require("react-native-tcp"), dgram: require("react-native-udp") },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
