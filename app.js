// import functions and grab DOM elements
import { signupUser } from './fetch-utils.js';

// let state
const signUpForm = document.querySelector('#sign-in');

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(signUpForm);
    const email = data.get('password');
    const password = data.get('password');

    await signupUser(email, password);

    window.location.href = './polls';
});