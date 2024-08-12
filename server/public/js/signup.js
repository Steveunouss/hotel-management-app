/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm, role) => {
  console.log(
    'Attempting to sign up with:',
    name,
    email,
    password,
    passwordConfirm,
    role,
  );
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/signup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name,
        email,
        password,
        passwordConfirm,
        role,
      },
    });
    console.log('Sign up successful:', res.data);

    if (res.data) {
      showAlert('success', 'Account created successfully! Please log in.');
      window.setTimeout(() => {
        location.assign('/login'); // Redirect to login page
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Please verify the information entered.');
  }
};
