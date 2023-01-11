
<?php
session_start();


if($_SERVER['REQUEST_METHOD']!='GET'){
    return;
}

$idP = $_GET['id'];  
$db = conectar();
$return = array();

$stmt = $db->prepare('SELECT * FROM localizacion INNER JOIN product ON localizacion.IdProduct = product.IdProduct WHERE product.IdProduct = ?');

$stmt->execute(array($idP));
$fila = $stmt->fetch(PDO::FETCH_ASSOC);


    $object = new stdClass();
    $object->nombre = $fila["nombre"];
    $object->precio = $fila["precio"];
    $object->descripcion = $fila["descripcion"];
    $object->categoria = $fila["categoria"];
    $object->subCategoria = $fila["subCategoria"];
    $object->calle=$fila["calle"];
    $object->num = $fila["numCalle"];
    $object->cp = $fila["cp"];
    $object->ciudad = $fila["ciudad"];
    $object->idProducto=$idP;

    array_push($return,$object);


echo json_encode($return);


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