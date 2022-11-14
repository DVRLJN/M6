<?php
if ($_SERVER["REQUEST_METHOD"]!="POST"){
    return;
}

$userEmail = $_POST['email'];

$db = conectar();

if(buscarUsuario($db,$userEmail)){
    
    $select = $db->prepare("SELECT IdUser FROM users where email = '$userEmail'");
    $select -> bindColumn('IdUser',$idUser);
    
    $select->execute();
    header("Location: ../index.php?idUsuario=$idUser"); 
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
function buscarUsuario($db,$userEmail){
    //NO ESTA ENTRADO
    try{
        $select = $db->prepare("SELECT email,pass FROM users where email = '$userEmail'");
        $select -> bindColumn('email',$email);
        $select -> bindColumn('pass',$pass);
        $select->execute();
       
        if(empty($resultEmail)){
            return false;
        }else
        if($email==$userEmail && (password_verify($_POST['password'],$pass))){
            return true;}
        else{return false;}
    }catch(PDOException $exception){
        throw new Exception("Error Processing Request", 1);
    }
    return true;
}
?>
