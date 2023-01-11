
  <?php
     if (!isset($_SESSION['UserDatos']) ){
        header('Location: ./login/index.php');
     }  
        ?> 
<header>
<nav class=" border-gray-200 ">
    <div class="w-full mx-auto flex flex-wrap items-center bg-gray-900 border-4 border-indigo-500/100">
        <img class=" ml-4 w-20" src="./img/logo.png" alt="logo">
        <h1 class="text-white text-2xl"> Bienvenido
        <?php
            print $_SESSION['UserDatos']['name'];
        ?> 
    </h1>
    </div>
    
</nav>   
</header>