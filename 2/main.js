jQuery(function ($) {


  var $input = $('#texto-nota');
  var $notas = $('#notas');
  var $sinNotas = $('#sin-notas');


  //
  // Lee notas guardadas en `localStorage` y retorna un `array` con las notas.
  //
  var cargarNotas = function () {

    return JSON.parse(localStorage.getItem('notas') || '[]');
  };


  //
  // Salva nota en `localStorage`.
  //
  var salvarNota = function (nota) {

    var notas = cargarNotas();
    notas.unshift(nota);
    localStorage.setItem('notas', JSON.stringify(notas));
  };


  //
  // Borra nota de `localStorage`.
  //
  var borrarNota = function (nota) {

    var notas = cargarNotas();
    notas = notas.filter(function (n) {

      return n.fecha !== nota.fecha;
    });
    localStorage.setItem('notas', JSON.stringify(notas));
  };


  //
  // Actualiza nota en `localStorage`.
  //
  var actualizarNota = function (nota) {

    var notas = cargarNotas();
    notas = notas.map(function (n) {

      if (n.fecha === nota.fecha) {
        return nota;
      }

      return n;
    });
    localStorage.setItem('notas', JSON.stringify(notas));
  };


  //
  // Crea nodo DOM para una nota.
  //
  var crearNodoNota = function (nota) {

    var $nota = $('<li class="list-group-item">');

    if (nota.favorita) {
      $nota.addClass('favorita');
    }

    $nota.append('<p>' + nota.texto + '</p>');
    $nota.append([
      '<div class="btn-group pull-right">',
      '<button type="button" class="btn btn-default btn-xs" data-action="star">',
      '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>',
      '</button>',
      '<button type="button" class="btn btn-danger btn-xs" data-action="trash">',
      '<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>',
      '</button>',
      '</div>',
    ].join(''));
    $nota.append('<p class="nota-fecha">' + moment(nota.fecha).fromNow() + '</p>');

    $nota.data('nota', nota);

    return $nota;
  };


  //
  // Carga notas de `localStorage` e inicializa la interfaz.
  //
  var init = function () {

    var notas = cargarNotas();

    if (!notas.length) {
      return;
    }

    $notas.removeClass('hide');
    $sinNotas.addClass('hide');

    $notas.append(notas.map(function (nota) {

      return crearNodoNota(nota);
    }));
  };


  //
  // Intercepta evento de envío de formulario, valida y añade nota.
  //
  $('#formulario-nota').submit(function (e) {

    e.preventDefault();

    var nota = {
      texto: $input.val(),
      fecha: new Date()
    };

    if (!nota.texto) {
      alert('Escribe algo?');
      return false;
    }

    if ($notas.hasClass('hide')) {
      $notas.removeClass('hide');
    }

    if (!$sinNotas.hasClass('hide')) {
      $sinNotas.addClass('hide');
    }

    $notas.prepend(crearNodoNota(nota));
    salvarNota(nota);
    $input.val('');

    return false;
  });


  //
  // Ecuchar eventos `click` en botones con attributo `data-action`.
  //
  $(document).on('click', 'button[data-action]', function (e) {

    var $btn = $(e.currentTarget);
    var $nota = $btn.parents('.list-group-item');
    var action = $btn.data('action');
    var nota = $nota.data('nota');

    if (action === 'trash') {
      $nota.remove();
      borrarNota(nota);
    }
    else if (action === 'star' && nota.favorita) {
      delete nota.favorita;
      $nota.removeClass('favorita');
      actualizarNota(nota);
    }
    else if (action === 'star') {
      nota.favorita = true;
      $nota.addClass('favorita');
      actualizarNota(nota);
    }
  });


  //
  // Actualiza la fecha en cada nota cada minuto.
  //
  window.setInterval(function () {

    $('#notas li').each(function () {

      var $nota = $(this);
      var $fecha = $nota.find('.nota-fecha');
      var nota = $nota.data('nota');
      $fecha.text(moment(nota.fecha).fromNow());
    });
  }, 60 * 1000);


  // Inicia la applicación!!
  init();

});

