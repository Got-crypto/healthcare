import { handleGetUser } from 'services/BeOne';

export async function createUserSession() {
  const session = sessionStorage.getItem('userDetails') ? true : false;

  if (!session) {
    try {
      const response = await handleGetUser();
      sessionStorage.setItem('userDetails', JSON.stringify(response));

      return response;
    } catch (error) {
      console.log('error', error);
    }
  } else {
    return JSON.parse(sessionStorage.getItem('userDetails'));
  }
}
