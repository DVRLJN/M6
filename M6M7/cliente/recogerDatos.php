<?php
session_start();
/* if (!isset($_SESSION['UserDatos']) ){
    header('Location: ./login/index.php');
}  
 */
if($_SERVER['REQUEST_METHOD']!='POST'){
    echo 'error';
}
$idProducto = '';

if(isset($_POST['idProducto'])){
    $idProducto = $_POST['idProducto'];
};

$idUser = $_SESSION['UserDatos']['id'];
$categoria = $_POST['categoria'];
$subCategoria = $_POST['subCategoria'];
$nombre = $_POST['nombre'];
$precio = floatval($_POST['precio']);
$descripcion = $_POST['descripcion'];
$lat = $_POST['lat'];
$long = $_POST['long'];
$calle = $_POST['calle'];
$numCalle = $_POST['numCalle'];
$cp = $_POST['cp'];
$ciudad = $_POST['ciudad'];
//$search = $_GET['search'];


//Conectamos con base de datos
$db = conectar();


if($_POST['idProducto']==''){
    insertarProducto($db,$idUser,$nombre,$precio,$descripcion,$categoria,$subCategoria,$lat,$long,$calle,$numCalle,$cp,$ciudad); 
    header("Location:./index.php");    
}else{
    actualizarProducto($db,$idUser,$nombre,$precio,$descripcion,$categoria,$subCategoria,$lat,$long,$calle,$numCalle,$cp,$ciudad,$idProducto);
}

//ME HE QUEDADO AQUI HAY QUE ACTUALIZAR EL PRODUCTO

function actualizarProducto($db,$idUser,$nombre,$precio,$descripcion,$categoria,$subCategoria,$lat,$long,$calle,$numCalle,$cp,$ciudad,$idProducto){
    actualizarDatos($db,$idUser,$nombre,$precio,$descripcion,$categoria,$subCategoria,$idProducto);

      for ($i=0; $i < count($_FILES['inputFiles']['name']); $i++) { 
        actualizarImages($db,tratarImagen($_FILES['inputFiles']['name'][$i],$_FILES['inputFiles']['tmp_name'][$i]),$idProducto);  
    } 
    actualizarLocation($db,$idProducto,$lat,$long,$calle,$numCalle,$cp,$ciudad); 
    header("Location:./index.php");   
}
 
function actualizarLocation($db,$idProducto,$lat,$long,$calle,$numCalle,$cp,$ciudad){
    $insert = $db->prepare('UPDATE localizacion SET  latitude = ?, longitude = ?,calle = ? ,numCalle=?,cp=?,ciudad=? WHERE idProduct = ?');
    $insert->execute(array($lat,$long,$calle,$numCalle,$cp,$ciudad,$idProducto)); 
}


function actualizarImages($db,$image,$idProduct){
        $select = $db->prepare('SELECT * FROM images WHERE idProduct = ?');
        $select->execute([$idProduct]);
        if($select->rowCount() == 0){
            try {
                $insert = $db->prepare('UPDATE images SET imagen = ? WHERE idProduct = ?');
                $insert->execute(array($image,$idProduct)); 
              } catch (PDOException $exception ) {
                  throw new Exception("Error procesando petición", 1);
              } 
        }
    
  }

function actualizarDatos($db,$idUser,$nombre,$precio,$descripcion,$categoria,$subCategoria,$idProducto){
    try {
    $insert = $db->prepare('UPDATE product SET nombre = ?, precio = ?, descripcion = ?, categoria = ?, subCategoria = ? WHERE IdProduct = ?');
    $insert->execute(array($nombre,$precio,$descripcion,$categoria,$subCategoria,$idProducto)); 
    return $db->lastInsertId(); 

    
} catch (PDOException $exception ) {
    throw new Exception("Error Processing Request", 1);
} 
}
function tratarImagen($file,$fileTmp){
    $dir_subida = 'uploads/';
    $img = $dir_subida.basename($file);
    move_uploaded_file($fileTmp, $img);
    return $img;
}

function insertarProducto($db,$idUser,$nombre,$precio,$descripcion,$categoria,$subCategoria,$lat,$long,$calle,$numCalle,$cp,$ciudad){
    
    $idProduct = insertDatos($db,$idUser,$nombre,$precio,$descripcion,$categoria,$subCategoria); 
   
    for ($i=0; $i < count($_FILES['inputFiles']['name']) ; $i++) { 
        insertImages($db,tratarImagen($_FILES['inputFiles']['name'][$i],$_FILES['inputFiles']['tmp_name'][$i]),$idProduct);  
    }
     insertarLocation($db,$idProduct,$lat,$long,$calle,$numCalle,$cp,$ciudad); 
}
function insertDatos($db,$idUser,$nombre,$precio,$descripcion,$categoria,$subCategoria){
        try {
        $insert = $db->prepare('INSERT INTO product(nombre,precio,descripcion,categoria,subCategoria,IdUser) VALUES(?,?,?,?,?,?)');
        $insert->execute(array($nombre,$precio,$descripcion,$categoria,$subCategoria,$idUser)); 
        return $db->lastInsertId(); 

        
    } catch (PDOException $exception ) {
        throw new Exception("Error Processing Request", 1);
    } 
}
function insertImages($db,$image,$idProduct){
    
    try {
      $insert = $db->prepare('INSERT INTO images(imagen,idProduct) VALUES(?,?)');
      $insert->execute(array($image,$idProduct)); 
    } catch (PDOException $exception ) {
        throw new Exception("Error procesando petición", 1);
    }  
  }
  
function conectar(){
    $username = 'root';
    $password = 'root';
    $dsn = "mysql:host=localhost;dbname=m6m7;port=8889";
    try{
    return new PDO($dsn,$username,$password);
    }catch (PDOException $exception){
        echo $exception->getMessage();
    }
}
function insertarLocation($db,$idProduct,$lat,$long,$calle,$numCalle,$cp,$ciudad){
    $insert = $db->prepare('INSERT INTO localizacion(idProduct,latitude,longitude,calle,numCalle,cp,ciudad) VALUES(?,?,?,?,?,?,?)');
    $insert->execute(array($idProduct,$lat,$long,$calle,$numCalle,$cp,$ciudad)); 
}
 
?>