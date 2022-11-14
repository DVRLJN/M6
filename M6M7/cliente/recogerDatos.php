<?php



if($_SERVER['REQUEST_METHOD']!='POST'){
    echo 'error';
}
$idUser = intval($_GET['idUser']);
$categoria = $_POST['categoria'];
$subCategoria = $_POST['subCategoria'];
$nombre = $_POST['nombre'];
$precio = floatval($_POST['precio']);
$descripcion = $_POST['descripcion'];


//Conectamos con base de datos
$db = conectar();
insertarProducto($db,$idUser,$nombre,$precio,$descripcion,$categoria,$subCategoria,); 
header("Location:./index.php?idUsuario=$idUser");

function tratarImagen($file,$fileTmp){
    $dir_subida = 'uploads/';
    $img = $dir_subida.basename($file);
    move_uploaded_file($fileTmp, $img);
    return $img;
}
function insertarProducto($db,$idUser,$nombre,$precio,$descripcion,$categoria,$subCategoria){
    $idProduct = insertDatos($db,$idUser,$nombre,$precio,$descripcion,$categoria,$subCategoria); 
    insertImages($db,tratarImagen($_FILES['img1']['name'],$_FILES['img1']['tmp_name']),$idProduct);
    insertImages($db,tratarImagen($_FILES['img2']['name'],$_FILES['img2']['tmp_name']),$idProduct);
    insertImages($db,tratarImagen($_FILES['img3']['name'],$_FILES['img3']['tmp_name']),$idProduct);
    insertImages($db,tratarImagen($_FILES['img4']['name'],$_FILES['img4']['tmp_name']),$idProduct);
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
        
?>