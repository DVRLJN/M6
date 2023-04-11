import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import '../styles/SearchBar.css'


function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('valor de la búsqueda', searchTerm);
    props.onSubmit(searchTerm)
  }

  return (
    <form className='search-container' onSubmit={handleSubmit}>
      <input type="text" placeholder="Buscar canción o artista" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <button type="submit"><AiOutlineSearch size="40px" /></button>
    </form>
  );
}
export default SearchBar;