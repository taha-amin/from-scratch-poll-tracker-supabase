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