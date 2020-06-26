import React, { memo } from 'react';
import { Typography, Box, Button } from '@material-ui/core';

import { useUploaderStyles } from './styles';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

type UploaderProps = {
  getRootProps(): DropzoneRootProps;
  getInputProps(): DropzoneInputProps;
  selectedFile: File | null;
};

const Uploader: React.FC<UploaderProps> = memo(
  ({ getRootProps, getInputProps, selectedFile }) => {
    const classes = useUploaderStyles();

    return (
      <Box
        data-testid="drop-zone"
        {...getRootProps()}
        className={classes.uploader}
      >
        <input {...getInputProps()} />
        <Box className={classes.uploaderItems}>
          <Typography variant="h5" align="center">
            Drag & Drop Recipient File (.txt)
          </Typography>
        </Box>
        <Box className={classes.uploaderItems}>
          <Typography variant="h6" align="center">
            or
          </Typography>
        </Box>
        <Box className={classes.uploaderItems}>
          <Button variant="contained" color="primary">
            {selectedFile ? 'Select New File' : 'Select File'}
          </Button>
        </Box>
        <Box className={classes.uploaderItems}>
          {selectedFile && <Typography>{selectedFile.name}</Typography>}
        </Box>
      </Box>
    );
  }
);

export default Uploader;
