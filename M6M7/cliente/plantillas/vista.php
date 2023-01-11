
<?php
// <style>
//   .producto img{
//     width: 100%;
//     height: 130px !important;
//     object-fit: cover;
// }

// </style>
if (!isset($_SESSION)) session_start();
?>
<?php
//FALTA AÑADIR EL BUSCADOR, HACEMOS SELECT DEPENDIENDO DE SI EL INPUT ESTA O NO VACIO


/*   if (!isset($_SESSION['UserDatos']) ){
    header('Location: ./login/index.php');
}     */


$idUsuario = $_SESSION['UserDatos']['id'];



$db = conectar();

$infoProducto='';
$return = array();


if(isset($_GET['search'])|| !empty($value)){
  $value = $_GET['search'];
  $select = $db->prepare('SELECT DISTINCT * FROM product WHERE IdUser = ? AND nombre LIKE ?');
  $select->execute(array($idUsuario,"%$value%"));
  while($fila = $select->fetch(PDO::FETCH_ASSOC)){
    $object = new stdClass();
    $object->nombre = $fila["nombre"];
    $object->precio = $fila["precio"];
    $object->descripcion = $fila["descripcion"];
    $object->categoria = $fila["categoria"];
    $object->subCategoria = $fila["subCategoria"];
    $object->idProducto = $fila["IdProduct"];
    $selectImg = $db->prepare('SELECT DISTINCT * FROM images where idProduct = ?');
    $selectImg->execute(array($fila["IdProduct"]));
    $image = $selectImg->fetchAll();       
    $img1= $image[0]['imagen'];
    $img2= $image[1]['imagen'];
    $img3= $image[2]['imagen'];
    $img4= $image[3]['imagen'];

    $object->img1 = $img1;
    $object->img2 = $img2;
    $object->img3 = $img3;
    $object->img4 = $img4;
   
    array_push($return, $object);
  }
  echo json_encode($return);
}else{
  $select = $db->prepare('SELECT * FROM product where IdUser = ?');
  $select->execute(array($idUsuario));
  $select -> bindColumn('nombre',$nombreProducto);
  $select -> bindColumn('precio',$precioProducto);
  $select -> bindColumn('descripcion',$descripcionProducto);
  $select -> bindColumn('IdProduct',$idProducto);
  $select -> bindColumn('categoria',$catProducto);
  $select -> bindColumn('subCategoria',$subCatProducto);

  while($fila = $select->fetch(PDO::FETCH_BOUND)){
    $selectImg = $db->prepare('SELECT * FROM images where idProduct = ?');
    $selectImg->execute(array($idProducto));
    $image = $selectImg->fetchAll();       
    $img1= $image[0]['imagen'];
    $img2= $image[1]['imagen'];
    $img3= $image[2]['imagen'];
    $img4= $image[3]['imagen'];
    $infoProducto = "
<div class='px-3 pt-4 w-1/3 items-center sm:mx-16 sm:my-10 gap-10 producto'>
  <div class='h-64 sm:h-96 mb-10 sm:mb-0 bg-gradient-to-t from-blue-500 to-red-600 rounded-lg transform -rotate-6'>
    <div class='w-full  h-full bg-white rounded-lg transform rotate-6 shadow-lg focus:ring-2'>
      <div class=' flex sm:block items-center'>
        <div class=' px-2 w-1/2 sm:w-full'>
        <div
        id='carouselDarkVariant'
        class=' mt-2 carousel slide carousel-fade carousel-dark relative'
        data-bs-ride='carousel'
      >
        <!-- Inner -->
        <div class='carousel-inner relative w-full overflow-hidden hover:scale-150 transition-all duration-500 cursor-pointer'>
          <!-- Single item -->
          <div class='carousel-item active relative float-left w-full'>
            <img
              src='$img1'
              class='block w-full object-cover h-32'
              
            />
          </div>
          <!-- Single item -->
          <div class='carousel-item relative float-left w-full'>
            <img
              src='$img2'
              class='block w-full object-cover h-32'
              
            />
          </div>
          <!-- Single item -->
          <div class='carousel-item relative float-left w-full'>
            <img
              src='$img3'
              class='block w-full object-cover h-32'
            />
          </div>
          <!-- Single item -->
          <div class='carousel-item relative float-left w-full'>
            <img
              src='$img4'
              class='block w-full object-cover h-32'
            />
          </div>
        </div>
      </div>
        </div>
        <div class=''>
            <div class='flex flex-col text-center sm:px-5 py-8 justify-around'>
              <div>
              <h3 class='font-serif'>$nombreProducto</h3>
              </div>
              <div>
                <h4 class='font-serif text-gray-400'>$descripcionProducto</h4> 
              </div>
              <div>
                <h2 class=' text-xl  md:text-2xl font-serif text-blue-500'>$precioProducto<span>$</span></h2> 
              </div>
            </div>
            <div class='flex justify-around'>
              <div>
                <button  class='sm:p-3 hover:border border-red-800 md:p-4 py-2 px-2 bg-gray-200 font-serif font-semibold text-black border-solid rounded-md'>
                  <p idProd=$idProducto class='btnEdit' >Editar</p>
                </button>
              </div>
              <div>
                <button class='sm:p-3 hover:border border-red-800 md:p-4 py-2 px-2 bg-black text-gray-100 font-serif font-semibold rounded-md' >
                  <a href='elimina.php?idP=$idProducto'>Eliminar</a>
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
</div> 
</div>";
echo $infoProducto;

  }
}
    function conectar(){
      $username = 'root';
      $password = 'root';
      $dsn = 'mysql:host=localhost;dbname=m6m7;port=8889';
      try{
      return new PDO($dsn,$username,$password);
      }catch (PDOException $exception){
          echo $exception->getMessage();
      }
  }
?>





   


