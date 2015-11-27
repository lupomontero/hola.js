//
// Seleccionar elementos del DOM y almacenar en variables.
//
var body = document.getElementsByTagName('body')[0];
var h1 = document.getElementsByTagName('h1')[0];


//
// Inicializamos variables de nuestro programa.
//
var fondos = ['#f0f0f0', 'crimson', 'black', 'orange'];
var colores = ['#222', 'white', 'chocolate', 'dodgerblue'];
var textos = ['Hola', 'Como estás?', 'Confundida?', ';-)'];
var posicion = 1;


//
// Registramos una función para que se ejecute cada vez que ocurra el evento
// `click` en el elemento `h1`.
//
h1.onclick = function (e) {

  // Si la posición actual está al final de la lista volvemos a empezar.
  if (posicion >= fondos.length) {
    posicion = 0;
  }

  // Cambiamos estilos con los valores correspondientes a la posición actual.
  body.style.backgroundColor = fondos[posicion];
  body.style.color = colores[posicion];
  h1.innerHTML = textos[posicion];

  // Avanzamos la posición para la próxima vez que se ejecute la función.
  ++posicion;
};

