const SUPABASE_URL = 'https://nmgmdkwatcmqrexvwhql.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZ21ka3dhdGNtcXJleHZ3aHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5NzA2MTcsImV4cCI6MTk2MzU0NjYxN30.3xHneXPhk8TMzUGRgqhQh9EMm_NmROG5YLi0ZnrTNUY';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createPoll(poll) {
    const response = await client
        .from('polls')
        .insert(poll);
    
    return response.body;
}

export async function getPolls() {
    const response = await client
        .from('polls')
        .select;

    return response.data;
}

export async function savePoll(question, option1, option2, votes1, votes2) {
    const response = await client
        .from('polls')
        .insert ([
            {
                question,
                option_1: option1,
                option_2: option2,
                votes_1: votes1,
                votes_2: votes2
            },
        ]);

    return response.data;
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}