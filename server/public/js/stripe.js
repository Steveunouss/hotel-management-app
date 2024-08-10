/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe('pk_test_TukbwTWymFL5QG05ktPopbTM');

export const bookRoom = async (tourId) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);

    window.location.replace(session.data.session.url);
    console.log(session.data.session.url);
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
