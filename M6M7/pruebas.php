<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

<form 
  action="./pruebas.php"
  method="POST">
  <input type="text" name="input">
</br>
  <input type="text" name="input2">
  <button type="submit">entrar</button>
</form>  
<?php

if($_SERVER["REQUEST_METHOD"]!="POST"){
  return;
}

$pass = password_hash($_POST['input'],PASSWORD_DEFAULT);
echo "contraseña cifrada 1 : </br>".$pass."</br>";

if(password_verify($_POST['input'],$pass)){
  echo "igual";
}else{
  echo"distinta";
}


$pass2 = password_hash($_POST['input2'],PASSWORD_DEFAULT);
echo "contraseña cifrada 2 : </br>".$pass2."</br>";
?>

</body>
</html>


