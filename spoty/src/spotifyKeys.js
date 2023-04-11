const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000";
export const clientID = "2044c9c49cb44f6cae2c77a65df3f4c9";
export const loginUri = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=token`;
export const urlSpotify = 'https://api.spotify.com/v1'