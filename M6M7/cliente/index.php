
<?php
   session_start();
if (!isset($_SESSION['UserDatos']) ){
   header('Location: ./login/index.php');
}  
include "funciones/functions.php";
get_head();
get_header(); 
?>

<input type="hidden" id="userID" value="<?php echo $_SESSION['UserDatos']["id"];?>" />

<section class="w-screen flex ">
   <div class="w-3/5">
      <?php  get_form() ;?> 
   </div>
   <div class="w-4/5 mr-4 flex flex-col">
      <div class="flex flex- justify-around text-center w-full mt-8 text-2xl font-semibold tracking-wider capitalize text-white ">
         <button  class="w-full bg-red-800" id="btnMap">Mapa</button>
        <button class="w-full bg-blue-800"  id="btnProducto">Productos</button> 
      </div>
      
      <!-- BUSCADOR -->
      <div  class="w-full mt-2 ">
         <div id="productos" class="w-full flex flex-row flex-wrap">

         <div class="relative border-b-2 flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input
        class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        placeholder="Buscar.." /> 
    </div>
     <!-- /BUSCADOR -->  

      <div class="w-full flex flex-wrap" id="vista">
         <?php 
         get_vista();
         ?> 
         </div>
      </div>   
         <div class="hidden" id="map"></div>  
         <style>  
            #map{  
               height: 400px;  
               width:100%;  
            }  
         </style> 

      </div>
   </div>
</section>

