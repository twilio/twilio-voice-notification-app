const fs = require('fs');
const junitMerge = require('junit-report-merger');

const TEST_RESULT_FOLDER = 'cypress/results/xml';
const mergedFile = `${TEST_RESULT_FOLDER}/all-test-results.xml`;

const cleanUp = () => {
  if (fs.existsSync(mergedFile)) {
    fs.unlinkSync(mergedFile);
  }
};

const readFileTypes = type => {
  const results = new Set();

  fs.readdirSync(TEST_RESULT_FOLDER).forEach(fileName => {
    if (fileName.endsWith(type)) {
      results.add(`${TEST_RESULT_FOLDER}/${fileName}`);
    }
  });

  return Array.from(results);
};

const start = () => {
  if (!fs.existsSync(TEST_RESULT_FOLDER)) {
    return;
  }

  cleanUp();

  const results = readFileTypes('xml');
  junitMerge.mergeFiles(mergedFile, results, () => {
    console.log('done merging test reports!');
  });
};

start();
