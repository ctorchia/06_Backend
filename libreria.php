<?php

//------------------------------------------------------------------------------------------------------------//
//Leer todos los registros.
//------------------------------------------------------------------------------------------------------------//

function leerDatos(){
  $data_file = fopen('./data-1.json', 'r'); //Abrir archivo JSON como LECTURA
  $data = fread($data_file, filesize('./data-1.json')); //Leer el contenido del archivo y guardarlo en variable
  $data = json_decode($data, true); //Convertir contenido a formato JSON
  fclose($data_file); //Cerrar el archivo.
  return ($data);
};


//------------------------------------------------------------------------------------------------------------//
//Preparar lista de ciudades sin repetir.
//------------------------------------------------------------------------------------------------------------//

function obtnciudad($getData){ 
  $getCities = Array(); 
  foreach ($getData as $cities => $city) { 
    if(in_array($city['Ciudad'], $getCities)){ 
      
    }else{
      array_push($getCities, $city['Ciudad']); //Agregar la ciudad al array
    }
  }
  echo json_encode($getCities); //Devolver lista de ciudades sin repetir en formato JSON
}

//------------------------------------------------------------------------------------------------------------//
//Preparar lista de tipos de propiedades sin repetir.
//------------------------------------------------------------------------------------------------------------//

function obtnTipo($getData){ 
  $getTipo = Array(); 
  foreach ($getData as $tipos => $tipo) { 
    if(in_array($tipo['Tipo'], $getTipo)){ 
      
    }else{
      array_push($getTipo, $tipo['Tipo']); //Agregar el tipo al array
    }
  }
  echo json_encode($getTipo); //Devolver lista de tipos de propiedades sin repetir en formato JSON
}

//------------------------------------------------------------------------------------------------------------//
//Obtener datos segun filtro de la base de datos.
//------------------------------------------------------------------------------------------------------------//

function filtrarDatos($filtroCiudad, $filtroTipo, $filtroPrecio, $data){
  $itemList = Array(); 
  if($filtroCiudad == "" and $filtroTipo=="" and $filtroPrecio==""){ //Caso donde no se aplican filtros
    foreach ($data as $index => $item) {
      array_push($itemList, $item); 
    }
  }else{ //Caso donde se usan los filtros del formulario.

    $menor = $filtroPrecio[0]; //Valores del rango de precios
    $mayor = $filtroPrecio[1]; 

      if($filtroCiudad == "" and $filtroTipo == ""){ 
        foreach ($data as $items => $item) {
            $precio = precioNumero($item['Precio']);
        if ( $precio >= $menor and $precio <= $mayor){ 
            array_push($itemList,$item ); //Objetos con precio dentro del rango.
          }
        }
      }

      if($filtroCiudad != "" and $filtroTipo == ""){ 
          foreach ($data as $index => $item) {
            $precio = precioNumero($item['Precio']);
            if ($filtroCiudad == $item['Ciudad'] and $precio > $menor and $precio < $mayor){ 
              array_push($itemList,$item ); 
            }
        }
      }

      if($filtroCiudad == "" and $filtroTipo != ""){ 
          foreach ($data as $index => $item) {
            $precio = precioNumero($item['Precio']);
            if ($filtroTipo == $item['Tipo'] and $precio > $menor and $precio < $mayor){ 
              array_push($itemList,$item ); 
            }
        }
      }

      if($filtroCiudad != "" and $filtroTipo != ""){ 
          foreach ($data as $index => $item) {
            $precio = precioNumero($item['Precio']);
            if ($filtroTipo == $item['Tipo'] and $filtroCiudad == $item['Ciudad'] and $precio > $menor and $precio < $mayor){ 
              array_push($itemList,$item ); 
            }
        }
      }


  }
  echo json_encode($itemList); //Devolver el arreglo en formato JSON
};

//------------------------------------------------------------------------------------------------------------//
//Obtener precio
//------------------------------------------------------------------------------------------------------------//

function precioNumero($itemPrecio){ //Convertir la cadena de caracteres en numero
  $precio = str_replace('$','',$itemPrecio); 
  $precio = str_replace(',','',$precio); 
  return $precio; //Retornar el valor de tipo Numero
}
?>
