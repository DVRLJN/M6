

let orden = true;
let dades;
let pokemonNames = [];
let dadesNames = [];
let table = document.getElementById('table');
let tableElement = document.getElementById('tableId');

table.classList.add('hidden');


async function generarTabla() {
    document.getElementById('btnT').classList.add('hidden');
    document.getElementById('btnG').classList.add('hidden');
    table.classList.remove('hidden');

    await fetch("pokemon.json")
    .then((response) => response.json())
    .then((data) => {
        dades =  data.pokemon;
        
    });
    crearTabla(dades);
}
function crearTabla(dades) {
    let cuerpoTabla = document.getElementById('cuerpoTabla');
        dades.forEach(e => {
            /* CREAR TABLA */
            let tr = document.createElement('tr');
            
            tr.classList.add('hover:bg-yellow-200');
            
            let img = e.img;

            let tdId = document.createElement('td');
            
            tdId.textContent = e.id;
            tr.appendChild(tdId);
            
            let tdName = document.createElement('td');
            tdName.textContent = e.name;
            tr.appendChild(tdName);
        
            tr.addEventListener("mouseover", function(e){
                document.getElementById('img').setAttribute('src',img)
            });
        
            let tdType = document.createElement('td');
            tdType.textContent = e.type;
            tr.appendChild(tdType);
        
            let tdCandy = document.createElement('td');
            tdCandy.textContent = e.weight;
            tr.appendChild(tdCandy);
        
            cuerpoTabla.appendChild(tr);
        }); 
}


function reload() {
    location.reload();
}


function orderList() {
        let btnDesc = document.getElementById('btnDesc');
        let btnAsc = document.getElementById('btnAsc');
        

        if(btnAsc.disabled && !btnDesc.disabled){
            dades.reverse((a,b) => a.id.localeCompare(b.id));
            borrarCrearElement();
            crearTabla(dades);
            btnDesc.disabled = true;
            btnAsc.disabled = false;
        }else if (!btnAsc.disabled && btnDesc.disabled){
            dades.reverse((a,b) => a.id.localeCompare(b.id));
            borrarCrearElement();
            crearTabla(dades);
            btnDesc.disabled =false;
            btnAsc.disabled = true;
        }
        
      
}

function mediaPeso() {
    num = 0;
    for (let i = 0; i < dades.length; i++) {
        let regex = /(\d+)\.*(\d*)/g;
        
        num = num + parseInt(dades[i].weight.match(regex));
    };
    num = num/dades.length;
    document.getElementById('mediaP').textContent = `Peso medio ${num.toFixed()} kg`;
}
function busqueda() {
    borrarCrearElement();
    let input = document.getElementById('searchInput').value;

    let poke = dades.filter(e => e.name.toLowerCase().includes(input.toLowerCase())); 
    crearTabla(poke); 
}
function borrarCrearElement() {
    let cuerpoTabla = document.getElementById('cuerpoTabla');
    if(cuerpoTabla.parentNode) {
        cuerpoTabla.parentNode.removeChild(cuerpoTabla);
    }
    let body = document.createElement('tbody')
    tableElement.appendChild(body);
    body.setAttribute('id','cuerpoTabla')
    body.classList.add('text-center')
}

let ordenado0 = false;
let ordenado2 = false;
let ordenado4 = false;
let ordenado6 = false;
function ordenar(par) {
    
    switch (par) {
        case 0:
            if(!ordenado0){
                orderList('asc');
                ordenado0 = true;
            }else{
                orderList('desc');
                ordenado0 = false;
            }
            break;
        case 2:
            if(!ordenado2){
                ordenado2 = true;
                dades.sort((a, b) => a.name.localeCompare(b.name));
            }else{
                ordenado2 = false;
                dades.reverse((a, b) => a.name.localeCompare(b.name));
            }
            borrarCrearElement();
            crearTabla(dades); 
            break;
        case 4:
            if(!ordenado4){
                ordenado4 = true;
                dades.sort((a, b) => a.type[0].localeCompare(b.type[0]));
            }else{
                ordenado4 = false;
                dades.reverse((a, b) => a.type[0].localeCompare(b.type[0]));
            }
            borrarCrearElement();
            crearTabla(dades); 
            break;
        case 6:
            if(!ordenado6){
                ordenado6 = true;
                dades.sort((a, b) => a.weight.localeCompare(b.weight));
            }else{
                ordenado6 = false;
                dades.reverse((a, b) => a.weight.localeCompare(b.weight));
            }
            borrarCrearElement();
            crearTabla(dades); 
            break
        default:
            borrarCrearElement();
            crearTabla(dades); 
            break;
    }
}

