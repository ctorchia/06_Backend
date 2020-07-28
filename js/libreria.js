//------------------------------------------------------------------------------------------------------------//
//Ejecutar funciones al iniciar App
//------------------------------------------------------------------------------------------------------------//

$(function(){
  obtnCiudad();
  obtnTipo();
})

//------------------------------------------------------------------------------------------------------------//
//Mostrar todos los registros sin filtrar.
//------------------------------------------------------------------------------------------------------------//

$('#mostrarTodos').on('click', function(){
  buscarItem(false);
})

//------------------------------------------------------------------------------------------------------------//
//Consultar registros con filtro de busqueda usando formulario.
//------------------------------------------------------------------------------------------------------------//

$('#formulario').on('submit', function(event){
  event.preventDefault();
  buscarItem(true);
})

//------------------------------------------------------------------------------------------------------------//
//Obtener ciudades sin repetir para el input
//------------------------------------------------------------------------------------------------------------//

function obtnCiudad(){
  $.ajax({
    url:'./ciudad.php',
    type: 'GET',
    data:{},
    success:function(ListaCiudades){
      ListaCiudades = validarJson(ListaCiudades, 'Ciudad')
      $.each(ListaCiudades, function( index, value ) {
        $('#selectCiudad').append('<option value="'+value+'">'+value+'</option>')
      });
    }
  })
}

//------------------------------------------------------------------------------------------------------------//
//Obtener tipos de propiedades sin repetir para el input
//------------------------------------------------------------------------------------------------------------//

function obtnTipo(){
  $.ajax({
    url:'./tipo.php',
    type: 'GET',
    data:{},
    success:function(tipoList){
      tipoList = validarJson(tipoList, 'Tipo')
      $.each(tipoList, function( index, value ) {
        $('#selectTipo').append('<option value="'+value+'">'+value+'</option>')
      });
    },
  }).done(function(){
    $('select').material_select(); //Habilitar Select
  })
}

//------------------------------------------------------------------------------------------------------------//
//Recibe String con formato JSON y lo convierte en Objeto JSON
//------------------------------------------------------------------------------------------------------------//

function validarJson(validarJson, lista){
  try {
    var validarJson = JSON.parse(validarJson)
    return validarJson
  } catch (e) {
    obtnError('','SyntaxError '+lista);
    }
}

//------------------------------------------------------------------------------------------------------------//
//Mostrar en pantalla propiedades segun filtros
//------------------------------------------------------------------------------------------------------------//

function buscarItem(filtrar){
  if($('.colContenido > .item') != 0){
    $('.colContenido > .item').detach()
  }
  var filtro = obtFiltros(filtrar)
  $.ajax({
    url:'./buscador.php',
    type: 'GET',
    data:{filtro},
    success:function(items, textStatus, errorThrown ){

      try {
        item = JSON.parse(items);
      } catch (e) {
        obtnError(500,'SyntaxError');
      }

      $.each(item, function(index, item){
        $('.colContenido').append(            //Generar elementos para mostrar
          '<div class="col s12 item">'+
            '<div class="card itemMostrado">'+
              '<img src="./img/home.jpg">'+

                  '<div class="card-content">'+
                    '<p><b>Direccion: </b>'+item.Direccion+'</p>'+ 
                    '<p><b>Ciudad: </b>'+item.Ciudad+'</p>'+ 
                    '<p><b>Teléfono: </b>'+item.Telefono+'</p>'+ 
                    '<p><b>Código postal: </b>'+item.Codigo_Postal+'</p>'+ 
                    '<p><b>Tipo: </b>'+item.Tipo+'</p>'+ 
                    '<p><b>Precio: </b><span class="precioTexto">'+item.Precio+'</span></p>'+ 
                  '</div>'+
                  '<div class="card-content" >'+ 
                  '<span class="card-title activator grey-text text-darken-4">Ver Más<i class="material-icons right">more_vert</i></span>'+
                  '</div>'+
                  '<div class="card-reveal">'+
                  '<span class="card-title grey-text text-darken-4">Informacón Adicional<i class="material-icons right">close</i></span>'+
                  '<p>Todas nuestras propiedades pueden ser habitables de inmediato, se encuentran en los lugares mas privilegiados  y listas para la entrega, esperamos cumplir con sus espectativas.</p>'+
                  '</div>'+
                '</div>'+
            '</div>'+
          '</div>'
        )
      })
    },
  }).done(function(){ 
    var totalItems = $('.colContenido > .item').length //Contar cantidad de elementos a mostrar
    $('.tituloContenido.card > h5').text("Resultados de la búsqueda: "+ totalItems + " items" ) //Mostrarlos junto al texto
  }).fail(function( jqXHR, textStatus, errorThrown ){ 
      obtnError(jqXHR, textStatus) 
  })
}

//------------------------------------------------------------------------------------------------------------//
//Obtener filtros para realizar la consulta.
//------------------------------------------------------------------------------------------------------------//

function obtFiltros(filtrar){
  var rango = $('#rangoPrecio').val(), //Obtener rango de precios desde el input
  rango = rango.split(";") //separar los valores en un array

  if (filtrar == false){ //Si no hay que aplicar filtros se asignan valores vacios.
    var obtnCiudad = '',
        obtnTipo = '',
        obtnPrecio = ''
  }else{                  //De lo contrario se asignan los valores correspondientes.
    var obtnPrecio = rango, 
        obtnCiudad = $('#selectCiudad option:selected').val(),
        obtnTipo = $('#selectTipo option:selected').val()
  }

    var filtro = {
      Precio: obtnPrecio,
      Ciudad: obtnCiudad,
      Tipo: obtnTipo
    }

  return filtro;
}
