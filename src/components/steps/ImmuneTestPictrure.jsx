import { handleGetCustomerOrderById, handleUploadPicture } from 'services/BeOne';
import { Box, Button, Grid, Typography } from '../../../node_modules/@mui/material/index';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingButton } from '../../../node_modules/@mui/lab/index';
import { resizeImage } from 'utils/File-Controller';
import { Delete, Download } from '../../../node_modules/@mui/icons-material/index';
import SectionWrapper from 'layout/MainLayout/HOC/SectionWrapper';
import { baseUrl } from 'store/beOneApi';
import handleArrayBuffer from 'utils/handleArrayBuffer';
import axios from '../../../node_modules/axios/index';
import { getUnlockedSteps, setOrderDetails } from 'store/reducers/main';

const FileInput = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

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

  const getNewOrderDetails = async () => {
    try {
      const response = await handleGetCustomerOrderById(selectedOrder);
      dispatch(setOrderDetails(response?.data));
      dispatch(getUnlockedSteps());
    } catch (error) {
      console.log('error', error);
    }
  };

  const uploadImmuneTestPicture = async () => {
    const formData = new FormData();
    try {
      setIsLoading(true);
      const resized = await resizeImage(selectedFile, 800, 800, 0.7);
      formData.append('file', resized);
      const response = await handleUploadPicture(selectedOrder, false, formData);
      setIsLoading(false);
      setErrorMessage();
      await getNewOrderDetails();
      setSuccessMessage(response?.data?.message);
      console.log('first', response);
    } catch (error) {
      setIsLoading(false);
      setSuccessMessage();
      setErrorMessage(error?.data?.status === 500 ? 'Sorry, This step is not active' : error?.data?.errors);
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
            alignItems: 'center'
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
      <Box
        sx={{
          mt: 2,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        {errorMessage && (
          <Typography variant="body1" sx={{ color: 'error.main' }}>
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography variant="body1" sx={{ color: 'success.main' }}>
            {successMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

function ImmuneTestPicture() {
  const [isLoading, setIsLoading] = useState(false);
  const { orderDetails } = useSelector(({ main }) => main);

  const immuneTestPictureStep = orderDetails && orderDetails[4];
  const immuneBalanceTestFile = immuneTestPictureStep?.data?.immuneBalanceTestFile;

  const downloadImmuneTestPicture = async () => {
    setIsLoading(!0);
    const responseUrl = await axios.get(`${baseUrl}/files/${immuneTestPictureStep?.data?.immuneBalanceTestFileId}/serve`, {
      responseType: 'arraybuffer'
    });
    const base64Url = await handleArrayBuffer(responseUrl?.data);
    setIsLoading(!1);

    const fileExtension = base64Url.includes('data:image/jpeg') ? 'jpg' : 'png';
    const base64Image = base64Url.split(';base64,').pop();

    const byteArray = new Uint8Array(
      atob(base64Image)
        .split('')
        .map((char) => char.charCodeAt(0))
    );

    const blob = new Blob([byteArray], { type: `image/${fileExtension}` });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `immunetest.${fileExtension}`;

    link.click();

    URL.revokeObjectURL(link.href);
  };
  return (
    <>
      <Grid marginTop={10} item xs={12}>
        <Box sx={{ flex: 'wrap' }}>
          <Typography variant="h2" color="textPrimary">
            Immune Test Picture
          </Typography>
          {immuneTestPictureStep?.status.toLowerCase() !== 'done' ? (
            <FileInput />
          ) : (
            <Box sx={{ mt: 2 }}>
              <Box>
                <Typography>{immuneBalanceTestFile ? `Your uploaded File: ${immuneBalanceTestFile}` : 'Loading...'}</Typography>
              </Box>
              <LoadingButton
                loading={isLoading}
                variant="contained"
                sx={{ mt: 2, backgroundColor: '#45d9c9', ':hover': { backgroundColor: '#45c0d9' } }}
                startIcon={<Download />}
                onClick={downloadImmuneTestPicture}
              >
                Download Your Immune Test File
              </LoadingButton>
            </Box>
          )}
        </Box>
      </Grid>
    </>
  );
}

export default SectionWrapper(ImmuneTestPicture, 'immuneTestPictureUpload', !0);
