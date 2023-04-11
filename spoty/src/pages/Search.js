import Menu from '../components/Menu';
import React, { useContext,useState } from 'react';
import { TokenContext } from '../components/Context';
import SearchBar from '../components/SearchBar';
import "../styles/Search.css";
import {urlSpotify} from '../spotifyKeys';

function Search() {
    const  [searchResults, setSearchResults] = useState([]);
    const[token, setToken] = useContext(TokenContext);

    const handleSearch = async searchTerm =>  {
      console.log('valor de la búsqueda api',searchTerm);
      const headerObj = new Headers();
      headerObj.append('Content-Type', 'application/json');
      headerObj.append('Authorization', `Bearer ${window.localStorage.getItem("token")}`)
      const opt = {method: "GET", headers: headerObj}
      const url = `${urlSpotify}/search?q=${searchTerm}&type=album,track`;

      let response = await fetch(url, opt);
      let data = await response.json();
      console.log(data);

      const results = [
       { item : data.albums.items}
      ]; 
      //console.log('results, ',results);
      setSearchResults(data.albums.items);
      console.log('resultados ',searchResults)
    }
  

    return (
      <div>
        <Menu/>
        <div className='lista'>
          <SearchBar onSubmit={handleSearch}/>
        </div>
        <div className="artist-albums">
        <ul className="album-list">
          {searchResults.map((result, index) => (
            
            <li className="album-item" key={index}>
              
              <a href={`director-detail/${result.id}/${result.name}`}>
                <img className='img' src={result.images[0].url}></img>
              </a>
              <p className="gray">{result.artists[0].name}</p>
              <a href={`director-detail/${result.id}/${result.name}`}>
              <p>{result.name}</p>
              </a>
                
              
              </li>
              
          ))}
          
        </ul>
        </div>
      
        
      </div>
    );
  }
  export default Search;