<?php

include "funciones/functions.php";
get_head();
get_header($_GET['idUsuario']); 
?>

<section class="w-screen flex bg-white">
   <div class="w-3/5">
      <?php  get_form($_GET['idUsuario']) ;?> 
   </div>
   <div class="w-full mr-4">
      <h1 class="text-center w-full mt-8 text-2xl font-semibold tracking-wider capitalize text-white bg-red-800">Productos</h1>
      <div class="w-full flex flex-col  border-4">
         <?php  get_vista($_GET['idUsuario'])  ;?> 
      </div>
   </div>
</section>

