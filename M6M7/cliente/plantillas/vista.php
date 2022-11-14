

<?php

//CAMBIAR FORANEA DE IMG A PRODUCTO PARA PODER IMPRIMIR MEJOR

$idUsuario = $_GET['idUsuario'];
$db = conectar();
$select = $db->prepare("SELECT * FROM product where IdUser = '$idUsuario'");
    $select->execute();
    $select -> bindColumn('nombre',$nombreProducto);
    $select -> bindColumn('precio',$precioProducto);
    $select -> bindColumn('descripcion',$descripcionProducto);
    $select -> bindColumn('IdProduct',$idProducto);
    $select -> bindColumn('categoria',$catProducto);
    $select -> bindColumn('subCategoria',$subCatProducto);
    $infoCol = "";

    while ($fila = $select->fetch(PDO::FETCH_BOUND)) {
        $selectImg = $db->prepare("SELECT * FROM images where idProduct = '$idProducto'");
        $selectImg->execute();
        $image = $selectImg->fetchAll();
         $img1 = $image[0][1];
         $img2 = $image[1][1];
         $img3 = $image[2][1];
         $img4 = $image[3][1];
      $infoProducto = "<div class='flex m-2 flex-row'>
                        <div class='flex m-2 border-r-4 border-b-2 flex-col justify-center items-center w-1/2'>
                          <h5 class='text-center text-gray-900 text-lg font-medium '>$nombreProducto</h5>
                          <div class='flex flex-row justify-center'>
                          <p class='text-xs text-gray-600'>$subCatProducto</p>
                          <span class='text-xs'>|</span>
                          <p class='text-xs text-gray-600'>$catProducto</p>
                          </div>
                          <p class='text-center text-gray-600 text-base mb-4 mt-4'>$descripcionProducto</p>
                          <p class='text-gray-600 text-blue-600 text-xl text-center mb-2'>$$precioProducto</p>
                        </div>
                        <div class='flex flex-col border-b-2 mx-auto gap-2 w-1/4'>
                          <img class='' src='$img1'></img>
                          <div class='flex flex-row w-4/12'>
                            <img src='$img2'></img>
                            <img src='$img3'></img>
                            <img src='$img4'></img>
                          </div>
                        </div>

                        </div>  
                        ";
      $infoCol = $infoProducto;
      echo $infoCol;
    }

  /* 
    $selectImg = $db->prepare("SELECT * FROM images where idProduct = '$idProducto'");
    $selectImg->execute();
    $selectImg -> bindColumn('imagen',$img);
    $imagenesP = "";

    while($file = $selectImg->fetch(PDO::FETCH_BOUND)){
      $imagenesPrueba = "<div>imagenes</div>";

      $imagenesP = $imagenesP.$imagenesPrueba;
    }
    
    print "<div class='w-full flex flex-col bg-blue-200'>".$infoCol.$imagenesP."</div>";  */
?>

  <!-- REVISA BIEN LOS DIVS -->



   


