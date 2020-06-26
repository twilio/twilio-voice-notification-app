const envfile = require('envfile');
const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');

const { ENV_FILE_PATH } = require('./constants');

const {
  generateRandomPasscode,
} = require('./helpers');

class ConfigManager {
  constructor() {
    this.loadEnvVariables();
  }

  loadEnvVariables() {
    try {
      const envVars = envfile.parseFileSync(ENV_FILE_PATH);

      this.PASSCODE = envVars.PASSCODE;
      this.ACCOUNT_SID = envVars.ACCOUNT_SID;
      this.AUTH_TOKEN = envVars.AUTH_TOKEN;
      this.DATABASE_URL = envVars.DATABASE_URL;

    } catch (error) {
      // do nothing if the file does not exist, we will create it later.
    }
  }

  createPassCode(development = false) {
    // Don't recreate the passcode if it is already defined.
    if (this.PASSCODE) {
      return;
    }

    console.log('Creating PASSCODE..');
    this.PASSCODE = generateRandomPasscode();
    console.log('✅ PASSCODE created.');
  }

  createDatabaseUri() {
    if (this.DATABASE_URL === undefined) {
      console.log('❌ Please provide a valid PostgreSQL connection string in the .env file (DATABASE_URL)');
      throw new Error('DATABASE_URL param not found in .env file');
    }
  }

  async createCredentialsIfMissing() {
    if (this.ACCOUNT_SID && this.AUTH_TOKEN) {
      console.log(`Using Account: ${this.ACCOUNT_SID}`);
      return;
    }

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'ACCOUNT_SID',
        prefix:
          'You can find your Account SID and Auth Token at https://www.twilio.com/console\n',
        message: 'The Account SID for your Twilio Account or Subaccount',
        validate: (input) => {
          const regex = new RegExp(`^[AC]{2}[a-z0-9]{32}$`);
          const isValid = regex.test(input);
          return (
            isValid ||
            'Account SID must be "AC" followed by 32 hexadecimal digits (0-9, a-z)'
          );
        },
      },
      {
        type: 'password',
        name: 'AUTH_TOKEN',
        message:
          'Your Twilio Auth Token for your Twilio Account or Subaccount',
        validate: async (input, { ACCOUNT_SID }) => {
          try {
            const regex = new RegExp(`^[a-z0-9]{32}$`);
            const isValid = regex.test(input);
            if (!isValid) {
              return 'Auth Token must be 32 characters in length';
            }
            await axios.get(
              `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}.json`,
              {
                auth: {
                  username: ACCOUNT_SID,
                  password: input,
                },
              },
            );

            return true;
          } catch (error) {
            return 'Could not validate the provided credentials. Not saving.';
          }
        },
      },
    ]);

    console.log('✅ Twilio Credentials created.');

    this.ACCOUNT_SID = answers.ACCOUNT_SID;
    this.AUTH_TOKEN = answers.AUTH_TOKEN;
  }

  saveConfiguration() {
    console.log('Saving changes to Environment file...');

    const output = `
PASSCODE=${this.PASSCODE}
DATABASE_URL=${this.DATABASE_URL}
ACCOUNT_SID=${this.ACCOUNT_SID}
AUTH_TOKEN=${this.AUTH_TOKEN}`

    fs.writeFileSync(ENV_FILE_PATH, output, 'utf8');

    console.log('Environment file was updated');
  }
}

module.exports = { ConfigManager };
