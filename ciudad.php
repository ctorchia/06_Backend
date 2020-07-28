<?php
  require('./libreria.php'); 
  $getData = leerDatos(); //Leer todos los datos
  obtnciudad($getData) //Solicitar ciudades sin repetir
 ?>
