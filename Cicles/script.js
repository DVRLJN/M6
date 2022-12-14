let llistatCicles = [];

function afegirCicle(){
    
    let nom = document.getElementById("cicle_nom").value;
    let categoria = document.getElementById("cicle_categoria").value;
    let numAlumnes = document.getElementById("cicle_alumnes").value;
    let abreviatura = document.getElementById("cicle_abr").value;

    let cicle = new Cicle(nom,categoria,numAlumnes,abreviatura);
    let value = document.getElementById("editCicle").value;

    if( value === "-1"){
        //Afegim el cicle al llistat
        llistatCicles.push(cicle);
        
    }else{
        //Editar cicle
        llistatCicles[value].nom = nom;
        llistatCicles[value].categoria = categoria;
        llistatCicles[value].numAlumnes = numAlumnes;
        llistatCicles[value].abreviatura = abreviatura;
        llistatCicles[value].setNumEdicions();
    }
    
    //Actualitzem el selector
    actualitzarSelector();

    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();

    document.getElementById("editCicle").value= -1;
}

function afegirModul(){
    let cicle = document.getElementById("modul_cicle").value;
    let modul_nom = document.getElementById("modul_nom").value;
    let modul_num = document.getElementById("modul_num").value;
    let modul_hores = document.getElementById("modul_hores").value;

    let modul = new Modul(cicle,modul_nom,modul_num,modul_hores);
    console.log(modul);
    llistatCicles[parseInt(cicle)].addModul(modul);
    
    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();
}

//Funció per llistar els cicles
function printLlistat (llistat){
    let str="";
    llistat.forEach(function(element, index){
        str += element.toString(index);
    });

    document.getElementById("llistat").innerHTML=str;
}

//Funció per actualitzar el selector de cicles cada vegada que afegim un cicle
function actualitzarSelector(){
    let select = document.getElementById('modul_cicle');
    select.innerHTML = "";
    llistatCicles.forEach(function(element, index){
        let opt = document.createElement('option');
        opt.value = index;
        opt.text = element.nom;
        select.appendChild(opt);
    });
}

//Funció per eliminar un cicle
function removeCicle(i){
    llistatCicles.splice(i,1);
    printLlistat(llistatCicles);
}

//Funció per calcular les hores
function calculHores(i){
    let count = 0;
    llistatCicles[i].modul.forEach( e => count = count + parseInt(e.hores));
    alert(`Hores totals del cicle: ${count}`);
}

//Funció per editar un cicle
function editCicle(i){
    document.getElementById("cicle_nom").value = llistatCicles[i].nom;
    document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
    document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
    document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;
    document.getElementById("editCicle").value=i;

}



//Funció per netejar els formularis
function netejarFormularis(){
    var inputs = document.getElementsByTagName("input");
    for (let i=0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    var selects = document.getElementsByTagName("select");
    for (let i=0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}

class Cicle{

    
    ultimaModificacio;
    constructor(nom,categoria,numAlumnes,abreviatura){
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.modul = [];
        this.numEdicions = 0;
    }
    setNumEdicions(){
        this.numEdicions++;
        var opciones = { year: 'numeric', month: 'short', day: 'numeric', hour:'numeric', minute:'numeric', second:'numeric' };
        this.ultimaModificacio = new Date().toLocaleDateString('es',opciones)
        .replace('.','')
        .replace(/-([a-z])/, function (x) {return '-' + x[1].toUpperCase()});
        console.log(this.ultimaModificacio);;
    }
    toString(index){
        let str = `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${this.abreviatura.toUpperCase()}. ${this.nom}</h5>
        <h6 class="text-gray-700">${this.categoria}</h6>
        <p class="font-normal text-gray-700">Num d'alumnes: ${this.numAlumnes}</p>`;
        this.modul.sort().forEach((e) =>{ str += `<p class="font-normal text-gray-700">${e.toString()}</p></br></br>`});
        str +=
        `<button type="button" onClick="removeCicle(${index})" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
        <button type="button" onClick="editCicle(${index})" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
        <button type="button" onClick="calculHores(${index})" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>
    </div>`;
    return str;
    }
    addModul(value){
        this.modul.push(value);
    }
}

class Modul{

    constructor(cicle,nom,num,hores){
        this.cicle = cicle;
        this.nom = nom;
        this.num = num;
        this.hores = hores;
    }
    toString(){
        return `MP${this.num}.${this.nom}(${this.hores})`;
    }
    
}