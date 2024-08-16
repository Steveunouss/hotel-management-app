/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_TukbwTWymFL5QG05ktPopbTM');

export const bookRoom = async (roomId) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${roomId}`);
    console.log(session);

    window.location.replace(session.data.session.url);
    console.log(session.data.session.url);
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

export const bookCar = async (carId) => {
  try {
    const session = await axios(
      `/api/v1/bookings-car/checkout-session/${carId}`,
    );
    console.log(session);

    window.location.replace(session.data.session.url);
    console.log(session.data.session.url);
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
