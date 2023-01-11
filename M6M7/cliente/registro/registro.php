<?php
session_start();
if ($_SERVER["REQUEST_METHOD"]!="POST"){
    return;
}
$userNombre = $_POST['nombre'];
$userEmail = $_POST['email'];

$userPass = password_hash($_POST['password'],PASSWORD_DEFAULT);

//Conectamos con base de datos
$db = conectar();

if(insertarUsuario($db,$userNombre,$userEmail,$userPass) == 0){
    include_once "fail.php";
}else{
    header("Location: ../index.php");
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

            $select = $db->prepare("SELECT IdUser,nombre,email FROM users where email = '$userEmail'");
            $select->execute();
            $select -> bindColumn('email',$email);
            $select -> bindColumn('IdUser',$idUser);
            $select -> bindColumn('nombre',$nombre);
            $select ->fetchAll(PDO::FETCH_COLUMN);
            $_SESSION['UserDatos'] = ['email' => $email,'id' => $idUser,'name' => $nombre];
            return $idUser;
        }else{
            return 0;
        }
    }catch(PDOException $ex){
        throw new Exception("Error Processing Request", 1);
    }    
}
?>