<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
    <script src="https://cdn.tailwindcss.com"></script>
   
    <title>Registro</title>
</head>
<body>
    <div class="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
    <div class="w-full sm:max-w-md p-5 mx-auto">
        <h2 class="mb-12 text-center text-5xl font-extrabold">Regístrate</h2>
        <form id="form" action="index.php" method="post" onsubmit="return validateForm()">
        <div id="divNombre" class="mb-4">
            <label class="block mb-1"  for="name">Nombre</label>
            <input id="name" type="text" name="nombre" required  class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
        </div>
        <div id="divEmail" class="mb-4">
            <label class="block mb-1" for="email">Email</label>
            <input id="email" type="email" name="email" required class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"/>
        </div>
        <div id="divPass" class="mb-4">
            <label class="block mb-1" for="password">Contraseña</label>
            <input id="password" type="password" name="password" required class="py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
        </div>
        <div class="mt-6">
            <button class="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-green-700 active:bg-green-700 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 disabled:opacity-25 transition">Sign Up</button>
        </div>
        <div class="mt-6 text-center">
            <a href="../login/index.php" class="underline">Logearse</a>
        </div>
        <?php
        require_once('registro.php');
        ?>
        </form>
    </div>
    </div>
    <script src="./script.js"></script>
</body>
</html>