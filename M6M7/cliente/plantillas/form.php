
    <div class="flex">
        <div class="flex w-full items-center max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div class="w-full">
                <h1 class="text-2xl md:text-center font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                    Añadir productos
                </h1>

                <p class=" md:text-center mt-4 text-gray-500 dark:text-gray-400">
                    En esta sección podrás añadir nuevos productos a la tienda.
                </p>

                <form name="upload" action="./recogerDatos.php?idUser=<?php echo urlencode($_GET['idUsuario'])?>" method="post" ENCTYPE="multipart/form-data" class="grid grid-cols-1 gap-6 mt-8 ">
                    <div class="mt-6">
                        <h1 class=" md:text-center text-gray-500 dark:text-gray-300">Selecciona categoria del producto</h1>

                        <div class="mt-3 w-full md:flex md:gap-2 md:flex-col md:items-center md:mx-2">
                            <select  name="categoria" class="flex border justify-center w-full px-6 py-3 text-center text-white bg-blue-500 rounded-md  md:mx-2 focus:outline-none">
                            <option disabled="disabled">-- Categoria --</option>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                                <option value="nen">Niño</option>
                            </select>

                            <select name="subCategoria" class="flex bg-gray-900 text-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-md md:mt-0  md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none">
                            <option disabled="disabled"> Sub-Categoria </option>
                                <option value="camisas">Camisas</option>
                                <option value="pantalones">Pantalones</option>
                                <option value="calzado">Calzado</option>
                            </select>
                        </div>
                    </div>

                
                    <div class="w-full mx-auto">
                        <label class="block md:text-center mb-2 text-sm text-gray-600 dark:text-gray-200">Nombre del producto</label>
                        <input type="text" placeholder="Nombre" name="nombre" class="block w-full md:flex  px-5 py-3 mt-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div class="md:text-center w-full mx-auto">
                        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Precio</label>
                        <input type="text"  name="precio" placeholder="Precio" class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div class="md:text-center w-full mx-auto">
                        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Descripción</label>
                        <textarea type="text" name="descripcion" placeholder="Descripción" class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"></textarea>
                    </div>

                    <div class="md:text-center w-full mx-auto" >
                        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Imagen de cabecera</label>
                        <input type="file" name="img1" placeholder="img" class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div class="mt-6 w-full  md:flex md:text-center md:flex-col md:justify-center md:items-center  mx-auto">
                        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Imagen de producto 1</label>
                        <input type="file" name="img2" placeholder="img" class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Imagen de producto 2</label>
                        <input type="file" name="img3" placeholder="img" class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Imagen de producto 3</label>
                        <input type="file" name="img4" placeholder="img" class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>
                    <div class="flex items-center justify-center">
                        <button type="submit"
                        class="px-6 py-3 text-center text-white bg-green-500 rounded-md w-full mx-auto md:mx-2 focus:outline-none">
                            <span>Agregar a la tienda</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
