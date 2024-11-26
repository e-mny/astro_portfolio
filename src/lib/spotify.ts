// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// const token = import.meta.env.SPOTIFY_TOKEN

const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
const auth_code = import.meta.env.SPOTIFY_AUTH_CODE;
let access_token = import.meta.env.SPOTIFY_ACCESS_TOKEN;
let refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;

if (!client_id || !client_secret) {
  console.error("Missing Spotify client credentials. Please check your environment variables.");
  throw new Error("Missing Spotify client credentials.");
}

async function refreshSpotifyToken() {
  console.log("Refreshing Spotify Token");
  const authUrl = "https://accounts.spotify.com/api/token";

  const bodyParams = new URLSearchParams({
    refresh_token: refresh_token,
    grant_type: "refresh_token",
  });

  const res = await fetch(authUrl, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(client_id + ":" + client_secret)}`, // Encode client_id and client_secret in Base64
    },
    body: bodyParams.toString(), // Send the body as URL-encoded string
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          console.error("Error response when refreshing token:", data);
          throw new Error(`Error ${response.status}: ${data.error}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      // console.log('New Access Token:', data.access_token);
      // console.log('New Refresh Token:', data.refresh_token);
      access_token = data.access_token;
      refresh_token = data.refresh_token || refresh_token;
      return data;
    })
    .catch((error) => {
      console.error("Failed to refresh token:", error);
    });

  return { access_token, refresh_token };
}

async function getSpotifyToken() {
  console.log("Getting Spotify Token");

  const authUrl = "https://accounts.spotify.com/api/token";

  const bodyParams = new URLSearchParams({
    code: auth_code, // Replace with your authorization code
    redirect_uri: "https://localhost/callback", // Your redirect URI
    grant_type: "authorization_code",
  });

  const res = await fetch(authUrl, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(client_id + ":" + client_secret)}`, // Encode client_id and client_secret in Base64
    },
    body: bodyParams.toString(), // Send the body as URL-encoded string
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          console.error("Error response from Spotify:", data);
          throw new Error(`Error ${response.status}: ${data.error}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Access Token:", data.access_token);
      console.log("Refresh Token:", data.refresh_token);
      return data;
    })
    .catch((error) => {
      console.error("Failed to fetch token:", error);
    });

  console.log(`Printing result from getSpotifyToken: ${res.json()}`);
  let access_token = res.access_token;
  let refresh_token = res.refresh_token;

  return { access_token, refresh_token };
}

async function fetchWebApi(endpoint, method, body?) {
  console.log("Fetching API");
  let { access_token, refresh_token } = await refreshSpotifyToken();
  // const token = await getSpotifyToken()
  try{

    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method,
      body: JSON.stringify(body),
    });
    
    // console.log(await res)
    // console.log(await res.json())
    return await res.json();
  }
  catch (error) {
    console.error(`Failed to fetch from Spotify API (endpoint: ${endpoint}):`, error.message);
    throw error;
  }
}

async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  console.log("Getting Top Tracks");

  try {
    console.log("Getting Top Tracks...");
    const data = await fetchWebApi("v1/me/top/tracks?time_range=short_term&limit=30", "GET")
    return data.items || [];
  } catch (error) {
    console.error("Failed to get top tracks:", error.message);
    throw error;
  }
}

async function createPlaylist(tracksUriList) {
  console.log("Creating playlist");

  try{
    const { id: user_id } = await fetchWebApi("v1/me", "GET");
    
    const playlist = await fetchWebApi(`v1/users/${user_id}/playlists`, "POST", {
      name: "Currently listening",
      description: "Playlist created by the tutorial on developer.spotify.com",
      public: false,
    });
    
    await fetchWebApi(
      `v1/playlists/${playlist.id}/tracks?uris=${tracksUriList.join(",")}`,
      "POST",
    );
    
    return playlist;
  }
  catch (error) {
    console.error("Failed to create playlist:", error.message);
    throw error;
  }
}

async function retrieveTopSongs() {
  console.log("Retrieving top songs...");
  try {
    const topTracks = await getTopTracks();
    if (!topTracks || !topTracks.length) {
      console.warn("No top tracks found.");
      return [];
    }

    const topTracksUri = topTracks.map(({ uri }) => uri);
    console.log(`Found ${topTracksUri.length} top tracks.`);
    return topTracks;
  } catch (error) {
    console.error("Failed to retrieve top songs:", error.message);
    throw error;
  }
}

// console.log(await getSpotifyToken())
// const topSongsPlaylist = await retrieveTopSongs()
// console.log(topSongsPlaylist)
// const topSongsPlaylistID = topSongsPlaylist.id;

async function getAlbumImageURL(albumID: string) {
  console.log("Getting Album Art");
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-an-album

  try {
    const data = (await fetchWebApi(`v1/albums/${albumID}`, "GET"));
    return data.images?.[0] || null;
  } catch (error) {
    console.error("Failed to get album image:", error.message);
    throw error;
  }
}

export { getTopTracks, retrieveTopSongs, getSpotifyToken, getAlbumImageURL };
