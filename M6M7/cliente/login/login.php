<?php
session_start();

if ($_SERVER["REQUEST_METHOD"]!="POST"){
    return;
}

$userEmail = $_POST['email'];
$userPass = $_POST['password'];
$db = conectar();

if(buscarUsuario($db,$userEmail,$userPass)){
    header("Location: ../index.php");  
}else{
    include_once "fail.php";
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
function buscarUsuario($db,$userEmail,$userPass){
    
    try{
        $select = $db->prepare("SELECT IdUser,nombre,email,pass FROM users where email = '$userEmail'");
        $select -> bindColumn('email',$email);
        $select -> bindColumn('pass',$pass);
        $select -> bindColumn('IdUser',$idUser);
        $select -> bindColumn('nombre',$nombre);
        $select->execute();
        $select->fetchAll();
      
        if(empty($email)){
            return false;
        }else
        if($email == $userEmail  && (password_verify($userPass,$pass))){
             $_SESSION['UserDatos'] = ['email' => $email,'id' => $idUser,'name' => $nombre];
 
            return true;}
        else{return false;}
    }catch(PDOException $exception){
        throw new Exception("Error Processing Request", 1);
    }
    return true;
}
?>
