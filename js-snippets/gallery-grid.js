$(function () {
  console.log(' document ready......');

  /* BUILD NAV WITH JSON.......................*/
  console.debug('GALLERY ITEMS LOADED.....');

  var data = {
    gallery: [{
      name: 'Beverly Collection',
      ref: 'beverly',
      thumbs: 8,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Beverly-4-Piece-Patio-Deep-Seating-Set-with-Dragonfruit-Cushions-65-910233/204400141',
      copy: 'Beautifully inspired by wicker basket style weaves of yesteryear, this versatile collection is perfect for your patio, porch or sunroom. Sturdy rust resistant, powder coated steel reinforced frames combined with all-weather resin wicker, help withstand the outdoor elements, while lush cushions help you slip into your personal comfort zone.',
      instore: false,
      color: 'red',
      seating: '3 - 4',
      material: 'metal',
      sku: 203526721
    }, {
      name: 'Blue Springs Collection',
      ref: 'blue-springs',
      thumbs: 5,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Blue-Springs-7-Piece-Patio-Dining-Set-AC-2014-17-7/204393635',
      copy: 'Combining elegance and style, the Blue Springs Collection by Hampton Bay will offer you years of wonderful outdoor dining. This collection is the perfect recipe for a peaceful evening of dining.',
      instore: true,
      color: 'blue',
      seating: '5 - 6',
      material: 'metal',
      sku: 204393635
    }, {
      name: 'Cane Crossing Collection',
      ref: 'cane-crossing',
      thumbs: 7,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Cane-Crossing-All-Weather-Wicker-Patio-Chat-Chairs-with-Spa-Cushions-2-Pack-153-105-LC-PR/205147035',
      copy: 'Enhance your patio for years to come with this stylish all-weather wicker set, the Cane Crossing Collection by Hampton Bay. Wicker furniture is lightweight, sturdy, economical, and looks fantastic.',
      instore: true,
      color: 'blue',
      seating: '1 - 2',
      material: 'wicker'
    }, {
      name: 'Clairborne Collection',
      ref: 'clairborne',
      thumbs: 6,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Clairborne-5-Piece-Patio-Dining-Set-with-Moss-Cushion-DY11079-5PC/204233773',
      copy: 'The tropical-inspired Clairborne Collection captures the essence of traditional wicker without the continual upkeep. Aluminum bamboo extrusions and a deco rattan back have built-in all-weather resistance for years of lasting beauty.',
      instore: true,
      color: 'green',
      seating: '3 - 4',
      material: 'metal'
    }, {
      name: 'Edington Collection',
      ref: 'edington',
      thumbs: 7,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Edington-4-Piece-Patio-Deep-Seating-Set-with-Celery-Cushions-141-034-4DS-V2/204388798',
      copy: 'Unwind in style with the Edington Patio Collection by Hampton Bay. With a wide selection of upscale furnishings and accessories, this collection features ornate designs with elegant scrollwork accents, basket weave tabletops and a classic, antique bronze finish over rust-resistant cast aluminum frames.',
      instore: false,
      color: 'green',
      seating: '7 - 8',
      material: 'metal'
    }, {
      name: 'Fall River Collection',
      ref: 'fall-river',
      thumbs: 7,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Fall-River-7-Piece-Patio-Dining-Set-with-Dragonfruit-Cushion-DY11034-7PC-R/203505220',
      copy: 'Settle back with the Fall River Collection from Hampton Bay. It features espresso brown-coated finish, rust-resistant steel frame and weather-resistant cushions and accent pillows in select sets.',
      instore: false,
      color: 'red',
      seating: '3 - 4',
      material: 'metal'
    }, {
      name: 'Fenton Collection',
      ref: 'fenton',
      thumbs: 1,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Fenton-3-Piece-Patio-High-Bar-Bistro-Set-with-Peacock-Java-Cushion-D9131-BISTRO/203469606',
      copy: 'Ignore the elements with the Fenton Collection. It features a powder-coated heavy duty steel framing and weather-resistant fabric that allows you to slick water and moisture away.',
      instore: false,
      color: 'blue',
      seating: '1 - 2',
      material: 'metal'
    }, {
      name: 'Mill Valley Collection',
      ref: 'mill-valley',
      thumbs: 7,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Mill-Valley-4-Piece-Patio-Sectional-Set-with-Parchment-Cushions-143-002-4SECOLE/204390475',
      copy: 'If you are looking to create a great patio space to rest and unwind, look no further than the Mill Valley Collection by Hampton Bay. Offering the ultimate in relaxation, this 4-piece set includes right and left arm facing sectionals, a curved center sectional, and a 40 inch square cushioned ottoman for many seating options.',
      instore: false,
      color: 'beige',
      seating: '5 - 6',
      material: 'metal'
    }, {
      name: 'Niles Park Collection',
      ref: 'niles-park',
      thumbs: 10,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Niles-Park-5-Piece-Cashew-Gas-Fire-Pit-Patio-Seating-Set-NS5-BRH00800/205891547',
      copy: 'Enjoy a summer of casual elegance with the Niles Park Collection patio set from Hampton Bay. Earthy tones and durable, rust-resistant frames are perfectly suited for your outdoor space.',
      instore: true,
      color: 'brown',
      seating: '3 - 4',
      material: 'metal'
    }, {
      name: 'Pembrey Collection',
      ref: 'pembrey',
      thumbs: 8,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Pembrey-4-Piece-Patio-Conversation-Set-with-Moss-Cushions-HD14206/204464621',
      copy: 'One of the largest outdoor collections, the Pembrey Collection patio set by Hampton Bay, offers comprehensive furnishing options for your deck or patio, including dining and sofa sets, lounge chairs, fire pit sets, accessories and more.',
      instore: false,
      color: 'green',
      seating: '3 - 4',
      material: 'metal'
    }, {
      name: 'Posada Collection',
      ref: 'posada',
      thumbs: 8,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Posada-7-Piece-Patio-Dining-Set-with-Gray-Cushions-153-120-7D/205153124',
      copy: 'Designed to accommodate any outdoor style, Hampton Bay’s Posada Collection patio set features classic woven wicker with durable, powder-coated steel frames. Tabletops are decked in beautifully painted glass with a woven wicker apron to match whichever seating options you choose.',
      instore: true,
      color: 'grey',
      seating: '5 - 6',
      material: 'metal'
    }, {
      name: 'Redwood Valley Collection',
      ref: 'redwood-valley',
      thumbs: 10,
      pip: 'http://www.homedepot.com/p/Redwood-Valley-5-Piece-Patio-Fire-Pit-Seating-Set-with-Quarry-and-Red-Cushion/205374169',
      copy: 'The Redwood Valley 5-Piece Fire pit Seating Patio Set has been designed to provide the ultimate level of comfort in an elegant style that will enhance any patio decor. The fire pit does double duty as a table when not in use and the wood textured tile surrounding the fire bowl adds a traditional flavor to the intimacy that gathering around a fire can bring to your gatherings.',
      instore: true,
      color: 'red',
      seating: '3 - 4',
      material: 'metal'
    }, {
      name: 'Spring Haven Brown Collection',
      ref: 'spring-haven-brown',
      thumbs: 7,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Spring-Haven-Brown-7-Piece-All-Weather-Wicker-Patio-Dining-Set-with-Sky-Blue-Cushions-66-2999/205153445',
      copy: 'With Hampton Bay’s Spring Haven Collection patio set, you can easily create a complete outdoor living area that will make entertaining a breeze. The collection features woven wicker designs in a rich, multi-tone brown, paired with elegant glass tabletops and plush cushions to blend seamlessly with nature.',
      instore: false,
      color: 'blue',
      seating: '5 - 6',
      material: 'wicker'
    }, {
      name: 'Spring Haven Grey Collection',
      ref: 'spring-haven-grey',
      thumbs: 5,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Spring-Haven-Grey-5-Piece-Wicker-Patio-Sectional-Seating-Set-with-Cushion-Insert-Slipcovers-Sold-Separately-55-20355/205145860',
      copy: 'With Hampton Bay’s Spring Haven Collection patio set, you can easily create a complete outdoor living area that will make entertaining a breeze. The collection features woven wicker designs in a rich, multi-tone grey, paired with elegant glass tabletops and plush cushions to blend seamlessly with nature.',
      instore: false,
      color: 'green',
      seating: '3 - 4',
      material: 'wicker'
    }, {
      name: 'Tobago Collection',
      ref: 'tobago',
      thumbs: 6,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Tobago-7-Piece-Patio-Dining-Set-with-Burgundy-Cushions-151-115-7D-V2/205147030',
      copy: 'Bring a touch of rich, warm color to your outdoor space with the Tobago Collection patio set by Hampton Bay. Powder-coated steel frames ensure longtime reliability, while richly colored cushions and a combination of glass and slatted wood tabletops provide luxurious support for dining and entertaining.',
      instore: false,
      color: 'red',
      seating: '5 - 6',
      material: 'metal'
    }, {
      name: 'Woodbury Collection',
      ref: 'woodbury',
      thumbs: 7,
      pip: 'http://www.homedepot.com/p/Hampton-Bay-Woodbury-7-Piece-Patio-Dining-Set-with-Dragonfruit-Cushion-D9127-7PCR/204395590',
      copy: 'For a fully personalized outdoor experience, the Woodbury Collection patio set by Hampton Bay offers a wide variety of outdoor furnishings in custom fabric colors and patterns to create a cozy getaway just outside your home. Luxurious cushioning includes lumbar and throw pillows, supported by sturdy frames with hand-woven designs.',
      instore: false,
      color: 'red',
      seating: '5 - 6',
      material: 'metal'
    }]
  };

  // arrays to hold the dropdown lists
  var seatingArray = [],
    materialArray = [],
    colorArray = [],

    // arrays to hold the users selected filters
    seatingSelected = [],
    materialSelected = [],
    colorSelected = [],

    // arrays to hold the filtered products
    filteredArray = [];

  // count number or products in each category
  var getItemCount = function (data, val) {
    var arr = data,
      obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i][val]]) {
        obj[arr[i][val]] = 1;
      } else if (obj[arr[i][val]]) {
        obj[arr[i][val]] += 1;
      }
    }
    return obj;
  };

  // main gallery thumbnails
  var getGalleryItem = function (itemData, arrnum) {
    var item = "<li class='gallery-thumb col-3-12-md col-6-12'>" +
      "<div class='gallery-img' data-index='" + arrnum + "' data-ref='" + itemData.ref + "'>" +
      "<img src='static/images/gallery/modal/" + itemData.ref + "/thumb-" + itemData.ref + "0.jpg' alt='img02' class='stretchy' />" +
      "</div></li>";
    return item;
  };

  var populateGallery = function () {
    console.debug('populateGALLERY....');
    var $gallerylist = $(".gallery-list");

    $gallerylist.html('');

    totalProducts = parseInt(filteredArray.length);
    console.log('UPDATING PRODUCT TOTAL : ' + totalProducts);

    inStoreCount = getItemCount(filteredArray, 'instore')[true];
    if (inStoreCount === undefined) {
      inStoreCount = 0;
    }
    console.log('UPDATING INSTORE TOTAL : ' + inStoreCount);

    var allproductsLabel = 'All Products (' + totalProducts + ')';
    var instoreLabel = 'In Store (' + inStoreCount + ')';

    $('label[for=radio-allproducts]').contents().last().replaceWith(allproductsLabel);
    $('label[for=radio-instore]').contents().last().replaceWith(instoreLabel);

    $.each(filteredArray, function (index) {
      $gallerylist.append(getGalleryItem(this, index));
    });

    // connect thumbs
    $('.gallery-thumb').click(function () {
      var arrNum = $(this).find('.gallery-img').attr('data-index');
      populateOverlay(arrNum);
    });
  };

  var filterProducts = function (myObjects, prop, valueArray) {
    console.debug('filtering by prop: ' + prop);
    console.debug('::: valueArray.length: ' + valueArray.length);
    console.debug('::: myObjects.length: ' + myObjects.length);

    return myObjects.filter(function (val) {
      console.debug('::: val[prop]: ' + val[prop]);
      console.debug('::: prop: ' + prop);
      console.debug(val[prop] + ' : ' + $.inArray(val[prop], valueArray));
      return $.inArray(val[prop], valueArray) > -1;
    });
  };


  var filterArrays = function () {
    filteredArray = data.gallery
    filteredArray = filterProducts(filteredArray, "seating", seatingSelected);
    filteredArray = filterProducts(filteredArray, "color", colorSelected);
    filteredArray = filterProducts(filteredArray, "material", materialSelected);

    console.log('seatingSelected : ' + seatingSelected);
    console.log('colorSelected : ' + colorSelected);
    console.log('materialSelected : ' + materialSelected);
    console.log('filteredArray.length : ' + filteredArray.length);
    console.log('filteredArray[0] : ' + filteredArray[0].name);

    populateGallery();
  };

  // Seating - fill the array with each seating option

  $.each(data.gallery, function (index) {
    var thisItem = data.gallery[index].seating;
    if ($.inArray(thisItem, seatingArray) == -1) {
      seatingArray.push(thisItem);
      seatingSelected.push(thisItem);
    }
  });

  seatingArray.sort();


  // Material - fill the array with each material option

  $.each(data.gallery, function (index) {
    var thisItem = data.gallery[index].material;
    if ($.inArray(thisItem, materialArray) == -1) {
      materialArray.push(thisItem);
      materialSelected.push(thisItem);
    }
  });

  materialArray.sort();


  // Color - fill the array with each color option

  $.each(data.gallery, function (index) {
    var thisItem = data.gallery[index].color;
    if ($.inArray(thisItem, colorArray) == -1) {
      colorArray.push(thisItem);
      colorSelected.push(thisItem);
    }
  });

  colorArray.sort();




  // Modal thumbnails
  var getDropdownOption = function (cat, val, index) {

    var itemCount = getItemCount(data.gallery, cat)[val];
    var item = "<li class='dd-option' id='dd-li-" + cat + "-" + index + "' data-cat='" + cat + "'>" +
      "<a href='#'>" +
      "<input type='checkbox' id='cb-" + cat + "-" + index + "' name='cb-" + cat + "-" + index + "' value='" + val + "' class='dd-option-" + cat + "' />" +
      "<label for='cb-" + cat + "-" + index + "'><span></span>" + val + " (" + itemCount + ")</label>" +
      "</a></li>";
    return item;
  };

  var addDropdownOptions = function () {
    // ADD DROPDOWN OPTIONS
    $.each(seatingArray, function (i) {
      if (i === 0) {
        $("#dd-combined-list").append('<li id="check1" class="dd-header"><span>Seating Capacity</span></li>');
      }
      $("#dd-seating-list").append(getDropdownOption('seating', seatingArray[i], i));
      $("#dd-combined-list").append(getDropdownOption('seating', seatingArray[i], i + 'm'));

    });

    $.each(materialArray, function (i) {
      if (i === 0) {
        $("#dd-combined-list").append('<li id="check2" class="dd-header"><span>Frame Material</span></li>');
      }
      $("#dd-material-list").append(getDropdownOption('material', materialArray[i], i));
      $("#dd-combined-list").append(getDropdownOption('material', materialArray[i], i + 'm'));

    });

    $.each(colorArray, function (i) {
      if (i === 0) {
        $("#dd-combined-list").append('<li id="check3" class="dd-header"><span>Cushion Color</span></li>');
      }
      $("#dd-color-list").append(getDropdownOption('color', colorArray[i], i));
      $("#dd-combined-list").append(getDropdownOption('color', colorArray[i], i + 'm'));
    });

    filterArrays();
  }

  addDropdownOptions();





  // get the big modal images
  var getModalImages = function (prodNum, index) {
    var prodRef = filteredArray[prodNum].ref;
    var item = "<img src='static/images/gallery/modal/" + prodRef + "/" + prodRef + index + ".jpg' alt='img" + index + "' class='gallery-overlay-img' />";
    return item;
  };

  // Get the Modal thumbnails
  var getModalThumb = function (prodNum, index) {
    var prodRef = filteredArray[prodNum].ref;
    var activestate = '';
    if (index === 0) {
      activestate = ' active'
    };

    var item = "<li class='thumb'>" +
      "<div class='thumb-gallery-img" + activestate + "' data-index='" + index + "' data-ref='" + prodRef + "'>" +
      "<img src='static/images/gallery/modal/" + prodRef + "/thumb-" + prodRef + index + ".jpg' alt='img" + index + "' class='stretchy' />" +
      "</div></li>";
    return item;
  };






  var currentProductIndex = 0;
  var totalProducts = parseInt(filteredArray.length);
  console.debug('initial totalProducts: ' + totalProducts);

  var inStoreCount = getItemCount(data.gallery, 'instore')[true];
  console.debug('instore count: ' + inStoreCount);

  function hideOverlay() {
    $('.gallery-container').removeClass('blur');
    $('.gallery-overlay').removeClass('show-modal');
    $('.gallery-grayout').fadeOut(500);
  }

  function showOverlay() {
    $('.gallery-container').addClass('blur');
    $('.gallery-overlay').addClass('show-modal');
    $('.gallery-grayout').fadeIn(300);
  }

  function populateOverlay(arrNum) {
    console.log('populateOverlay with: ' + filteredArray[arrNum].name);
    var OverlayContainer = $('.gallery-overlay');

    var OverlayFadeContent = $('.fadeinout');
    OverlayFadeContent.fadeOut(0);

    var OverlayLoader = $('.spinner');
    OverlayLoader.fadeIn(10);

    console.debug('populate overlay...' + arrNum);

    currentProductIndex = parseInt(arrNum);

    var prodName = filteredArray[arrNum].name;
    var prodRef = filteredArray[arrNum].ref;
    var prodCopy = filteredArray[arrNum].copy;
    var prodPip = filteredArray[arrNum].pip;
    var thumbNum = filteredArray[arrNum].thumbs;

    var prodImg = 'static/images/gallery/modal/' + prodRef + '/' + prodRef + '0.jpg';

    console.debug('product name: ' + prodName);

    var $OverlayImage = $(".overlay-image-wrapper"); // grab the swiper wrapper to insert all the large images
    $OverlayImage.html('');
    $OverlayImage.append(getModalImages(arrNum, 0)); // add the large image

    var $OverlayTitle = $(".overlay-header");
    $OverlayTitle.html(prodName);

    var $OverlayCopy = $(".overlay-product-copy p"); // for product copy
    $OverlayCopy.html(prodCopy);

    var $OverlayCTA = $('.overlay-cta'); // for link to pip
    $OverlayCTA.attr('href', prodPip);

    var $thumbList = $(".thumb-list"); // for thumbs
    $thumbList.html('');

    // loop through and add the thumbs - and their large images
    for (i = 0; i < thumbNum; i++) {
      $thumbList.append(getModalThumb(arrNum, i)); // add the thumb images
    };


    // connect the thumbnails in the overlay - 
    $('.thumb-gallery-img').on('click', function (e) {
      var imgname = $(this).attr('data-largesrc');
      var imgnum = $(this).attr('data-index');
      $('.thumb-gallery-img.active').removeClass('active');
      $(this).addClass('active');

      $('.gallery-overlay-img').fadeOut(100, function () {
        var prodRef = filteredArray[arrNum].ref;
        var newsrc = 'static/images/gallery/modal/' + prodRef + '/' + prodRef + imgnum + '.jpg';

        $(this).attr('src', newsrc).bind('onreadystatechange load', function () {
          if (this.complete) $(this).fadeIn(500);
        });
      });

      console.debug('load image: ' + arrNum + ' - ' + imgnum);

      e.stopImmediatePropagation();
    });


    showOverlay();

    updateFlippers();



    // CHECK TO SEE IF ALL THE IMAGES ARE FINISHED LOADING

    var $elems = OverlayContainer.find('img');

    // count them
    var elemsCount = $elems.length;

    // the loaded elements flag
    var loadedCount = 0;

    // attach the load event to elements
    $elems.on('load', function () {
      // increase the loaded count 
      loadedCount++;

      // if loaded count flag is equal to elements count
      if (loadedCount == elemsCount) {
        console.debug('content loaded....');
        OverlayLoader.fadeOut(100);
        OverlayFadeContent.fadeIn(500);

      }
    });
  }




  $('.btn-close, .gallery-grayout').click(function () {
    hideOverlay();
  });





  function updateFlippers() {
    console.log('::::::::::::::::::::::: UPDATE FLIPPERS :::: currentProductIndex = ' + currentProductIndex + ' : totalProducts =' + totalProducts);

    if (currentProductIndex < totalProducts - 1) {
      $('.next-collection').removeClass('disabled').on('click', function (e) {
        var nextProd = currentProductIndex + 1;
        populateOverlay(nextProd);
        e.stopImmediatePropagation();
      });
    } else {
      $('.next-collection').addClass('disabled').off('click');

    }
    if (currentProductIndex > 0) {

      $('.prev-collection').removeClass('disabled').on('click', function (e) {
        var prevProd = currentProductIndex - 1;
        populateOverlay(prevProd);
        e.stopImmediatePropagation();
      });
    } else {
      $('.prev-collection').addClass('disabled').off('click');
    }
  }


  function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
  }

  DropDown.prototype = {
    initEvents: function () {
      var obj = this;

      // on-click of dropdown
      obj.dd.on('click', function (event) {
        if ($(this).hasClass('active')) { // if this dd is already open, close it
          $(this).removeClass('active');
        } else { // otherwise close all the other dds if there are any open
          $('.wrapper-dropdown').removeClass('active');
          // and open this dd
          $(this).addClass('active');
        }
        return false;
      });

      // onclick for dd options
      obj.opts.on('click', function () {
        var opt = $(this);
        var thisid = $(this).attr('id');
        var thisdd = obj.dd.attr('id');
        var thiscat = $(this).attr('data-cat');

        console.log(':::::: this checkbox is: ' + thisid);
        console.log(':::::: this cat is: ' + thiscat);

        obj.index = opt.index();
        obj.val = opt.text().slice(0, -4);

        var group = "input:checkbox[name='" + $(this).find('input:checkbox').attr("name") + "']";

        if ($(this).find('input:checkbox').is(':checked')) {
          $(this).find('input:checkbox').prop("checked", false); // uncheck it
          //window[thiscat+'Selected'].splice( $.inArray(obj.val, window[thiscat+'Selected']), 1 ); // remove it from array
        } else {
          $(this).find('input:checkbox').prop("checked", true); // check it
          //window[thiscat+'Selected'].push(obj.val); // add it to the array
        }
        getSelectedFilters(thiscat, thisdd);
      });
    },
    getValue: function () {
      return this.val;
    },
    getIndex: function () {
      return this.index;
    }

  };

  var getSelectedFilters = function (val, thisdd) {
    console.log('this dd....' + thisdd);
    if (thisdd == 'dd-all') {
      console.log('this is the mobile dd....')
    }
    if (val === 'seating') {
      seatingSelected = [];

      seatingSelected = $("[data-cat='seating'] a input:checkbox:checked").map(function () {
        return $(this).val();
      }).get();
      console.log('selected seating: ' + seatingSelected);
    } else if (val === 'material') {
      materialSelected = [];
      materialSelected = $("[data-cat='material'] a input:checkbox:checked").map(function () {
        return $(this).val();
      }).get();
      console.log('selected material: ' + materialSelected);
    } else if (val === 'color') {
      colorSelected = [];
      colorSelected = $("[data-cat='color'] a input:checkbox:checked").map(function () {
        return $(this).val();
      }).get();
      console.log('selected color: ' + colorSelected);
    } else {
      console.log('error : no val given');
    }

    console.debug('seatingSelected : ' + seatingSelected[0]);
    console.debug('materialSelected : ' + materialSelected[0]);
    console.debug('colorSelected : ' + colorSelected[0]);
    filterArrays();
  }

  var ddSort = new DropDown($('#dd-sortby'));
  var ddSeating = new DropDown($('#dd-seating'));
  var ddMaterial = new DropDown($('#dd-material'));
  var ddColor = new DropDown($('#dd-color'));
  var ddAll = new DropDown($('#dd-all'));

  $(document).click(function () {
    // all dropdowns
    $('.wrapper-dropdown').removeClass('active');
  });


  $('.clampThis').each(function (index, element) {
    $clamp(element, {
      clamp: 2,
      useNativeClamp: false
    });
  });

  $('#tag-handheld').on('click', function () {
    location.href = 'browse-leafblowers-gas.html';
  });
  $('#tag-gas').on('click', function () {
    location.href = 'browse-leafblowers-handheld.html';
  });

  $('.next-arrow').each(function (index, element) {
    $(this).on('click', function () {
      var scrolldata = $(this).attr('data-scroller');
      var scroller = 'scroller-' + scrolldata;
      var nextflipper = 'next-btn-' + scrolldata;
      var backflipper = 'back-btn-' + scrolldata;
      console.debug('scroller: ' + scroller)
      var currentpos = $('#' + scroller).position().left;


      console.debug('before left: ' + currentpos);

      $('#' + scroller).animate({
        "left": "-=202px"
      }, 1000, "easeOutQuint", function () {
        console.debug("all done");
        console.debug('after left: ' + $('#' + scroller).position().left);
        currentpos = $('#' + scroller).position().left;

        if (currentpos < 0) {
          $('#' + backflipper).removeClass('disabled');
        } else {
          $('#' + backflipper).addClass('disabled');
        }
      });

      console.debug('after left: ' + currentpos);

      if (currentpos < 0) {
        $('#' + backflipper).removeClass('disabled');
      } else {
        $('#' + backflipper).addClass('disabled');
      }
    });

  });

  $('.back-arrow').each(function (index, element) {
    $(this).on('click', function () {
      var scrolldata = $(this).attr('data-scroller');
      var scroller = 'scroller-' + scrolldata;
      var currentpos = $('#' + scroller).position().left;
      var nextflipper = 'next-btn-' + scrolldata;
      var backflipper = 'back-btn-' + scrolldata;

      if (currentpos < 0) {
        console.debug('before left: ' + currentpos);
        $('#' + scroller).animate({
          "left": "+=202px"
        }, 1000, "easeOutQuint", function () {
          console.debug("all done");
          console.debug('after left: ' + $('#' + scroller).position().left);
          currentpos = $('#' + scroller).position().left;

          if (currentpos < 0) {
            $('#' + backflipper).removeClass('disabled');
          } else {
            $('#' + backflipper).addClass('disabled');
          }
        });
      }

    });

  });





  // PRELOAD ALL THE IMAGES - 
  $.each(data.gallery, function (index) {
    var prodRef = data.gallery[index].ref;
    var thumbNum = data.gallery[index].thumbs;
    for (i = 0; i < thumbNum; i++) {
      var thissrc = "static/images/gallery/modal/" + prodRef + "/" + prodRef + i + ".jpg";
      $('<img/>')[0].src = thissrc;
    }

  });


});