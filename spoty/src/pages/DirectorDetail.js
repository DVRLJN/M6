import React, {useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RightClickMenu from '../components/RightClickMenu';
import '../styles/DirectorDetail.css'
import {urlSpotify} from '../spotifyKeys';
import { Link } from 'react-router-dom';


function DirectorDetail() {
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState(null);
  const {id} = useParams();
  const[menuInfo, setMenuInfo]=useState({show: false, posX: 0, posY:0, track:""});

  useEffect(() => {
    async function fetchAlbum() {
      try {
        const response = await fetch(`${urlSpotify}/albums/${id}`, {
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem("token")}`
          }
        });
        const data = await response.json();
        setAlbum(data);
		console.log(data.tracks.items);
      } catch (err) {
        setError(err);
      }
    }
    fetchAlbum();
  }, [id, window.localStorage.getItem("token")]);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!album) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
		<div className="header">
		<Link to="/" className="artist-playlists-btn">
        Volver
    	</Link>
			<div className="header gray">
				<img src={album.images[0].url} alt="Portada del álbum"/>
				<p>{album.artists[0].name}</p>
			</div>
			<h1>{album.name}</h1>
			
		</div>
		<div className="tracks">
		<table>
			<thead>
				<tr className='titulos'>
					<th>#</th>
					<th>Título de la Canción</th>
					<th>Duración</th>
				</tr>
			</thead>
			<tbody>
				<tr className="flex-tracks">
					{album.tracks.items.map((result, index) => (
						<th className='titulos white' onClick={handleLeftClick} onContextMenu={handleClick} key={index} data-key={result.id}>
							<p>{result.track_number}</p>
							<p>{result.name}</p>
							<p>{convertirMsAMinutosSegundos(result.duration_ms)}</p>	
						</th>
					))}
					  {menuInfo.show &&
                    	<RightClickMenu data={menuInfo} />
               		 }
		  		</tr>
			</tbody>
        </table>
		</div>
	</div>
    );
  }

  function handleClick(e) {
	console.log("clickmenu")
	e.nativeEvent.button === 2 
  	? (console.log("click boton derecho"), setMenuInfo({show: true, posX: e.pageX, posY:e.pageY, track: e.target.getAttribute("data-key")}))
    : null;

  }

  function handleLeftClick(e){
	console.log("left");
	setMenuInfo({show: false, posX: e.pageX, posY:e.pageY, track: e.target.getAttribute("data-key")});
  }



  function convertirMsAMinutosSegundos(ms) {
	let segundos = Math.floor(ms / 1000);
	let minutos = Math.floor(segundos / 60);
	segundos = segundos % 60;
	return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  }
}
export default DirectorDetail;