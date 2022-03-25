export function renderPoll(poll) {
    const div = document.createElement('div');
    const option1Div = renderPoll(poll.option_1, poll.votes_1);
    const option2Div = renderPoll(poll.option_2, poll.votes_2);

    div.append(option1Div, option2Div);

    div.classList.add('poll');

    return div;
}