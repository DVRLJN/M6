
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Lists.css';
import { urlSpotify } from '../spotifyKeys';

function Lists() {
  const [playList, setPlayList] = useState([]);

  useEffect(() => {
    async function getInfo() {
      let userID = await getUserId();
      await getUserLists(userID);
    }
    getInfo();
  }, []);

  async function getUserId() {
    const response = await fetch(`${urlSpotify}/me`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  }

  async function getUserLists(userID) {
    const url = `https://api.spotify.com/v1/users/${userID.id}/playlists`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    const playlists = data.items || []; // Verificar que hay una lista de reproducción en la respuesta
    setPlayList(playlists);
  }

  useEffect(() => {
    console.log('playlist', playList);
  }, [playList]);

  return (
    <div className="artist-playlists">
    <h2>Listas de reproducción de Darlyn</h2>
    <Link to="/" className="artist-playlists-btn">
        Volver
    </Link>
    <div className="playlists-grid">
      {playList.map((playlist) => (
        <div key={playlist.id} className="playlist-card">
          <div className="playlist-card-img">
            {playlist.images.length > 0 && (
                <img src={playlist.images[0].url} alt={playlist.name} />
              )}
          </div>
          <div className="playlist-card-info">
            <h3 className="playlist-card-title">{playlist.name}</h3>
            <p className="playlist-card-description">{playlist.description}</p>
            <p className="playlist-card-tracks">{playlist.tracks.total} canciones</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default Lists;













