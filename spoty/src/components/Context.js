
import React, { createContext, useState,useEffect } from 'react';

export const TokenContext = createContext()


const Context = ({children}) =>{
    function rightClickPrevent(e) {
        e.preventDefault()
    }

    const[token, setToken] = useState(null);
    useEffect(()=>{
        let hash = window.location.hash;
        if(hash){
            const tokenL = hash.substring(1).split("&")[0].split("=")[1];
            console.log(token);
            setToken(tokenL);
            window.location.hash="";
            window.localStorage.setItem("token", tokenL)
        }
    });


    return(
        <main onContextMenu={rightClickPrevent}>
            <TokenContext.Provider value={[token, setToken]}>{children}</TokenContext.Provider>
        </main>
    )
}


export default Context;
