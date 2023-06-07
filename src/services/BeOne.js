import { API } from 'utils/api';

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