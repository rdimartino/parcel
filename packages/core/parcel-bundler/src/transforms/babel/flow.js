/**
 * Generates a babel config for stripping away Flow types.
 */

const commentsOrWhitespaceRegex = /(^#!.*$)?(\/{2}.*$|\/\*[^]*?\*\/|\s*)+/m;
const flowFlagRegex = /^(\/{2}|\/\*+) *@flow/m;

function getFlowConfig(asset) {
  const match = commentsOrWhitespaceRegex.exec(asset.contents);
  if (match && flowFlagRegex.test(match[0])) {
    return {
      internal: true,
      babelVersion: 7,
      config: {
        plugins: [[require('@babel/plugin-transform-flow-strip-types')]],
      },
    };
  }

  return null;
}

module.exports = getFlowConfig;
