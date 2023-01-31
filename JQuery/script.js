
let projectes;
let i=0; 


//RECOGER DATOS
$.get("data/data.json", function(data) {
    console.log(data.projectes);
    projectes = data.projectes;
    mostrarData(i);
  });
//2. Fes una funció que mostri la informació a la pantalla



function mostrarData(i){
  $("#projecteContainer").removeClass();
  $("#projecteContainer").addClass(projectes[i].position)
  $("#projecteContainer img").attr("src", projectes[i].img);

  if(projectes[i].position == 'center'){
    $("#projecteContainer img").css("width", calcWidth(`${projectes[i].mida}`)+"%");
  }else{
    $("#projecteContainer img").css("width","100%")
    $("#projecteContainer img").css("max-height","100vh")
  }
  if(projectes[i].colorFons == '#ffffff'){
    $(':root').css('--colorLletres','#000000')
  }else{
    $(':root').css('--colorLletres','#ffffff')
  }
  $(':root').css('--colorFons',`${projectes[i].colorFons}`);
  $(".nomProjecte").text(`${projectes[i].titol}`);
  $(".numSlider").text(`${projectes[i].numSlides}/${projectes.length}`);
}


//Funció per calcular l'amplada en el cas que la posició sigui center
function calcWidth(width){
   let result = width.split("/");
   return (result[0]/result[1])*100;
}

//NEXT
$('.directionRight').click(function(){
  console.log('Siguiente imagen');
  i++;
  if(i > projectes.length -1){
    i = 0;
  }
  mostrarData(i);
  $("img").slideUp().fadeOut().slideDown().fadeIn();
    
});

//PREV
$('.directionLeft').click(function(){
  console.log('Anterior imagen');
  i--;
 if(i < 0){
  i = projectes.length-1
 }
 mostrarData(i);
 $("img").slideUp().fadeOut().slideDown().fadeIn();

   
   
  
});