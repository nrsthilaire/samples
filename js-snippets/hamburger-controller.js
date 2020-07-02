// HAMBURGER Toggle Controller

function toggleHamburger() {
  var open = $('#nav-toggle').hasClass('active');
  console.debug('open : ' + open)
  if (!open) {
    $('#nav-toggle').addClass('active');
    open = true;
  } else {
    $('#nav-toggle').removeClass('active');
    open = false;
  }
}

function closeHamburger() {
  if (open) {
    $('#nav-toggle').removeClass('active');
    open = false;
  }
}