//imported functions and DOM elements
import { savePoll, getPolls, logout, checkLoggedIn } from '../fetch-utils.js';
import { renderPoll } from '../render-utils.js';

const currentPollEl = document.getElementById('current-poll-container');
const pastPollsEl = document.getElementById('past-polls-container');
const logoutButton = document.getElementById('logout');

const nameForm = document.getElementById('name-form');
const optionOneAddButton = document.getElementById('option-one-add-button');
const optionTwoAddButton = document.getElementById('option-two-add-button');

const optionOneSubtractButton = document.getElementById('option-one-subtract-button');
const optionTwoSubtractButton = document.getElementById('option-two-subtract-button');

const finishPollButton = document.getElementById('finish-poll-button');
const optionOneLabel = document.getElementById('option-one-name');
const optionTwoLabel = document.getElementById('option-two-name');

checkLoggedIn();

//let states
let question = '';

let option_1 = '';
let votes_1 = 0;

let option_2 = '';
let votes_2 = 0;

nameForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(nameForm);

    option_1 = data.get('option-one');
    option_2 = data.get('option-two');

    nameForm.reset();

    displayCurrentPollEl();
});

optionOneAddButton.addEventListener('click', () => {
    votes_1++;
    displayCurrentPollEl();
});

optionTwoAddButton.addEventListener('click', () => {
    votes_2++;
    displayCurrentPollEl();
});

optionOneSubtractButton.addEventListener('click', () => {
    votes_1--;
    displayCurrentPollEl();
});

optionTwoSubtractButton.addEventListener('click', () => {
    votes_2--;
    displayCurrentPollEl();
});

finishPollButton.addEventListener('click', async () => {
    await savePoll(question, option_1, option_2, votes_1, votes_2);

    displayAllPoles();
});

// finishButtonEl.addEventListener('click', async () => {
//     await savePoll(question, option_1, option_2, votes_1, votes_2);

//     displayPolls();
// });

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('', async () => {
    await displayAllPoles();
});

function displayCurrentPollEl() {
    currentPollEl.textContent = '';

    optionOneLabel.textContent = option_1;
    optionTwoLabel.textContent = option_2;

    const newPoll = {
        option_1: option_1,
        option_2: option_2,
        votes_1: votes_1,
        votes_2: votes_2
    };

    const pollEl = renderPoll(newPoll);
    currentPollEl.append(pollEl);
}

async function displayAllPoles() {
    pastPollsEl.textContent = '';

    const polls = await getPolls();

    for (let poll of polls) {
        const pollEl = renderPoll(poll);

        pastPollsEl.append(pollEl);
    }
}

displayCurrentPollEl();

// function displayCurrentPollEl() {
//     //clear out the current poll div
//     currentPollEl.textContent = '';

//     //change the label to show option 1
//     options1TitleEl.textContent = option_1;

//     //change the label to show option 2
//     options2TitleEl.textContent = option_2;

//     const newPoll = {
//         option_1: option_1,
//         option_2: option_2,

//         votes_1: votes_1,
//         votes_2: votes_2,
//     };

//     const pollEl = renderPoll(newPoll);

//     currentPollEl.append(pollEl);
// }

// checkLoggedIn();

// const questionEl = document.querySelector('.question');

// const options1TitleEl = document.querySelector('.option-1-title');
// const options1VotesEl = document.querySelector('.option-1-votes');
// const options1ButtonEl = document.querySelector('.option-1-button');

// const options2TitleEl = document.querySelector('.option-2-title');
// const options2VotesEl = document.querySelector('.option-2-votes');
// const options2ButtonEl = document.querySelector('.option-2-button');

// const finishButtonEl = document.querySelector('.finish-button');
// const pastPollsEl = document.querySelector('.past-polls');

// const pollFormEl = document.querySelector('#poll-form');
// const logoutButtonEl = document.querySelector('#logout');

// const currentPollEl = document.querySelector('.current-poll');

// //let states
// let question = '';

// let option_1 = '';
// let votes_1 = 0;

// let option_2 = '';
// let votes_2 = 0;

// //create event listeners
// window.addEventListener('load', async () => {
//     await displayPolls();
// });

// logoutButtonEl.addEventListener('click', async () => {
//     await logout();
// });

// pollFormEl.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const data = new FormData(pollFormEl);

//     question = data.get('question');
//     option_1 = data.get('option-1-title');
//     votes_1 = data.get('option-1-votes');

//     option_2 = data.get('option-2-title');
//     votes_2 = data.get('option-2-votes');

//     questionEl.textContent = question;
//     options1TitleEl.textContent = option_1;
//     options1VotesEl.textContent = votes_1;

//     options2TitleEl.textContent = option_2;
//     options2VotesEl.textContent = votes_2;

//     pollFormEl.reset();

//     displayCurrentPollEl();
// });

// options1ButtonEl.addEventListener('click', () => {
//     votes_1++;

//     displayCurrentPollEl();
// });

// options2ButtonEl.addEventListener('click', () => {
//     votes_2++;

//     displayCurrentPollEl();
// });





// async function displayPolls() {
//     pastPollsEl.textContent = '';

//     const polls = await getPolls();
//     //console.log(polls);

//     for (let poll of polls) {
//         const newPollEl = renderPoll(poll);

//         pastPollsEl.append(newPollEl);
//     }
// }

// displayCurrentPollEl();