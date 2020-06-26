const { ConfigManager } = require('./configManager');
const { logError } = require('./helpers');

(async () => {

  try {

    if (process.env.NODE_ENV === 'e2e') return;

    const config = new ConfigManager();

    const development = true;
    config.createPassCode(development);

    await config.createCredentialsIfMissing();
    config.createDatabaseUri();

    config.saveConfiguration();
  } catch (error) {
    console.log('Something failed. See logs for more detail.');
    logError(error);
  }
})();
