

// Claus
const keys = {  
    api_key: '29b2417b49ec39dda1508f22525e4754',
    session_id: '1e16cfc82967a89702efb73eb1bb995d85b49575',
    account_id: 'DarlynCuevas'
}

let pages = {
    query:'',
    total_pages: 0,
    current_page : 1
}

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight,clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && pages.current_page<pages.total_pages) {
        pages.current_page++;
        searchMovies(pages.query,pages.current_page);
    }
    });

let favoritas =  [];
watchList = [];
let moviesResult = document.getElementById("moviesResult");


async function setFav(id, favBool){
    moviesResult.innerHTML="";
        
      try {
        const headerObj = new Headers();
            headerObj.append('Content-Type', 'application/json;charset=utf-8');
        let body =  JSON.stringify({
            "media_type": "movie",
            "media_id": id,
            "favorite": favBool
          })
          const options = {method: "POST",
          body: body,
          headers: headerObj}

        let url = `https://api.themoviedb.org/3/account/${keys.account_id}/favorite?api_key=${keys.api_key}&session_id=${keys.session_id}`;
        let results = await fetch(url,options);
        let data = await results.json();
        console.log(data.results);
        showFavs();
    } catch (error) {
        console.log(err);
    } 
}

async function setWatch(id, watchBool){
    moviesResult.innerHTML="";
        
      try {
        const headerObj = new Headers();
            headerObj.append('Content-Type', 'application/json;charset=utf-8');
        let body =  JSON.stringify({
            "media_type": "movie",
            "media_id": id,
            "watchlist": watchBool
          })
          const options = {method: "POST",
          body: body,
          headers: headerObj}

        let url = `https://api.themoviedb.org/3/account/${keys.account_id}/watchlist?api_key=${keys.api_key}&session_id=${keys.session_id}`;
        let results = await fetch(url,options);
        let data = await results.json();
        console.log(data.results);
      
        showFavs();
    } catch (error) {
        console.log(err);
    } 
}





async function showFavs(){
    moviesResult.innerHTML="";
    try {
        let url = `https://api.themoviedb.org/3/account/${keys.account_id}/favorite/movies?api_key=${keys.api_key}&session_id=${keys.session_id}`;
        let results = await fetch(url);
        let data = await results.json();
        console.log(data.results);
        data.results.forEach(e => {
            const checkWatch = (element) => element.id === e.id;
            let watchBool = watchList.some(checkWatch);
            printMovie(e,true,watchBool);})
        favoritas  =  data.results;
    } catch (error) {
        console.log(err);
    }
}

async function showWatch() {
    moviesResult.innerHTML="";
    try {
        let url = `https://api.themoviedb.org/3/account/${keys.account_id}/watchlist/movies?api_key=${keys.api_key}&language=en-US&session_id=${keys.session_id}&sort_by=created_at.asc&page=1`;
        let results = await fetch(url);
        let data = await results.json();
        console.log(data.results);
        watchList = data.results;
        data.results.forEach(e =>{
            const checkFav = (element) => element.id === e.id;
            let favBool = favoritas.some(checkFav);
            printMovie(e,favBool,true);})
    } catch (error) {
        console.log(err);
    }
}




async function searchMovies(query,page){
    pages.query = query;
    moviesResult.innerHTML="";
    try {
        
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${keys.api_key}&language=en-US&query=${query}&page=${page}`;
        let results = await fetch(url);
        let data = await results.json();
        pages.total_pages = data.total_pages;
        console.log('resultado búsqueda ',data);
        //busca favoritas
       
        let url2 = `https://api.themoviedb.org/3/account/${keys.account_id}/favorite/movies?api_key=${keys.api_key}&session_id=${keys.session_id}`;
        let favMovie = await fetch(url2);
        let data2 = await favMovie.json();


        let url3 = `https://api.themoviedb.org/3/account/${keys.account_id}/watchlist/movies?api_key=${keys.api_key}&language=en-US&session_id=${keys.session_id}&sort_by=created_at.asc&page=1`;
        let watchMovie = await fetch(url3);
        let data3 = await watchMovie.json();
        console.log(data3.results);


        data.results.forEach( movie => {
            const checkFilmFav = (element) => element.id ===  movie.id;
            const checkFilmWatch = (element) => element.id ===  movie.id;
            let favBool = data2.results.some(checkFilmFav);
            let watchBool = data3.results.some(checkFilmWatch);
            console.log(watchBool);
            printMovie(movie,favBool,watchBool)
        });
       
    } catch (error) {
        console.log(error);
    }
    clearInput();
    removeActive();
}


/* FUNCIONS D'INTERACCIÓ AMB EL DOM */

// Click Favorites
document.getElementById("showFavs").addEventListener("click", function(){
    removeActive();
    this.classList.add("active");

    showFavs();
})

// Click Watchlist
document.getElementById("showWatch").addEventListener("click", function(){
    removeActive();
    this.classList.add("active");

    showWatch();
})

/* Funcions per detectar la cerca d'una pel·lícula */
// Intro a l'input
document.getElementById("search").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        pages.current_page = 1;
        searchMovies(this.value,pages.current_page);
    }
});

// Click a la lupa
document.querySelector(".searchBar i").addEventListener("click", ()=>searchMovies(document.getElementById("search").value));

// Netejar l'input
document.getElementById("search").addEventListener('click', ()=>clearInput()); 

function clearInput(){
    document.getElementById("search").value="";
}

// Elimina l'atribut active del menú
function removeActive(){
    document.querySelectorAll(".menu li a").forEach(el=>el.classList.remove("active"));
}

/* Funció per printar les pel·lícules */
function printMovie(movie, fav, watch){
    let favIcon = fav ? 'iconActive' : 'iconNoActive';
    let watchIcon = watch ? 'iconActive' : 'iconNoActive';

    moviesResult.innerHTML += `<div class="movie">
                                    <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
                                    <h3>${movie.original_title}</h3>
                                    <div class="buttons">
                                        <a id="fav" onClick="setFav(${movie.id}, ${!fav})"><i class="fa-solid fa-heart ${favIcon}"></i></a>
                                        <a id="watch" onClick="setWatch(${movie.id}, ${!watch})"><i class="fa-solid fa-eye ${watchIcon}"></i></a>
                                    </div>`;
}


