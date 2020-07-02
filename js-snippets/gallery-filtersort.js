$(function () {

  console.log(' document ready......');


  var myType = "0",
    myClient = "0",
    currentImg = 0,

    baseurl = "/",

    container = $('#container'),
    navicon = $('#nav-icon'),
    navbtn = $('#nav-menu-btn'),
    content = $('.content');


  // check for duplicates
  unique = function (arr) {
    var r = new Array();
    o: for (var i = 0, n = arr.length; i < n; i++) {
      for (var x = 0, y = r.length; x < y; x++) {
        if (r[x][0] == arr[i][0]) continue o;
      }
      r[r.length] = arr[i];
    }
    return r;
  };


  /**
    This function will set the selected Menu option
  **/
  connectNav = function () {
    $(".nav-btn").on('click', this, catchSelectedNavBtn)
  };

  catchSelectedNavBtn = function ( /** Event */ evt) {

    console.log('::: catchSelectedNavBtn Clicked.....');
    $('.nav-btn').removeClass('selected');

    var whichOption = evt.currentTarget;
    $(whichOption).addClass('selected');

    var thisType = whichOption.id;

    console.log('thisType = ' + thisType);

    myClient = thisType

    console.log('myClient : ' + myClient);

    // now update the page to show this option
    productFilter();
    closeNav();

  };

  openModal = function (i) {
    $('.modal').addClass('open');
    console.log('open modal for: ' + i);
    console.log('work[projectindex][0]: ' + work[i][0]);
    console.log('modal Client should be: ' + clients[work[i][4]]);
    console.log('modal image should be: ' + work[i][5]);
    console.log('modal role should be: ' + work[i][6]);
    console.log('modal descript should be: ' + work[i][7]);

    var newimage = "images/work/" + work[i][0] + "." + work[i][2];
    var newtitle = work[i][1];
    var newtype = types[work[i][3]];
    var newclient = clients[work[i][4]];
    var newurl = work[i][5];
    var newrole = work[i][6];
    var newdescript = work[i][7];

    $('#modal-image').attr('src', newimage);
    $('#modal-link').attr('href', newurl);
    $('#modal-title').text(newtitle);
    $('#modal-name').text(newtitle);
    $('#modal-type').text(newtype);
    $('#modal-client').text(newclient);
    $('#modal-role').text(newrole);
    $('#modal-description').text(newdescript);
  }







  createGallery = function (myArray) {

    console.log('firing Initial createGallery :::::::::::::');

    console.log('array length : ' + work.length);

    console.log('myType : ' + myType);
    console.log('myClient : ' + myClient);


    var galleryContainer = $("#resultsDisplay");

    console.log('galleryContainer = ' + galleryContainer);

    var productContents =
      '<div class="projectList" id="prodResults">';

    if (myArray.length != 0) {
      productContents += '<ul>';
      for (i = 0; i < myArray.length; i++) {
        // Create the project entry in the Product Menu Dropdown
        productContents += '<li class="project-container" title="' + myArray[i][1] + '">' +
          // '<a href = "' + myArray[i][5] +'">'+
          '<a href="#' + myArray[i][0] + '" onclick="return openModal(' + myArray[i][8] + ');">' +
          '<div id=' + i + ' class="thumb">' +
          '<img src="images/work/thumb/' + myArray[i][0] + '.' + myArray[i][2] + '" />' +
          '</div>' +
          '<div class="name">' + myArray[i][1] + '</div>' +
          '</a>' +
          '</li>';

      }

      productContents += '</ul>';
    }
    // if there aren't any products matching the users selections - display this:
    else {
      productContents += '<div id="sorry">Sorry, no results were found. <br> Please adjust your search criteria</div>'

    }

    productContents += '</div>';
    galleryContainer.html('');
    galleryContainer.append(productContents);

  };



  // [0]Image        // [1]Name //[2]extention  // [3] project Type      //  [4] Client    // [5] URL 
  productFilter = function () {
    console.log('firing product Filter:::::::::::::');

    var filteredResults = new Array();
    console.log('starting filter loop');
    console.log('array length : ' + work.length);

    console.log('myType : ' + myType);
    console.log('myClient : ' + myClient);

    for (i = 0; i < work.length; i++) {

      console.log('checking item : ' + work[i][0]);
      console.log('checking client : ' + work[i][4]);

      // check Type
      if (work[i][3] == myType || myType === "0") {
        console.log('::::::::::::: Type Match::::: ' + work[i][0]);

        // now check client
        if (work[i][4] === myClient || myClient === "0") {
          console.log('::::::::::::: Client Match::::: ' + work[i][0]);

          console.log(':: DING DING DING::: FOUND MATCH :::: ADDING : ' + work[i][0]);
          // MATCHES ALL 3 add this item to the new Array
          filteredResults.push(work[i]);

        }
        // this Client Doesn't match
        else {
          console.log('Client Mismatch:::: skipping : ' + work[i][0]);
        }

      }
      // this type does match
      else {
        console.log('Type Mismatch:::: skipping : ' + work[i][0]);

      }



    }

    console.log('FINAL filteredResults length : ' + filteredResults.length);

    createGallery(filteredResults);


  };



  $(window).scroll(function () {
    if ($(window).scrollTop() < 60) {
      $('.intro h1').fadeIn("slow");
      $('.intro h2').fadeIn("fast");
      $('.logo-tagline').fadeOut('slow');
    } else {
      $('.intro h1').fadeOut("slow");
      $('.intro h2').fadeOut("fast");
      $('.logo-tagline').fadeIn('slow');
    }
  });


  function openNav() {
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
    container.addClass('menu-open');
    navicon.addClass('open');
    navbtn.addClass('open');
    content.addClass('open');
  };

  function closeNav() {
    container.removeClass('menu-open');
    navicon.removeClass('open');
    navbtn.removeClass('open');
    content.removeClass('open');
  };

  function toggleNav() {
    var isOpen = container.hasClass('menu-open');

    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  };

  function startNav() {
    openNav();
    // show it on load so they know it's there...
    setTimeout(closeNav, 1500);
  };

  function showSubHead() {
    $('.typedSubhead').fadeIn('fast');
  };


  function closeModal() {
    $('.modal.open').removeClass('open');
  }

  $('.modal-close-btn').on('click', closeModal);


  // ESCAPE KEY close modal
  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      closeModal();
    }
  });

  function init() {
    console.log('init');

    connectNav();
    createGallery(work);

    setTimeout(startNav, 500);
    navbtn.on('click', toggleNav);

    $('.pusher').on('click', '.content.open', function () {
      closeNav();
    });
    setTimeout(showSubHead, 13000);



  };

  init();



});