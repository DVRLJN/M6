
  <?php
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

        $db = conectar();
        $idUser = $_GET['idUsuario'];
        $selectNombre = $db->prepare("SELECT nombre FROM users where IdUser = '$idUser'");
        $selectNombre->execute();
        $resultNombre = $selectNombre->fetchAll(PDO::FETCH_COLUMN);

        ?> 
<header>
<nav class=" border-gray-200 ">
    <div class="w-full mx-auto flex flex-wrap items-center bg-gray-900 border-4 border-indigo-500/100">
        <img class=" ml-4 w-20" src="./img/logo.png" alt="logo">
        <h1 class="text-white text-2xl"> Bienvenido
        <?php
            print $resultNombre[0];
        ?> 
    </h1>
    </div>
    
</nav>   
</header>