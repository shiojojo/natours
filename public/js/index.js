import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

// DOM Elements
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const accountDataForm = document.querySelector('.form-user-data');
const accountPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get values at form submission
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (accountDataForm) {
  accountDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // const name = document.querySelector('#name').value;
    // const email = document.querySelector('#email').value;

    const form = new FormData();
    form.append('name', document.querySelector('#name').value);
    form.append('email', document.querySelector('#email').value);
    form.append(
      'photo',
      document.querySelector('input[name="photo"]').files[0],
    );
    updateSettings(form, 'data');
  });
}

if (accountPasswordForm) {
  accountPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.querySelector('#password-current').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );
    document.querySelector('.btn--save-password').textContent = 'Save password';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    // e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
