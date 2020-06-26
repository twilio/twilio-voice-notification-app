const ngrok = require('ngrok');
const open = require('open');

const { ConfigManager } = require('../configManager');

module.exports = class NgrokConfigPlugin {
  constructor() {
    this.initialized = false;
  }

  apply(compiler) {
    compiler.hooks.done['tapAsync'] (
      'NgrokConfigPlugin', (stats, callback) => {
        if (!this.initialized) {
          this.initialized = true;
          ngrok.connect({
            addr: 3000,
            host_header: 3000,
          }).then(url => {
            const configManager = new ConfigManager();
            const applicationUrl = `${url}/?passcode=${configManager.PASSCODE}`;
            console.log(`Application URL: ${applicationUrl}`);
            open(applicationUrl);
            callback();
          });
        } else {
          callback();
        }
      }
    );
  }
}
