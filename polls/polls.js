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

    question = data.get('question');
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
        question: question,
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