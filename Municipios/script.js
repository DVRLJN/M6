




let map = L.map('map').setView([41.382894, 2.177432], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

municipios = [];
let markers = L.markerClusterGroup(); 


let LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: '',
        iconSize:     [40, 50],
        shadowSize:   [20, 64],
        iconAnchor:   [11, 36],
        shadowAnchor: [4, 30],
        popupAnchor:  [-3, -76]
    }
});



fetch("municipis.json")
.then((response) => response.json())
.then((data) => {

  
  
    for (const [clave, valor] of Object.entries(data.elements)){
        let icono = icon(valor.nombre_habitants);

        municipios = valor.centre_municipal.split(',');
        municipiNom = `Comarca: ${valor.grup_comarca.comarca_nom} <br/> Habitantes: ${valor.nombre_habitants} <br/> Extensión: ${valor.extensio}<br/> Altitud: ${valor.altitud}`;

        let marker = L.marker(municipios,{icon: icono})
        marker.bindPopup(municipiNom).openPopup(); 
        markers.addLayer(marker);
    }
    
    map.addLayer(markers)

    

});

function icon(hab) {
  if(hab<1000){
    return new LeafIcon({iconUrl: '/yellow.png'});
  }else if(hab >=1000 && hab <=5000){
    return new LeafIcon({iconUrl: '/red.png'});
  }else if(hab >5000 && hab <10000){
    return new LeafIcon({iconUrl: '/purple.png'});
  }else if(hab >= 10000){
    return new LeafIcon({iconUrl: '/blue.png'});
  }else{
    return new LeafIcon({iconUrl: '/black.png'});
  }
}
