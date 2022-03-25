//imported functions and DOM elements
import { savePoll, getPolls, logout, checkLoggedIn } from '../fetch-utils.js';
import { renderPoll } from '../render-utils.js';

checkLoggedIn();

const questionEl = document.querySelector('.question');

const options1TitleEl = document.querySelector('.option-1-title');
const options1VotesEl = document.querySelector('.option-1-votes');
const options1ButtonEl = document.querySelector('.option-1-button');

const options2TitleEl = document.querySelector('.option-2-title');
const options2VotesEl = document.querySelector('.option-2-votes');
const options2ButtonEl = document.querySelector('.option-2-button');

const finishButtonEl = document.querySelector('.finish-button');
const pastPollsEl = document.querySelector('.past-polls');

const pollFormEl = document.querySelector('#poll-form');
const logoutButtonEl = document.querySelector('#logout');

const currentPollEl = document.querySelector('.current-poll');

//let states
let question = '';

let option_1 = '';
let votes_1 = 0;

let option_2 = '';
let votes_2 = 0;

//create event listeners
window.addEventListener('load', async () => {
    await displayPolls();
});

logoutButtonEl.addEventListener('click', async () => {
    await logout();
});

pollFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(pollFormEl);

    question = data.get('question');
    option_1 = data.get('option-1-title');
    votes_1 = data.get('option-1-votes');

    option_2 = data.get('option-2-title');
    votes_2 = data.get('option-2-votes');

    questionEl.textContent = question;
    options1TitleEl.textContent = option_1;
    options1VotesEl.textContent = votes_1;

    options2TitleEl.textContent = option_2;
    options2VotesEl.textContent = votes_2;

    pollFormEl.reset();

    displayCurrentPollEl();
});

options1ButtonEl.addEventListener('click', () => {
    votes_1++;

    displayCurrentPollEl();
});

options2ButtonEl.addEventListener('click', () => {
    votes_2++;

    displayCurrentPollEl();
});

finishButtonEl.addEventListener('click', async () => {
    await savePoll(question, option_1, option_2, votes_1, votes_2);

    displayPolls();
});

function displayCurrentPollEl() {
    //clear out the current poll div
    currentPollEl.textContent = '';

    //change the label to show option 1
    options1TitleEl.textContent = option_1;

    //change the label to show option 2
    options2TitleEl.textContent = option_2;

    const newPoll = {
        option_1: option_1,
        option_2: option_2,

        votes_1: votes_1,
        votes_2: votes_2,
    };

    const pollEl = renderPoll(newPoll);

    currentPollEl.append(pollEl);
}

async function displayPolls() {
    pastPollsEl.textContent = '';

    const polls = await getPolls();
    console.log(polls);

    for (let poll of polls) {
        const newPollEl = renderPoll(poll);

        pastPollsEl.append(newPollEl);
    }
}

displayCurrentPollEl();