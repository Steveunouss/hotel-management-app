/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  console.log('Attempting to log in with:', email, password);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      },
      withCredentials: true,
    });
    console.log('Login successful:', res.data);

    if (res.data) {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
    // Redirect or update the UI based on successful login
  } catch (error) {
    showAlert('error', 'Invalid login credentials. Please retry!');
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    showAlert('success', 'Successfully logged out.');
    window.setTimeout(() => {
      location.assign('/');
    }, 1000);
    if (res.data) location.reload();
  } catch (error) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
