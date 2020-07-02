/* SCROLL CONTROL  -------- */

// SHOW Header on scroll down - HIDE on scroll down
var didScroll,
  lastScrollTop = 0,
  navbarHeight = 100,
  unfixPoint = 200,
  curViewHt = $(window).height(), // viewport height
  fixStartPoint = 100, // current point at which we've scrolled to
  dropdownHt = 0,
  dropdownOffset = 0,
  dropdownBottom = 0,
  dropdownIsOpen = $('.nav-dropdown').hasClass("open");



$(window).scroll(function () {
  didScroll = true;
});


function hasScrolled() {
  var st = $(this).scrollTop();
  curViewHt = $(window).height(); // viewport height
  fixStartPoint = 200; // current point at which we've scrolled to
  dropdownIsOpen = $('.nav-dropdown').hasClass("open");

  if (dropdownIsOpen) {
    dropdownHt = $('.nav-dropdown.open').height();
    dropdownOffset = $('.nav-dropdown.open').offset().top;
    dropdownBottom = dropdownHt + dropdownOffset;

    if (curViewHt < dropdownHt) {
      fixStartPoint = dropdownBottom - (curViewHt / 2);
    }
  }


  if (dropdownIsOpen && st < fixStartPoint) {
    console.debug('dropdown is open.... leave it as is.... until we hit : ' + fixStartPoint);

  } else if (st <= unfixPoint) {
    $('body').removeClass('scrollActive').css('padding-top', 0);
    $('.header-primary').removeClass('fixed').css('top', '0px');
    $('.fixed-header-bkgd').css('top', '-' + (10 + navbarHeight) + 'px');
  } else if (st > lastScrollTop && st > fixStartPoint) {
    // Scroll Down
    $('.header-primary').css('top', '-' + navbarHeight + 'px');
    $('.fixed-header-bkgd').css('top', '-' + (10 + navbarHeight) + 'px');
    if (dropdownIsOpen) {
      closeMegaMenu();
    }

  } else {
    // Scroll Up  - console.debug('scrolling UP !.... SHOW THE NAV');
    if (st + $(window).height() < $(document).height()) {
      $('body').addClass('scrollActive').css('padding-top', navbarHeight);
      $('.header-primary').css('top', 7).addClass('fixed');
      $('.fixed-header-bkgd').css('top', 0).css('display', 'block');
    }
  }

  lastScrollTop = st;

} // end hasScrolled


setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 5);