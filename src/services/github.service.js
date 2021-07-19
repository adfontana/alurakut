const url = 'https://api.github.com/users';

/**
 * Get followers list from github
*/
export async function getFollowers(user) {
    const response = await fetch(url + `/${user}/followers`);
    const data = await response.json();
    return data.map(item => item.login);
}