
    <div class="flex">
        <div class="flex w-full items-center max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div class="w-full">
                <h1 id="addProd" class="text-2xl md:text-center font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                    Añadir productos
                </h1>

                <p class=" md:text-center mt-4 text-gray-500 dark:text-gray-400">
                    En esta sección podrás añadir nuevos productos a la tienda.
                </p>

                <form id="form" name="upload" action="./recogerDatos.php" method="post" ENCTYPE="multipart/form-data" class="grid grid-cols-1 gap-6 mt-8 ">
                    <div class="mt-6">
                        <h1 class=" md:text-center text-gray-500 dark:text-gray-300">Selecciona categoria del producto</h1>
                        <input id="idProducto" name="idProducto" type="hidden">
                        <div class="mt-3 w-full md:flex md:gap-2 md:flex-col md:items-center md:mx-2">
                            <select id="selectCat" name="categoria" class="flex border justify-center w-full px-6 py-3 text-center text-white bg-blue-500 rounded-md  md:mx-2 focus:outline-none">
                                <option disabled="disabled">-- Categoria --</option>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                                <option value="nen">Niño</option>
                            </select>

                            <select id="selectSub" name="subCategoria" class="flex bg-gray-900 text-center w-full px-6 py-3 mt-4 text-blue-500 border border-blue-500 rounded-md md:mt-0  md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none">
                            <option disabled="disabled"> Sub-Categoria </option>
                                <option value="camisas">Camisas</option>
                                <option value="pantalones">Pantalones</option>
                                <option value="calzado">Calzado</option>
                            </select>
                        </div>
                    </div>

                
                    <div class="w-full mx-auto">
                        <label class="block md:text-center mb-2 text-sm text-black dark:text-gray-200">Nombre del producto</label>
                        <input id="nombreProd" required type="text" placeholder="Nombre" name="nombre" class="block w-full md:flex  px-5 py-3 mt-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div class="md:text-center w-full mx-auto">
                        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Precio</label>
                        <input  id="precioProd" required type="text"  name="precio" placeholder="Precio" class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                    </div>

                    <div class="md:text-center w-full mx-auto">
                        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Descripción</label>
                        <textarea id="descripcionProd" type="text" name="descripcion" placeholder="Descripción" class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"></textarea>
                    </div>

                <!-- DRAG & DROP -->
                    <div id="drop-area" class="drop-area">
                        <h2 id="titulo">Añade aquí tus imágenes</h2>
                        <button id="btnFiles">Upload files</button>
                        <input  type="file" name="inputFiles[]" id="input-file" hidden multiple />
                        <input type="hidden" name="img1" value="" id="img1"/>  
                        <input type="hidden" name="img2" value="" id="img2"/> 
                        <input type="hidden" name="img3" value="" id="img3"/>  
                        <input type="hidden" name="img4" value="" id="img4"/>  

                    </div>

                    <div id="preview"></div>


                    <div class="md:text-center w-full mx-auto">
                        <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Localización</label>
                    <div id="vidLocation" class="flex flex-col justify-center items-center text-center">
                        <input id="inputLocation" placeholder="Calle | Num | Localidad | CP" type="text" class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
                        <div class="flex ">
                        <button type="button" id="btnLocOk" class='mt-2 mb-2 p-2 border border-yellow-500'>
                        <i class="fa-solid fa-check">OK</i>
                        </button>
                        <span class="text-red-500">*</span>
                        </div>
                        
                    </div>
                    <input type="hidden" name="lat" value="" id="latitude"/>  
                    <input type="hidden" name="long" value="" id="longitude"/> 
                    <input type="hidden" name="calle" value="" id="calle"/>  
                    <input type="hidden" name="numCalle" value="" id="numCalle"/>  
                    <input type="hidden" name="cp" value="" id="cp"/> 
                    <input type="hidden" name="ciudad" value="" id="ciudad"/>  
                    <div class="flex items-center justify-center">
                        <button  id="btnAdd" type="submit"
                        class="px-6 py-3 text-center text-white bg-green-500 rounded-md w-full mx-auto md:mx-2 focus:outline-none">
                            <span>Agregar a la tienda</span>
                            <div id="toast"></div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
