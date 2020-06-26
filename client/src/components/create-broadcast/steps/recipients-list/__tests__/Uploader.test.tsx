import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { useDropzone } from 'react-dropzone';
import Uploader from '../Uploader';

const TestUploader = () => {
  const { getRootProps, getInputProps } = useDropzone();

  return (
    <Uploader
      getInputProps={getInputProps}
      getRootProps={getRootProps}
      selectedFile={null}
    />
  );
};

describe('recipients list > Uploader', () => {
  test('renders the page', () => {
    const { asFragment } = render(
      <Router>
        <TestUploader/>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
