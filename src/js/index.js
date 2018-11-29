// DECLARACIÓN DE VARIABLES GLOBALES -----------------------------
var imgs = document.getElementsByClassName('img-box');

// SE OBTIENE LA POSICIÓN INICIAL DE LA IMAGEN ACTIVA
// Y SE CONVIERTE A ENTERO
var position = 0;
// FIN declaración variables globales ----------------------------

// CREACIÓN DE LOS NODOS DE LA LISTA DE LINKS
for(var i=0; i<imgs.length; i++){
  var li = document.createElement('li');
  document.getElementById('links').appendChild(li);
}

// Asignación del link activo (imagen activa)
var links = document.querySelectorAll('#links li');
links[0].classList.add('link-active');

// FUNCIÓN CAROUSEL QUE RECIBE UN ELEMENTO CONTENEDOR  -----------
function Carousel(container){
  // VARIABLES PARA CAPTURAR LOS ELEMENTOS DE LOS BOTONES(FLECHAS)
  var left = document.getElementById('flecha-izq');
  var right = document.getElementById('flecha-der');

  // INICIO DEL EVENTO
  container.addEventListener('click', function(e){

   // BORRA LA CLASE QUE CONTIENE LA IMAGEN ACTIVA
   imgs[position].classList.toggle('img-active');
   links[position].classList.toggle('link-activo');

    // SI SE PRESIONA EL BOTON DERECHO...
    if (e.target == right) {
      position++;

      // REINICIA LA LISTA SI LLEGA A LA ÚLTIMA IMAGEN
      if (position == imgs.length) { position = 0; }
      right.blur();  //quita el foco del botón
    }

    else if(e.target == left){
      position--;

      // FINALIZA LA LISTA SI LLEGA AL INICIO
      if (position == -1) { position = imgs.length-1; }
      left.blur();  //quita el foco del botón
    }

    // AGREGA LA CLASE ACTIVA A LA IMAGEN SIGUIENTE
    imgs[position].classList.toggle('img-active');
    links[position].classList.toggle('link-activo');

  });  // FIN DEL EVENTO

}// FIN FUNCIÓN CAROUSEL ---------------------------------------


// INICIO DEL EVENTO LISTENER ---------------------------------
document.addEventListener('DOMContentLoaded', () =>{
  let container = document.querySelector('.carousel');
  Carousel(container);
});
// FIN DEL EVENTO LISTENER ------------------------------------
