import { handleUploadPicture } from 'services/BeOne';
import { Box, Button, Grid, Typography } from '../../../node_modules/@mui/material/index';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingButton } from '../../../node_modules/@mui/lab/index';
import { resizeImage } from 'utils/File-Controller';
import { Delete } from '../../../node_modules/@mui/icons-material/index';
import SectionWrapper from 'layout/MainLayout/HOC/SectionWrapper';

const FileInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { selectedOrder } = useSelector((state) => state.main);

  const handleFileInputChange = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const uploadImmuneTestPicture = async () => {
    const formData = new FormData();
    try {
      setIsLoading(true);
      const resized = await resizeImage(selectedFile, 800, 800, 0.7);
      formData.append('file', resized);
      await handleUploadPicture(selectedOrder?.orderId, false, formData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('error', error);
    }
  };

  return (
    <Box>
      {!selectedFile ? (
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
            alignItems: 'center',
          }}
        >
          {selectedFile ? (
            <Typography>Selected File: {selectedFile.name}</Typography>
          ) : (
            <Typography>Drag and drop a file here, or click to select a file.</Typography>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <img alt="immune-test" src={selectedFile && URL.createObjectURL(selectedFile)} style={{ height: '250px', width: 'auto' }} />
        </Box>
      )}
      <Button variant="outline" sx={{ backgroundColor: 'error.main', mt: 1, color: 'white' }} onClick={() => setSelectedFile(null)}>
        <Delete />
      </Button>
      <LoadingButton
        loading={isLoading}
        sx={{ mt: 2, backgroundColor: '#45d9c9', ':hover': { backgroundColor: '#45c0d9' } }}
        fullWidth
        onClick={uploadImmuneTestPicture}
        variant="contained"
      >
        Upload Test picture
      </LoadingButton>
    </Box>
  );
};

function ImmuneTestPicture() {
  return (
    <>
      <Grid marginTop={10} item xs={12}>
        <Box sx={{ flex: 'wrap' }}>
          <Typography variant="h2" color="textPrimary">
            Immune Test Picture
          </Typography>
          <FileInput />
        </Box>
      </Grid>
    </>
  );
}

export default SectionWrapper(ImmuneTestPicture, 'immuneTestPictureUpload', !0);
