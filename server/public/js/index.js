/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { updateData } from './updateSettings';
import { bookRoom } from './stripe';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const roomDataForm = document.querySelector('.form-user-data');
const bookBtn = document.getElementById('book-room');
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateData(name, email);
  });

if (roomDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const desc = document.getElementById('desc').value;
    const status = document.getElementById('status').value;
    updateRoomData(name, price, desc, status);
  });

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { roomId } = e.target.dataset;
    bookRoom(roomId);
  });
