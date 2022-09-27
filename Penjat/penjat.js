

intentos = 0;
letrasFallidas='';
letra='';
buenaArr =[]; 
partidasJugadas = 0;
partidasGanadas = 0;
partidasPerdidas = 0;
letrasUsadas = new Array();



function novaPartida(){
    reiniciaJuego();
    palabra = pedirPalabra().toLocaleUpperCase(); 
    buenaArr = transformar(palabra);
    document.getElementById('jocPenjat').classList.remove('hidden');
    console.log('transformar: '+buenaArr.join(''));
    mostrarBarraInicial(palabra,letra);
    agregarAbc(palabra);
    document.getElementById('img').classList.remove('hidden');
}
function reiniciaJuego() {
    intentos = 0;
    letrasFallidas='';
    letra='';
    buenaArr =[]; 
    letrasUsadas =  [];
    document.getElementById('letrasUsadas').innerHTML = letrasUsadas.join('');
    cargarImagen(intentos);
    document.getElementById('jocPenjat').classList.add('hidden');
    
}
function escogeLetra(letra,palabra) {
    
    console.log(`letra seleccionada: ${letra}`);
    mostrarBarraInicial(palabra,letra);
    document.getElementById(letra).setAttribute("onclick","");
    
}
function agregarAbc(palabra) {
    
    let abc = 'abcdefghijklmnñopqrstuvwxyz';
    let abcd = document.getElementById('abecedario');
    abcd.innerHTML = '';
    let abcArr = abc.split('');
    for (let i = 0; i < abc.length; i++) {
        let but = document.createElement('button');
        but.setAttribute("id", abcArr[i].toLocaleUpperCase());
        but.className = 'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded';
        but.innerText = abcArr[i];
        but.setAttribute("onclick", "escogeLetra(\""+ abcArr[i].toUpperCase() +"\",palabra)");
        abcd.appendChild(but);
    
        
    }
    
    
     
    
    
}
function mostrarBarraInicial(palabra,letra){
    let barr = document.getElementById('jocPenjat');
    if(palabra.includes(letra)){
        comprobarLetra(palabra,letra);
    }else{
        intentos++;
        letrasUsadasF(letra);
        cargarImagen(intentos);
    }
    console.log('intentos: ',intentos);
    barr.innerText = buenaArr.join(' ');  
}
function letrasUsadasF(letra) {    
    letrasUsadas.push(letra);
    document.getElementById('letrasUsadas').innerText ='Letras falladas: ' + letrasUsadas; 
}
function cargarImagen(intentos) {
    if(intentos!=6){
        let image = document.getElementById('img');
        image.src = './img_penjat/penjat_'+intentos+'.png';
    }else{
        alert('FIN DEL JUEGO');
        partidasPerdidas++;
        partidasJugadas++;
        window.localStorage.setItem('Partidas Jugadas', partidasJugadas);
        window.localStorage.setItem('Partidas perdidas', partidasPerdidas);
        reiniciaJuego();
    }
}
function comprobarLetra(palabra,letra) {
    let palabraArr = palabra.split('');

    for (let i = 0; i < palabra.length; i++) {
        if(palabraArr[i]==letra){
            buenaArr[i]=letra;
        }
    }
    if(buenaArr.join('')==palabra){
        alert ( 'HAS GANADO!');
        partidasGanadas++;
        partidasJugadas++;
        window.localStorage.setItem('Partidas Jugadas', partidasJugadas);
        window.localStorage.setItem('Partidas ganadas', partidasGanadas);
    }
}
function transformar(palabra){
    let palabraArr = [];
    for (let i = 0; i < palabra.length; i++) {
        palabraArr[i] = "_";
    }
    return palabraArr;
}
function pedirPalabra() {
    return prompt ("Introduce una palabra");
}

function mostrarEstadisticas(){
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('titulos').classList.add('hidden');
    document.getElementById('plays').innerText = partidasJugadas;
    document.getElementById('smile').innerText = partidasGanadas;
    document.getElementById('sad').innerText = partidasPerdidas;
}
function comeBack() {
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('titulos').classList.remove('hidden');
}




