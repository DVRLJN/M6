import '../styles/Menu.css';
import {Link} from 'react-router-dom';
import React, { useContext } from 'react';
import { TokenContext } from './Context';
import {loginUri} from '../spotifyKeys';
function Menu() {
    const[token, setToken] = useContext(TokenContext)
    function logout(){
        setToken('');
    }
    return (
        <div className="navigationContainer">
            <nav>
                <ul>
                    <li><Link to="/"><img className="logo" src={require(`../img/logo.webp`)} /></Link></li>
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/lists">Lists</Link></li>
                </ul>
            </nav>
            <div>
                {token ? (
                    <button className='spotify-btn' onClick={logout}>Logout</button>
                        ) : (
                    <a className='spotify-btn' href={loginUri} >Log In</a>
                )}
            </div>
        </div>
        
    );
  }
  
  export default Menu;