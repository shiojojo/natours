import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const response = await axios({
      method: 'GET',
      url: `/api/v1/bookings/checkout-session/${tourId}`,
    });

    // 2) Follow the redirect URL from the response
    if (response.request.responseURL) {
      window.location.href = response.request.responseURL;
    } else {
      showAlert('error', 'Something went wrong while booking the tour');
    }
  } catch (err) {
    showAlert('error', err.response?.data?.message || 'Could not book tour');
  }
};
