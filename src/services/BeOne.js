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
  const response = await API.post(`api/dashboard/${id}/complete-confirm-shipment`, {
    packageReceiptStatus: 'Y'
  });

  console.log('response', response);
}
