<?php
  require('./libreria.php');
  $getData = leerDatos(); //Leer todos los datos
  obtnTipo($getData) //Solicitar tipos de propiedades sin repetir
 ?>
