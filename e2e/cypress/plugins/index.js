/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
const { resolve } = require('path');
const dotenvPlugin = require('cypress-dotenv');

module.exports = (on, config) => {
  const options = {
    path: resolve(process.cwd(), '../.env')
  };
  config = dotenvPlugin(config, options, true);
  return config;
};
