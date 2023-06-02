import { Box, Grid, Typography } from '../../../node_modules/@mui/material/index';
import React, { useState } from 'react';

const FileInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleFileInputChange}
        sx={{
          border: '2px dashed #aaa',
          borderRadius: '5px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {selectedFile ? <Typography>Selected File: {selectedFile.name}</Typography> : <Typography>Drag and drop a file here, or click to select a file.</Typography>}
      </Box>
    </Box>
  );
};

function ImmuneTestPicture({ step }) {
  return (
    <>
      {step.reached && (
        <Grid marginTop={10} item xs={12}>
          <Box sx={{ flex: 'wrap' }}>
            <Typography variant="h2" color="textPrimary">
              Health Questionare
            </Typography>
            <FileInput />
          </Box>
        </Grid>
      )}
    </>
  );
}

export default ImmuneTestPicture;
