let images  = [];
let dropArea = document.getElementById('drop-area');
let titulo = document.getElementById('titulo');
let btnFiles = document.getElementById('btnFiles');
let inputFile = document.getElementById('input-file');
let preview = document.getElementById('preview');
let form = document.getElementById('form')


/* MAPA */
let prod = document.getElementById('productos');
let mapa = document.getElementById("map");
let lat = document.getElementById('latitude'); 
let long = document.getElementById('longitude'); 
let calle = document.getElementById('calle');
let numCalle = document.getElementById('numCalle');
let cp = document.getElementById('cp');
let ciudad = document.getElementById('ciudad');


btnProducto.addEventListener('click', function(){
  mapa.classList.add('hidden');
  prod.classList.remove('hidden');
})
btnMap.addEventListener('click', function(){
  prod.classList.add('hidden');
  mapa.classList.remove('hidden');
})


/* MAPA */
async function initMap(address) {
    console.log('adress: ',address);
    const bcn = { lat: 41.390205, lng: 2.154007 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 9,
      center: bcn
    });
    let userID=document.getElementById("userID").value;

    fetch("./location/location.php?id="+userID,{headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
    .then((response) => response.json())
    .then((data) => {
        data.forEach(e => {

            const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h1 id="firstHeading" class="firstHeading">Barcelona</h1>' +
            '<div id="bodyContent">' +
            "<p><b>"+e.nombre+"</b></br><span>calle: "+e.calle+"</span></br><span>num: "+e.num+"</span></br><span>cp: "+e.cp+"</span></p>" +
            "</div>" +
            "</div>";
            const infowindow = new google.maps.InfoWindow({
                content: contentString,
                ariaLabel: "Barcelona",
              });
             let marker = new google.maps.Marker({
                position: {lat: parseFloat(e.lat), lng: parseFloat(e.long)},
                map: map
            });  
            marker.addListener("click", () => {
                infowindow.open({
                  anchor: marker,
                  map
                });
              });
        })
    })
    .catch((error) => {});

    let geocoder = new google.maps.Geocoder();  
    geocoder.geocode( { 'address': address}, function(results, status) {  
    if (status == google.maps.GeocoderStatus.OK) { 
    latitude = results[0].geometry.location.lat();  
    longitude = results[0].geometry.location.lng();  
    calleNumGeo = results[0].address_components[0].short_name;
    calleGeo = results[0].address_components[1].short_name;
    cpGeo = results[0].address_components[6].short_name;
    ciudadGeo = results[0].address_components[2].short_name;

    lat.value = latitude;
    long.value = longitude;
    calle.value = calleGeo;
    numCalle.value = calleNumGeo;
    cp.value = cpGeo;
    ciudad.value = ciudadGeo;
    }
});
  } 
 window.initMap = initMap; 



/* drag&&drop */
let accion = ['dragover','dragleave','drop'];
accion.forEach(evt =>{
    dropArea.addEventListener(evt, prevDefault);

    dropArea.addEventListener(evt, function(e){
        switch (evt) {
            case 'dragover':
                dropArea.classList.add('active');
                titulo.innerText = 'Soltar';
                break;
            case 'dragleave':
                dropArea.classList.remove('active');
                titulo.innerText = 'Añade aquí tus imágenes';
                break;
            case 'drop':
                images = images.concat(Array.from(e.dataTransfer.files));
                showFiles();
                dropArea.classList.remove('active');
                titulo.innerText = 'Añade aquí tus imágenes';
                break;
            default:
                break;
        }
    });
});
function showFiles(e) {
   
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        images.forEach((e,index) =>{
            const docType = e.type;
            if(validExtensions.includes(docType)){
                previewFile(e);
            }else{
                images.splice(index,1);
            }  
        })
} 
function previewFile(e){
    let reader = new FileReader();
    reader.addEventListener("load", function (e,index) {

        let prev = `<div class="previewImage">
                        <img src="${this.result}"/>
                        <span onclick="remove(${index})" class=" ml-12 material-symbols-outlined removeBtn">x</span>
             </div>`;
        preview.innerHTML += prev;
      }, false);

      reader.readAsDataURL(e);
      preview.innerHTML = '';
}

function remove(i){
    images.splice(i,1);
    console.log(images);
    preview.innerHTML = '';
    showFiles();
    console.log('imagen borrada');
}
function prevDefault (e) {
    e.preventDefault();
}
btnFiles.addEventListener("click", function(e){
    e.preventDefault();
    inputFile.click()
});
inputFile.addEventListener("change", function(e){
    console.log('antes de concat ',images);
    images = images.concat(Array.from(inputFile.files));
    console.log('despues de concat ',images);
    showFiles(); 
});


function editar(id) {
    console.log('editando...',id);
}
/* MAPA */
form.addEventListener("submit", function(e){
    e.preventDefault();  
        const dataTransfer = new DataTransfer();
        images.forEach(file =>{
            dataTransfer.items.add(file);
    });
        inputFile.files = dataTransfer.files;
        console.log('Imágenes en el input file',inputFile.length);
        form.submit();
});

/* LOCOK */
let btnLocOk = document.getElementById('btnLocOk');
    btnLocOk.addEventListener('click',  function(e){
        e.preventDefault();
        initMap(document.getElementById('inputLocation').value);
     /*    if(btnLocOk.value != ''){
        document.getElementById("btnAdd").disabled = false; 
        document.getElementById("btnAdd").classList.add('bg-green-500');
        }else{
            document.getElementById("btnAdd").disabled = true; 
            document.getElementById("btnAdd").classList.add('bg-gray-500');
        } */
    });



//BUSCADOR
let search = document.getElementById('search');
search.addEventListener('keyup', ()=> {
    let value = document.getElementById('search').value || '';
    console.log(value);
    let prod='';
    fetch(`./plantillas/vista.php?search=${value}`)
    .then((response) => response.json())
    .then((data) => {
        
        let vista = document.getElementById('vista');
        data.forEach(e =>{
            prod = prod + "<div class='px-3 pt-4 w-1/3 items-center sm:mx-16 sm:my-10 gap-10 producto'><div class='h-64 sm:h-96 mb-10 sm:mb-0 bg-gradient-to-t from-blue-500 to-red-600 rounded-lg transform -rotate-6'><div class='w-full  h-full bg-white rounded-lg transform rotate-6 shadow-lg focus:ring-2'><div class=' flex sm:block items-center'><div class=' px-2 w-1/2 sm:w-full'><div id='carouselDarkVariant'class=' mt-2 carousel slide carousel-fade carousel-dark relative'data-bs-ride='carousel'><div class='carousel-inner relative w-full overflow-hidden hover:scale-150 transition-all duration-500 cursor-pointer'><div class='carousel-item active relative float-left w-full'><img src='../cliente/"+e.img1+"' class=' object-cover h-32 block w-full '/></div><div class='carousel-item relative float-left w-full'><img src='../cliente/"+e.img2+"' class=' object-cover h-32 block w-full'/></div><div class='carousel-item relative float-left w-full'><img src='../cliente/"+e.img3+"' class=' object-cover h-32 block w-full'/></div><div class='carousel-item relative float-left w-full'><img src='../cliente/"+e.img4+"' class=' object-cover h-32 block w-full'/></div></div></div></div><div class=''><div class='flex flex-col text-center sm:px-5 py-8 justify-around'><div><h3 class='font-serif'>"+e.nombre+"</h3></div><div><h4 class='font-serif text-gray-400'>"+e.descripcion+"</h4></div><div><h2 class=' text-xl  md:text-2xl font-serif text-blue-500'>"+e.precio+"<span>$</span></h2></div></div><div class='flex justify-around'><div><button  class='sm:p-3 hover:border border-red-800 md:p-4 py-2 px-2 bg-gray-200 font-serif font-semibold text-black border-solid rounded-md'><p idProd=$idProducto class='btnEdit' >Editar</p></button></div><div><button class='sm:p-3 hover:border border-red-800 md:p-4 py-2 px-2 bg-black text-gray-100 font-serif font-semibold rounded-md'><a href='elimina.php?idP=$idProducto'>Eliminar</a></button></div></div></div></div></div></div></div>";
        })
         vista.innerHTML = prod; 
    })  
});

//AGREGA
/* let btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', () => {
    if(btnAdd.disabled = false){
        const toast = document.querySelector(".toast");
        toast.innerHTML = "Producto agregado correctamente";
    toast.classList.add("bg-green-500", "text-white", "p-4", "rounded-lg", "fixed", "bottom-0", "right-0", "m-4", "opacity-100", "block");

    }
}); */


//EDITAR
let btnEdit = document.querySelectorAll('.btnEdit');
let cambioBtn = true;
btnEdit.forEach(el=>{
    
    let id = el.getAttribute('idProd');
    
    
    el.addEventListener('click', () => {
        /* document.getElementById("btnAdd").disabled = true;  */
        console.log('id producto: ',id);
        cambioBtn = true;
        if(cambioBtn){
        let btnAdd = document.getElementById('btnAdd');
        btnAdd.innerHTML = 'Confirmar cambios';
        }else{
            let btnAdd = document.getElementById('btnAdd');
            btnAdd.innerHTML = 'Agegar a la tienda';
        }

        fetch("./edita.php?id="+id,{headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'method':'GET'
          }})
        .then((response) => response.json())
        .then((data) =>{
            document.getElementById('nombreProd').value = data[0].nombre;
            document.getElementById('precioProd').value = data[0].precio;
            document.getElementById('descripcionProd').value = data[0].descripcion;
            document.getElementById('selectCat').value = data[0].categoria;
            document.getElementById('selectSub').value = data[0].subCategoria;
            document.getElementById('inputLocation').value = `${data[0].calle} | ${data[0].num} | ${data[0].cp} | ${data[0].ciudad}`;
            document.getElementById('idProducto').value = data[0].idProducto;
        })
        cambioBtn = false;
    })
    
})

