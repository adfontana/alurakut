const url = 'https://alurakut.vercel.app/api'

/**
 * Get user's token from the server
*/
export async function getToken(githubUser) {
    // Set http options
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ githubUser })
    };
    // Request user's token
    const response = await fetch(url + '/login', options);
    const data = await response.json();
    // Return token
    return data.token;
}

/**
 * Check if the user is authenticated on the server
*/
export async function userAuthenticated(token) {
    // Set http options
    const options = {
        headers: {
            Authorization: token
        }
    };
    // Request the user authentication
    return await fetch(url + '/auth', options)
        .then((resposta) => resposta.json())
}