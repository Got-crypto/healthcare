import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '../../../node_modules/@mui/material/index';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BorderColorOutlined, UpdateOutlined, UploadFileOutlined } from '../../../node_modules/@mui/icons-material/index';
import { API } from 'utils/api';
import axios from '../../../node_modules/axios/index';
import { baseUrl } from 'store/beOneApi';
import handleArrayBuffer from 'utils/handleArrayBuffer';
import { LoadingButton } from '../../../node_modules/@mui/lab/index';
import { resizeImage } from 'utils/File-Controller';

const Profile = () => {
  const { authUser } = useSelector((state) => state.main);
  const [isMobile, setIsMobile] = useState(false);
  const [columns, setColumns] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [fileToUpload, setFileToUpload] = useState();
  const [updatedProfilePic, setUpdatedProfilePicture] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = authUser;

  const [userCredentials, setUserCredentials] = useState({
    formTitle: '',
    formAge: '',
    formFirstName: '',
    formLastName: '',
    formUsername: '',
    formMiddleName: '',
    formGender: '',
    formEmail: '',
    formMobileNumber: '',
    formProfilePic: '',
    formDob: '',
    formHeight: '',
    formHeightUnit: '',
    formWeight: '',
    formWeightUnit: '',
    formShopifyCustomerId: ''
  });
  const {
    ageInYears,
    title,
    firstName,
    lastName,
    username,
    middleName,
    gender,
    email,
    mobileNumber,
    profilePic,
    dob,
    height,
    heightUnit,
    weight,
    weightUnit,
    shopifyCustomerId
  } = user;

  const updateUserProfile = async () => {
    const updatedCredentials = {
      ageInYears: userCredentials.formAge !== '' ? userCredentials.formAge : ageInYears,
      title: userCredentials.formTitle !== '' ? userCredentials.formTitle : title,
      firstName: userCredentials.formFirstName !== '' ? userCredentials.formFirstName : firstName,
      lastName: userCredentials.formLastName !== '' ? userCredentials.formLastName : lastName,
      username: userCredentials.formUsername !== '' ? userCredentials.formUsername : username,
      middleName: userCredentials.formMiddleName !== '' ? userCredentials.formMiddleName : middleName,
      gender: userCredentials.formGender !== '' ? userCredentials.formGender : gender,
      email: userCredentials.formEmail !== '' ? userCredentials.formEmail : email,
      mobileNumber: userCredentials.formMobileNumber !== '' ? userCredentials.formMobileNumber : mobileNumber,
      profilePic: userCredentials.formProfilePic !== '' ? userCredentials.formProfilePic : profilePic,
      dob: userCredentials.formDob !== '' ? userCredentials.formDob : dob,
      height: userCredentials.formHeight !== '' ? userCredentials.formHeight : height,
      heightUnit: userCredentials.formHeight !== '' ? userCredentials.formHeight : heightUnit,
      weight: userCredentials.formWeight !== '' ? userCredentials.formWeight : weight,
      weightUnit: userCredentials.formWeightUnit !== '' ? userCredentials.formWeightUnit : weightUnit,
      shopifyCustomerId: userCredentials.formShopifyCustomerId !== '' ? userCredentials.formShopifyCustomerId : shopifyCustomerId
    };
    try {
      await API.post(`api/user/update/${user?.id}`, updatedCredentials);
      const response = await API.get('api/user');
      localStorage.setItem('authUser', response?.data);
      setSuccessMessage('Updated Successfully');
    } catch (error) {
      console.log('error updating user profile', error);
      setErrorMessage('Error updating profile');
    }
  };

  const handleFileInputChange = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      console.log('file', file);
      const allowedTypes = ['image/jpeg', 'image/png'];

      if (file && allowedTypes.includes(file.type)) {
        setSelectedFile(URL.createObjectURL(file));
        if (file.size > 10000) {
          resizeImage(file, 800, 800, 0.7)
            .then((resizedImage) => setFileToUpload(resizedImage))
            .catch((error) => {
              setErrorMessage('Failed to get image');
              console.log('error', error);
            });
        } else setFileToUpload(file);
        setErrorMessage(null);
        setUpdatedProfilePicture(null);
      } else {
        setSuccessMessage(null);
        setSelectedFile(null);
        setErrorMessage('Please select a valid image file (JPEG or PNG).');
      }
    });
  };
  console.log('selectedFile', selectedFile);

  const updateProfilePic = async () => {
    const formData = new FormData();
    formData.append('file', fileToUpload);
    try {
      setIsUpdating(true);
      console.log('test');
      const response = await API.post('api/files?purpose=PROFILE_PIC', formData);
      console.log('response', response)
      console.log('passed');
      setErrorMessage(null);
      if (response?.status === 200) {
        const updatedImageId = response?.data?.id;

        const responseUrl = await axios.get(`${baseUrl}/files/${updatedImageId}/serve`, { responseType: 'arraybuffer' });

        if (responseUrl?.status === 200) {
          const base64Url = await handleArrayBuffer(responseUrl?.data);
          console.log('base64URL', base64Url);
          setSelectedFile(null);
          setIsSuccess(true);
          setUpdatedProfilePicture(base64Url);
          setUserCredentials({ ...userCredentials, formProfilePic: base64Url });
          setSuccessMessage('Profile picture updated');
          const userData = user;
          const update = { ...userData, profilePic: base64Url };
          const accessToken = JSON.parse(localStorage.getItem('authUser')).accessToken;
          localStorage.setItem(
            'authUser',
            JSON.stringify({
              accessToken,
              user: update
            })
          );

          setIsUpdating(false);
        }
      }
    } catch (error) {
      setIsUpdating(false);
      setSuccessMessage(null);
      setErrorMessage('Error updating profile picture');
      console.log('error updating profile picture', error);
      setFileToUpload(null);
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 900) {
      setIsMobile(true);
    } else setIsMobile(false);

    if (window.innerWidth < 685) {
      setColumns(true);
    } else setColumns(false);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Grid sx={{ width: { xl: 1100 } }} container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Profile</Typography>
        <Typography variant="subtitle2" sx={{ color: 'secondary.main' }}>
          Hello, {firstName}! Review and edit your profile here
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ width: '100%' }}>
        <Box sx={{ flex: 'wrap', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Grid sx={{ width: '100%' }} xs={3}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Avatar
                  src={isSuccess ? updatedProfilePic : selectedFile ? selectedFile : profilePic ? profilePic : null}
                  alt="profile"
                  sx={{ height: '200px', width: '200px' }}
                />
                <BorderColorOutlined onClick={handleFileInputChange} sx={{ cursor: 'pointer', mt: 1 }} />
                {errorMessage && <Typography sx={{ color: 'error.main' }}>{errorMessage}</Typography>}
                {successMessage && <Typography sx={{ color: 'success.main' }}>{successMessage}</Typography>}
                <Box sx={{ width: isMobile ? '100%' : '90%' }}>
                  <LoadingButton
                    disabled={!selectedFile ? true : false}
                    loading={isUpdating}
                    variant="contained"
                    fullWidth
                    sx={{ mt: 1, backgroundColor: isUpdating && 'primary.main' }}
                    startIcon={<UploadFileOutlined />}
                    onClick={updateProfilePic}
                  >
                    Upload
                  </LoadingButton>
                </Box>
              </Box>
            </Grid>
            <Grid xs={9} sx={{ mt: isMobile ? 4 : 0 }}>
              <Box>
                <Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <InputLabel>title</InputLabel>
                      <Select
                        value={userCredentials.formTitle}
                        label="title"
                        onChange={({ target }) => setUserCredentials({ ...userCredentials, formTitle: target.value })}
                        fullWidth
                      >
                        <MenuItem value={'Mr.'}>Mr.</MenuItem>
                        <MenuItem value={'Ms.'}>Ms.</MenuItem>
                        <MenuItem value={'Dr.'}>Dr.</MenuItem>
                        <MenuItem value={'Prof.'}>Prof.</MenuItem>
                      </Select>
                      <FormHelperText>{title ? title : 'Select title'}</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <TextField
                        value={userCredentials.formFirstName}
                        onChange={({ target }) => setUserCredentials({ ...userCredentials, formUsername: target.value })}
                        fullWidth
                        label="First Name"
                      />
                      <FormHelperText>{firstName}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <TextField
                        fullWidth
                        value={userCredentials.formLastName}
                        onChange={({ target }) => setUserCredentials({ ...userCredentials, formLastName: target.value })}
                        label="Last Name"
                      />
                      <FormHelperText>{lastName}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <TextField
                        fullWidth
                        label="Username"
                        value={userCredentials.formUsername}
                        onChange={({ target }) => setUserCredentials({ ...userCredentials, formUsername: target.value })}
                      />
                      <FormHelperText>{username ? username : 'Provide Username'}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <TextField fullWidth label="Middle name" />
                      <FormHelperText>{middleName ? middleName : 'Provide middleName'}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        disabled
                        value={userCredentials.formGender}
                        label="Gender"
                        onChange={({ target }) => setUserCredentials({ ...userCredentials, formGender: target.value })}
                        fullWidth
                      >
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                        <MenuItem value={'other'}>Other</MenuItem>
                      </Select>
                      <FormHelperText>{gender}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <TextField
                        value={userCredentials.formAge}
                        onChange={({ target }) => setUserCredentials({ ...userCredentials, formAge: target.value })}
                        fullWidth
                        label="Age"
                      />
                      <FormHelperText>{ageInYears ? ageInYears : 'Provide age'}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={userCredentials.formEmail}
                        onChange={({ target }) => setUserCredentials({ ...userCredentials, formEmail: target.value })}
                      />
                      <FormHelperText>{email}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={userCredentials.formMobileNumber}
                        onChange={({ target }) => setUserCredentials({ ...userCredentials, formMobileNumber: target.value })}
                      />
                      <FormHelperText>{mobileNumber ? mobileNumber : 'Provide Phone Number'}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <TextField
                        fullWidth
                        label="Shopify ID"
                        value={userCredentials.formShopifyCustomerId}
                        onChange={({ target }) => setUserCredentials({ ...userCredentials, formShopifyCustomerId: target.value })}
                      />
                      <FormHelperText>{shopifyCustomerId ? shopifyCustomerId : 'Provide Shopify ID'}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <DatePicker
                        fullWidth
                        label="Date of birth"
                        value={userCredentials.value}
                        onChange={(date) => setUserCredentials({ ...userCredentials, formDob: date })}
                      />
                      <FormHelperText>{dob ? dob : 'Select date of birth'}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <TextField
                        fullWidth
                        label="Height"
                        value={userCredentials.formHeight}
                        onChange={({ target }) => setUserCredentials({ ...userCredentials, formHeight: target.value })}
                      />
                      <FormHelperText>{height ? height : 'Provide Your height'}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <TextField
                        fullWidth
                        label="Height Unit"
                        value={userCredentials.formHeightUnit}
                        onChange={({ target }) => setUserCredentials({ ...userCredentials, formHeightUnit: target.value })}
                      />
                      <FormHelperText>{heightUnit ? heightUnit : 'Provide height unit'}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <TextField
                        fullWidth
                        label="Weight"
                        value={userCredentials.formWeight}
                        onChange={({ target }) => setUserCredentials({ ...userCredentials, formWeight: target.value })}
                      />
                      <FormHelperText>{weight ? weight : 'Provide Your weight'}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={columns ? 12 : 4}>
                    <FormControl sx={{ minWidth: 120, width: '100%' }}>
                      <TextField
                        fullWidth
                        label="Weight Unit"
                        value={userCredentials.formWeightUnit}
                        onChange={({ target }) => setUserCredentials({ ...userCredentials, formWeightUnit: target.value })}
                      />
                      <FormHelperText>{weightUnit ? weightUnit : 'Provide weight unit'}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth variant="contained" onClick={updateUserProfile} startIcon={<UpdateOutlined />}>
                      Update
                    </Button>{' '}
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Box>
        <Divider sx={{ mt: 10, pb: 5 }} />
      </Grid>
    </Grid>
  );
};

export default Profile;
