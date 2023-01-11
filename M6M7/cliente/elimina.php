
<?php
session_start();


if($_SERVER['REQUEST_METHOD']!='GET'){
    return;
}

$idP = $_GET['idP'];

//CONECTAMOS CON LA BASE DE DATOS

$db = conectar();
try{
$select = $db->prepare('DELETE FROM localizacion  where IdProduct = ?' );
$select->execute(array($idP));
$select = $db->prepare("DELETE FROM images where IdProduct = ?");
$select->execute(array($idP));
$select2 = $db->prepare("DELETE FROM product where IdProduct = ?");
$select2->execute(array($idP));

}catch (PDOException $e){
    echo $e->getMessage();
}
header('Location: index.php'); 

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