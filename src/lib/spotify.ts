// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// const token = import.meta.env.SPOTIFY_TOKEN

const client_id = import.meta.env.SPOTIFY_CLIENT_ID
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET
const temp_token = import.meta.env.SPOTIFY_TOKEN

async function getSpotifyToken() {
  console.log("Getting Spotify Token")

    const url = 'https://accounts.spotify.com/api/token';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + (btoa(client_id + ':' + client_secret)),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
        redirect: 'follow'
    });
    // console.log(response)
    if (response.status === 200) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse.access_token
    } else {
        // console.log(response.statusText);
        throw new Error(`Request failed! Status code: ${response.status} ${response.statusText}`);
    }
}


// const token = getSpotifyToken()

async function fetchWebApi(endpoint, method, body?) {
  console.log("Fetching API")
  // const token = await getSpotifyToken()

  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${temp_token}`,
    },
    method,
    body: JSON.stringify(body)
  })
  // console.log(await res)
  // console.log(await res.json())
  console.log(res)
  return await res.json();
}

async function getTopTracks(){
  console.log("Getting Top Tracks")

  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=10', 'GET'
  )).items;
}


async function createPlaylist(tracksUriList){
  console.log("Creating playlist")
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "Currently listening",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUriList.join(',')}`,
    'POST'
  );

  return playlist;
}

async function retrieveTopSongs(){
  console.log("Retrieving top songs")
  const topTracks = await getTopTracks();


  const topTracksUri = topTracks?.map(
      ({uri}) => uri
    )

  // console.log(topTracks)
  // console.log(topTracksUri)
  const createdPlaylist = await createPlaylist(topTracksUri);

  return await createdPlaylist;
}

// const topSongsPlaylist = await retrieveTopSongs()
// const topSongsPlaylistID = topSongsPlaylist.id;

export {retrieveTopSongs, getSpotifyToken};