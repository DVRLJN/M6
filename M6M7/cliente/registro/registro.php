<?php
session_start();
if ($_SERVER["REQUEST_METHOD"]!="POST"){
    return;
}
$userNombre = $_POST['nombre'];
$userEmail = $_POST['email'];
$userPass = password_hash($_POST['password'],PASSWORD_DEFAULT);

//HAY QUE CREAR UNA SESION AL LOGEARSE Y AL REGISTRARSE TAMBIEN?? ME HE QUEDADO AQUI
crearSesion($userEmail);


//Conectamos con base de datos
$db = conectar();
$idUser = insertarUsuario($db,$userNombre,$userEmail,$userPass);

if($idUser == 0){
    include_once "fail.php";
}else{
    header("Location: ../index.php?idUsuario=$idUser");
}

function crearSesion($userEmail){
    $_SESSION['userSession'] = $userEmail;
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
function insertarUsuario($db,$userNombre,$userEmail,$userPass){
   
    try{
        $select = $db->prepare("SELECT IdUser FROM users where email = '$userEmail'");
        $select->execute();
        $resultSelect = $select ->fetchAll(PDO::FETCH_COLUMN);
        
        if(empty($resultSelect)){
            $insert = $db->prepare('INSERT INTO users(nombre,email,pass) VALUES(?, ?, ?)');
            $insert->execute(array($userNombre,$userEmail,$userPass));

            $select = $db->prepare("SELECT IdUser FROM users where email = '$userEmail'");
            $select->execute();
            $selectId = $select ->fetchAll(PDO::FETCH_COLUMN);
            return $selectId[0];
        }else{
            return 0;
        }
    }catch(PDOException $ex){
        throw new Exception("Error Processing Request", 1);
    }    
}
?>