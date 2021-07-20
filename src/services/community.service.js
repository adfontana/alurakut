/** URL of community API */
const url = '/api/comunidades';

/**
 * Return the http options to the add community request 
*/
function getHttpAddOptions(community) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(community)
    };
}

function getHttpListOptions() {
    return {
        method: 'POST',
        headers: {
            'Authorization': 'fdbe9eb3f2fd7ef6fb734a4f4b660f',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            "query": `query {
          allCommunities {
            id 
            title
            imageUrl
            creatorSlug
          }
        }` })
    }
}

/** Insert a new community */
export async function addCommunity(community) {
    // Send request
    const response = await fetch(url, getHttpAddOptions(community));
    // Get response data
    const data = await response.json();
    // Return the new community
    return data.registroCriado;
};

/**
 * Return communities from Dato CMS
*/
export async function getList() {
    const datoUrl = 'https://graphql.datocms.com/';
    const response = await fetch(datoUrl, getHttpListOptions());
    const json = await response.json();
    return json.data.allCommunities;
}
