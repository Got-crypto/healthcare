import { baseUrl } from 'store/beOneApi';
import { API } from 'utils/api';
import handleArrayBuffer from 'utils/handleArrayBuffer';
import axios from 'axios';

export async function handleGetUser() {
  const response = await API.get('api/user');

  if (response?.status === 200) {
    const { profilePic } = response.data;
    const responseUrl = await axios.get(`${baseUrl}/files/${profilePic}/serve`, { responseType: 'arraybuffer' });

    if (responseUrl?.status === 200) {
      const base64Url = await handleArrayBuffer(responseUrl?.data);

      return { ...response.data, base64Url };
    }
  }

  return {
    ageInYears: '',
    title: '',
    firstName: '',
    lastName: '',
    username: '',
    middleName: '',
    gender: '',
    email: '',
    mobileNumber: '',
    profilePic: '',
    dob: '',
    height: '',
    heightUnit: '',
    weight: '',
    weightUnit: '',
    shopifyCustomerId: ''
  };
}

export async function handleGetCustomerOrders() {
  const response = await API.get('api/dashboard');

  return response;
}

export async function handleGetCustomerOrderById(orderId) {
  const response = await API.get(`api/dashboard/${orderId}`);

  return response;
}

export async function handleConfirmPackageReceived(id) {
  await API.post(`api/dashboard/${id}/complete-confirm-shipment`, {
    packageReceiptStatus: 'Y'
  });
}

export async function handleUpdateUserProfile(id, credentials) {
  const response = await API.post(`api/user/update/${id}`, credentials);

  return response;
}

export async function handleUploadPicture(id, isProfilePic, data) {
  let response;
  if (isProfilePic) {
    response = await API.post('api/files?purpose=PROFILE_PIC', data);
  } else {
    response = await API.post(`api/dashboard/${id}/complete-immune-test-upload`, data);
  }

  return response;
}

export async function handleFinishPlanning(id, data) {
  const response = await API.post(`api/dashboard/${id}/complete-planning-task`, data);

  return response;
}

export async function handleOverallSampling(id, overAllSamplingStatus, overAllPrepStatus, reorderData) {
  const response = await API.post(`api/dashboard/${id}/complete-confirm-sampling-ok`, {
    overallSamplingStatus: overAllSamplingStatus ? 'Y' : 'N',
    overAllPrepStatus: overAllPrepStatus ? 'Y' : 'N',
    reorderData: reorderData
  });

  return response;
}
