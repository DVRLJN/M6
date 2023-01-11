<?php


$idUsuario = $_GET['id'];
$return = array();

$db = conectar();
$select = $db->prepare('SELECT * FROM localizacion INNER JOIN product ON localizacion.IdProduct = product.IdProduct WHERE product.IdUser = ?' );
$select->execute(array($idUsuario));

while($fila = $select->fetch(PDO::FETCH_ASSOC)){


    $object = new stdClass();
    $object->lat = $fila["latitude"];
    $object->long = $fila["longitude"];
    $object->calle = $fila["calle"];
    $object->num = $fila["numCalle"];
    $object->ciudad = $fila["ciudad"];
    $object->cp = $fila["cp"];
    $object->nombre = $fila["nombre"];
    array_push($return,$object);

}
echo json_encode($return);

//FALTA RECOGER LA LOCALIZACIÓN Y PONERLA EN EL MAPA

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

