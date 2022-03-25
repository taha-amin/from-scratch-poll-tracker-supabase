// import functions and grab DOM elements
import { signupUser } from './fetch-utils';

// let state
const signUpForm = document.querySelector('#sign-up');

signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(signUpForm);
    const email = data.get('password');
    const password = data.get('password');

    await signupUser(email, password);

    window.location.href = './polls';
});

// set event listeners 
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state