import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    console.log('updateSettings called');
    console.log(data);
    console.log(type);
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    console.log(res.data);
    if (res.data.status === 'success') {
      showAlert('success', ` updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response?.data.message);
  }
};
