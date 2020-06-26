'use strict';

const path = require('path');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

const rootDirectory = path.resolve(__dirname, '../../');
const resolveRootPath = subPath => path.resolve(rootDirectory, subPath);

const clientDirectory = resolveRootPath('client');
const resolveClientPath = subPath => path.resolve(clientDirectory, subPath);

const srcDirectory = resolveClientPath('src');
const resolveSrcPath = subPath => path.resolve(srcDirectory, subPath);


const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(path.resolve(__dirname, '../../package.json')).homepage,
  process.env.PUBLIC_URL
);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

module.exports = {
  dotenv: resolveRootPath('.env'),
  appPath: clientDirectory,
  appBuild: resolveRootPath('build'),
  appPublic: resolveClientPath('public'),
  appHtml: resolveClientPath('public/index.html'),
  appIndexJs: resolveSrcPath('index.tsx'),
  appPackageJson: resolveRootPath('package.json'),
  appSrc: srcDirectory,
  appTsConfig:  resolveRootPath('tsconfig.json'),
  appJsConfig:  resolveRootPath('jsconfig.json'),
  yarnLockFile:  resolveRootPath('yarn.lock'),
  testsSetup:  resolveSrcPath('setupTests.ts'),
  proxySetup:  resolveSrcPath('setupProxy.js'),
  appNodeModules:  resolveRootPath('node_modules'),
  publicUrlOrPath,
};

module.exports.moduleFileExtensions = moduleFileExtensions;
