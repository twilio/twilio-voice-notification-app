import { parse } from 'pg-connection-string';

const getDatabaseConfig = (databaseUri: string | undefined) => {
  // When no DATABASE_URL is found in Env variables, it defaults
  // to localhost. If you would like to use a different Connection String,
  // use the .env file to provide it.
  if (databaseUri) {
    const {
      host = 'localhost',
      port,
      user: username,
      password,
      database: db,
    } = parse(databaseUri);

    return {
      host,
      port: parseInt(port, 10) || 5432,
      database: db,
      username,
      password,
    };
  }

  return {};
};

export default () => {
  const database = getDatabaseConfig(process.env.DATABASE_URL);
  /* eslint-disable @typescript-eslint/camelcase */
  return {
    account_sid: process.env.ACCOUNT_SID,
    auth_token: process.env.AUTH_TOKEN,
    port: parseInt(process.env.PORT, 10) || 4000,
    database,
  };
  /* eslint-enable @typescript-eslint/camelcase */
};
