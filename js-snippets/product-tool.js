dojo.provide("beddingTool");

if (!dojo._hasResource["wsgc.js.beddingTool"]) {
  dojo._hasResource["wsgc.js.beddingTool"] = true;
  dojo.provide("wsgc.js.beddingTool");
  dojo.declare("wsgc.js.beddingTool", null, {


    constructor: function () {
      this._productContainerGeneration();
    },



    /* Variables used for compiling the AddToCart listings */

    SELECTEDSIZE: null,
    IMAGEPATH: null,





    /**
		This function will scan for items matching the following pattern:
			#productInfo
		
		If it finds a match, it will create the product info container(s) and populate the
		swatches and associated logic that goes with them.
  **/


    _productContainerGeneration: function () {

      if (dojo.query("#productInfo").length > 0) {

        // Grab the productInfo menu container for ease-of-reference below
        var productInfoContainer = dojo.byId("productInfo");

        // Grab the div to place the On-States
        var productInfoOverContainer = dojo.byId("productInfoOver");



        // Build out different product type rows
        if (productTypes.length > 0) {
          // // console.debug ('We have ' + productTypes.length + ' types of products to work with.');

          // Get the base image path for reference by the Javascript
          var firstImageType = productTypes[0][0].substring(0, productTypes[0][0].length - 1);
          var firstImageLocation = dojo.byId('currentquilt').src;
          console.debug('Full image path is: ' + firstImageLocation);

          IMAGEPATH = firstImageLocation.substring(0, firstImageLocation.indexOf('room-views'));
          console.debug('The leading part of the image path is: ' + IMAGEPATH);

          var productSizeContainer = dojo.byId("productContainer");


          // Determine if we need to have size selectors available
          // alert ('We have ' + sizes.length + ' sizes to deal with');
          if ((typeof (sizes) != 'undefined') && (sizes.length > 0)) {
            // We have various sizes, so let's create the buttons to choose them
            var sizeSelector = '<div class="productList" id="sizes"><div class="product-type-nav"><span>Bed Size</span><div class="clearout">&nbsp;</div></div><div id="product-name_sizes" class="product-name">Select Your Bed Size</div><ul id="sizes">';

            for (i = 0; i < sizes.length; i++) {
              sizeSelector += '<li id="' + sizes[i][0] + '"';

              // Check to see if it's the first size.  If so, set it to selected
              if (i == 0) {
                sizeSelector += ' class="selected';
                SELECTEDSIZE = sizes[i][0];
              }
              sizeSelector += '"><img src="' + IMAGEPATH + 'swatches/sizes/' + sizes[i][3] + '"  /><a></a></li>';
            }
            sizeSelector += '<div class="clearout">&nbsp;</div></ul></div>';

            productSizeContainer.innerHTML += sizeSelector;
          }




          // create main navigation buttons for each type + sizes
          var productTypeMenu = '<ul id="types">';

          productTypeMenu += '<li class="sizes">' +
            '<div class=\"btnbkgd\"><div class=\"swatch\"><img src="' + IMAGEPATH + 'swatches/sizes/swa-twin.jpg" id="swatchConfirm-size" /></div>' +
            '<div class=\"name\"><p class="productType">BED SIZE</p><p class="productLabel" id="nameConfirm-size">Twin</p></div>' +
            '<div class=\"select\"title=\"Edit Item\">EDIT</div>' +
            '</div></li>' +
            '<div class=\"clearout\">&nbsp;</div></li>';



          // create main navigation buttons for each type + sizes
          var productTypeMenuOver = '<ul id="typesOver">';

          productTypeMenuOver += '<li id="sizes-Over" class="sizes">' +
            '<div class=\"swatch\"><img src="' + IMAGEPATH + 'swatches/sizes/swa-twin.jpg" id="swatchConfirmOver-size" /></div>' +
            '<div class=\"name\"><p class="productType">BED SIZE</p><p class="productLabel" id="nameConfirmOver-size">Twin</p></div>' +
            '<div class=\"select\"title=\"Edit Item\">EDIT</div>' +
            '<div class=\"clearout\">&nbsp;</div></li>';



          var productContentsContainer = dojo.byId("productContainer");

          // Run through the available product types, building out the selections tool as appropriate
          for (i = 0; i < productTypes.length; i++) {
            // Create the entry in the Product Menu Dropdown

            productTypeMenu += '<li class="' + productTypes[i][0] + '">' +
              '<div class=\"btnbkgd\"><div class=\"swatch\"><img src="' + IMAGEPATH + 'swatches/' + productTypes[i][0] + '/' + eval(productTypes[i][0])[0][1] + '" id="swatchConfirm-' + productTypes[i][0] + '" class="0" /></div>' +
              '<div class=\"name\"><p class="productType">' + productTypes[i][1] + '</p><p class="productLabel" id="nameConfirm-' + productTypes[i][0] + '">(' + eval(productTypes[i][0]).length + ' options)</p></div>' +
              '<div class=\"select\"title=\"Edit Item\">EDIT</div>' +
              '</div></li>' +
              '<div class=\"clearout\">&nbsp;</div></li>';

            productTypeMenuOver += '<li id="' + productTypes[i][0] + '-Over" class="' + productTypes[i][0] + ' hide">' +
              '<div class=\"swatch\"><img src="' + IMAGEPATH + 'swatches/' + productTypes[i][0] + '/' + eval(productTypes[i][0])[0][1] + '" id="swatchConfirmOver-' + productTypes[i][0] + '" class="0" /></div>' +
              '<div class=\"name\"><p class="productType">' + productTypes[i][1] + '</p><p class="productLabel" id="nameConfirmOver-' + productTypes[i][0] + '">(' + eval(productTypes[i][0]).length + ' options)</p></div>' +
              '<div class=\"select\"title=\"Edit Item\">EDIT</div>' +
              '<div class=\"clearout\">&nbsp;</div></li>';



            // Create the display container for the SUBMENU with Swatches
            var productContents = '<div class="productList hide" id="' + productTypes[i][0] + '">';

            // Verify that there are products in this tab's array before trying to write out the swatches
            if (eval(productTypes[i][0]).length > 0) {
              // // console.debug ('This product type: ' + productTypes[i][0]);

              // Output info for what the user is viewing
              productContents += '<div class="product-type-nav">  <span>' + productTypes[i][1] + '</span><div class="clearout">&nbsp;</div></div>';
              productContents += '<div id="product-name_' + productTypes[i][0] + '" class="product-name">None</div>';




              // Set counter for per-page swatches

              productContents += '<ul>';


              for (j = 0; j < eval(productTypes[i][0]).length; j++) {

                // Check to see if the item is 'paint.'  If so, write out a colored block using the hex code instead of the usual swatch image
                if (productTypes[i][0] == 'paints') {
                  productContents += '<li class="' + j + ' paint-block" style="background-color:' + eval(productTypes[i][0])[j][2] + '"><div><a href="#"><img src="' + IMAGEPATH + 'swatches/' + productTypes[i][0] + '/paint-spacer.gif" /></a></div></li>';
                } else {

                  productContents += '<li class="' + j + '"><div><a href="#"><img src="' + IMAGEPATH + 'swatches/' + productTypes[i][0] + '/' + eval(productTypes[i][0])[j][1] + '" /></a></div></li>';

                }

              }

              productContents += '</ul><div class="clearout">&nbsp;</div>';

            }

            productContents += '</div>';

            productContentsContainer.innerHTML += productContents;
          }

          productTypeMenu += '</ul>';

          productInfoContainer.innerHTML += productTypeMenu;
          productInfoOverContainer.innerHTML += productTypeMenuOver;
        }

        // Generate Product Displays
        this.createProductDisplays();

        // Hook up the size buttons
        this.selectSize();

        // Hook up the product types to display their list of products
        this.selectProduct();


        this.hideMoreScroll();


        // Hook up the full reset
        var resetButtonBottom = dojo.byId('fullResetBottom');
        dojo.connect(resetButtonBottom, "onclick", this, "resetProducts");



        // Share user's selected design on via email
        var emailMyDesign = dojo.byId('emailMyDesign');
        dojo.connect(emailMyDesign, 'onclick', this, 'shareMyDesign');

        // Hook up the Add to Cart Button in the bottom menu
        var atcButton = dojo.byId('addToCartButton');
        dojo.connect(atcButton, 'onclick', this, 'addSelectedProductsToCart');

        // Check for any pre-selected items from the URL and set them if applicable.
        this.processPreselectedItems();
      }
    },




    /**
    	This function will set the selected size
    **/
    selectSize: function () {
      var sizeOptions = dojo.query("#sizes li");
      // alert ('There are ' + sizeOptions.length + ' sizes to deal with');

      sizeOptions.forEach(
        dojo.hitch(this, function (elem) {
          dojo.connect(elem, "onclick", this, "catchSelectedSize");
        })
      );
    },

    catchSelectedSize: function ( /** Event */ evt) {
      dojo.stopEvent(evt);

      this.clearSizeSelections();

      var whichSize = evt.currentTarget;
      dojo.query('#' + whichSize.id).addClass('selected');

      SELECTEDSIZE = whichSize.id;

      var sizeSwa = SELECTEDSIZE.replace(/\s/g, "");


      // now swap out the selected swatch and product name in the selections menu

      console.debug('SELECTEDSIZE = ' + SELECTEDSIZE);


      // Get the confirmation page name for selected item
      var confirmSelectedItemName = 'nameConfirm-size';
      var confirmSelectedItemNameOver = 'nameConfirmOver-size';

      // Update the confirmation page image for selected item
      var confirmSelectedItemImage = 'swatchConfirm-size';
      var confirmSelectedItemImageOver = 'swatchConfirmOver-size';

      dojo.byId(confirmSelectedItemImage).src = IMAGEPATH + 'swatches/sizes/swa-' + sizeSwa + '.jpg';
      dojo.byId(confirmSelectedItemImageOver).src = IMAGEPATH + 'swatches/sizes/swa-' + sizeSwa + '.jpg';

      dojo.byId(confirmSelectedItemImage).className = sizeSwa;
      dojo.byId(confirmSelectedItemImageOver).className = sizeSwa;

      if (sizeSwa == 'caking') {
        sizeSwaName = 'ca king';
        dojo.byId(confirmSelectedItemName).innerHTML = sizeSwaName;
        dojo.byId(confirmSelectedItemNameOver).innerHTML = sizeSwaName;
      } else {
        dojo.byId(confirmSelectedItemName).innerHTML = sizeSwa;
        dojo.byId(confirmSelectedItemNameOver).innerHTML = sizeSwa;
      }

      dojo.query('.sizes .btnbkgd').addClass('added');


    },

    clearSizeSelections: function () {
      var sizeOptions = dojo.query("#sizes li");

      for (i = 0; i < sizeOptions.length; i++) {
        if (dojo.hasClass(sizeOptions[i], 'selected')) {
          dojo.removeClass(sizeOptions[i], 'selected');
        }
      }
    },

    /**
		This function will scan for items matching the following pattern:
			#types li
	**/
    createProductDisplays: function () {
      var productTypesList = dojo.query("#types li");
      // alert ('There are ' + productTypesList.length + ' types of products.');

      for (i = 1; i < productTypesList.length; i++) {
        var thisProductType = productTypesList[i].className;
        // alert ('This product type is: ' + thisProductType);

        if (dojo.query("ul li", dojo.byId(thisProductType)).length > 0) {
          var swatchesOfThisType = dojo.query("ul li", dojo.byId(thisProductType));
          // alert (swatchesInThisTab.length);

          swatchesOfThisType.forEach(
            dojo.hitch(this, function (elem) {
              dojo.connect(elem, "onclick", this, "changeOutProductImage");
              dojo.connect(elem, "onmouseover", this, "changeOutProductName");
              dojo.connect(elem, "onmouseout", this, "changeBackProductName");
            })
          );
        }
      }
    },

    changeOutProductImage: function ( /** Event */ evt) {
      console.debug(':: CLICKED - CHANGING PRODUCT IMAGE');
      dojo.stopEvent(evt);
      this.changeProductAndSwatchImages(evt.currentTarget);
    },

    changeOutProductName: function ( /** Event */ evt) {
      dojo.stopEvent(evt);
      this.changeNameTextbox(evt.currentTarget);
    },

    changeBackProductName: function ( /** Event */ evt) {
      dojo.stopEvent(evt);
      this.changeBackNameTextbox(evt.currentTarget);
    },


    changeNameTextbox: function ( /** DOM Node */ selectedItem) {
      // // console.debug ('Hello, you rolled over this swatch: ' + selectedItem.innerHTML);

      // Get selectedItem's product type.
      // The doubling up of "parentNode" is to get the parent (the containing DIV) of the parent (the UL) of the item (the LI)
      if (selectedItem.parentNode) {
        var parentType = selectedItem.parentNode.parentNode.id;
        var wallColor = selectedItem.className.substring(0, selectedItem.className.indexOf(' '));

        var myId = ('product-name_' + parentType)
        // // console.debug ('myId = product-name_'+parentType);
        // // console.debug ('parentType = '+parentType);

        if (selectedItem.className == 0) {
          dojo.byId("product-name_" + parentType).innerHTML = 'None';
          // console.debug ('Trying to set confirmSelectedItemName to: \n' + 'none')
          dojo.byId("product-name_" + parentType).style.fontSize = '10'
        } else {
          if (parentType != "paints" && parentType != "sizes") {
            dojo.byId("product-name_" + parentType).innerHTML = eval(parentType)[selectedItem.className][0];
            // console.debug ('Trying to show product name: \n' + eval(parentType)[selectedItem.className][0])
            dojo.byId("product-name_" + parentType).style.fontSize = '10'
          } else if (parentType != "sizes") {
            dojo.byId('product-name_' + parentType).innerHTML = eval(parentType)[wallColor][0];
            // console.debug ('Trying to show product name: \n' + eval(parentType)[wallColor][0])
            dojo.byId("product-name_" + parentType).style.fontSize = '10'
          }
        }

      }
    },

    changeBackNameTextbox: function ( /** DOM Node */ selectedItem) {
      // console.debug ('Changing back to Seletect swatch name: ' + selectedItem.innerHTML);

      var parentType = selectedItem.parentNode.parentNode.id;
      // console.debug('parentType rolloff = '+parentType);

      var confirmSelectedItemName = dojo.byId('nameConfirm-' + parentType);
      // console.debug('confirmSelectedItemName rolloff = '+confirmSelectedItemName);

      var currentSelectedItemName = confirmSelectedItemName.innerHTML;
      // console.debug('currentSelectedItemName rolloff = '+currentSelectedItemName);

      dojo.byId("product-name_" + parentType).innerHTML = currentSelectedItemName;
    },





    /**
		This function is called from the "_productSelector" function and will attach
		an onclick event to trigger the following series of actions:
	**/
    changeProductAndSwatchImages: function ( /** DOM Node */ selectedItem) {
      // // console.debug ('Hello, you clicked this swatch: ' + selectedItem.innerHTML);

      // Get selectedItem's product type.
      // The doubling up of "parentNode" is to get the parent (the containing DIV) of the parent (the UL) of the item (the LI)
      if (selectedItem.parentNode) {
        var parentType = selectedItem.parentNode.parentNode.id;
        // // console.debug (parentType);

        // Since sometimes we need the plural and sometimes we don't for the product type...
        // ex: sometimes we need 'duvets,' sometimes we need 'duvet'
        var selectedItemAlt = parentType.substring(0, parentType.length - 1);
        // // console.debug ('The singular name of the item type is: ' + selectedItemAlt);

        dojo.query('.' + parentType + ' .btnbkgd').addClass('added');

        // Get the confirmation page name for selected item
        var confirmSelectedItemName = 'nameConfirm-' + parentType;
        var confirmSelectedItemNameOver = 'nameConfirmOver-' + parentType;

        // Update the confirmation page image for selected item
        var confirmSelectedItemImage = 'swatchConfirm-' + parentType;
        var confirmSelectedItemImageOver = 'swatchConfirmOver-' + parentType;

        if (parentType != "paints") {
          // Identify the selected item's hero image container
          var compoundedLocation = 'current' + selectedItemAlt;
          var currentImage = dojo.byId(compoundedLocation);
          // // console.debug ('Current source image is: ' + currentImage.src);

          // Set the image path
          var roomImagePath = IMAGEPATH + '/room-views/' + parentType + '/';

          // Create the new image's path
          var fullImagePath = roomImagePath + eval(parentType)[selectedItem.className][2];
          // // console.debug ('Full image path is: ' + fullImagePath);

          // Swap out selected product image
          currentImage.src = fullImagePath;

          dojo.byId(confirmSelectedItemImage).src = IMAGEPATH + 'swatches/' + parentType + '/' + eval(parentType)[selectedItem.className][1];
          dojo.byId(confirmSelectedItemImageOver).src = IMAGEPATH + 'swatches/' + parentType + '/' + eval(parentType)[selectedItem.className][1];
          // // console.debug ('Trying to set currentSelectedItemImage to: \n' + IMAGEPATH + 'swatches/' + parentType + '/' + eval(parentType)[selectedItem.className][1]);

          // Update selected item's global variable number
          dojo.byId(confirmSelectedItemImage).className = selectedItem.className;
          dojo.byId(confirmSelectedItemImageOver).className = selectedItem.className;
        } else {
          var wallColorContainer = dojo.query(".wall-color");
          // // console.debug (selectedItem.className);
          var wallColor = selectedItem.className.substring(0, selectedItem.className.indexOf(' '));
          var wallColorValue = paints[wallColor][2];
          // // console.debug (wallColor);
          dojo.style(wallColorContainer[0], "backgroundColor", wallColorValue);
          dojo.style(dojo.byId(confirmSelectedItemImage).parentNode, 'backgroundColor', wallColorValue);
          dojo.byId(confirmSelectedItemImage).src = IMAGEPATH + 'swatches/' + parentType + '/paint-spacer.gif';
          dojo.style(dojo.byId(confirmSelectedItemImageOver).parentNode, 'backgroundColor', wallColorValue);
          dojo.byId(confirmSelectedItemImageOver).src = IMAGEPATH + 'swatches/' + parentType + '/paint-spacer.gif';
        }

        if (selectedItem.className == 0) {
          dojo.byId(confirmSelectedItemName).innerHTML = 'None';
          dojo.byId(confirmSelectedItemNameOver).innerHTML = 'None';
          // // console.debug ('Trying to set confirmSelectedItemName to: \n' + 'none')
        } else {
          if (parentType != "paints") {
            dojo.byId(confirmSelectedItemName).innerHTML = eval(parentType)[selectedItem.className][0];
            dojo.byId(confirmSelectedItemNameOver).innerHTML = eval(parentType)[selectedItem.className][0];
            // // console.debug ('Trying to set confirmSelectedItemName to: \n' + eval(parentType)[selectedItem.className][0])
          } else {
            dojo.byId(confirmSelectedItemName).innerHTML = eval(parentType)[wallColor][0];
            dojo.byId(confirmSelectedItemNameOver).innerHTML = eval(parentType)[wallColor][0];
            // // console.debug ('Trying to set confirmSelectedItemName to: \n' + eval(parentType)[wallColor][0])
          }
        }
      }
    },

    /**
    	This function will hook up the product lists from the menu to display the selected product type
    **/
    selectProduct: function () {
      var productTypesList = dojo.query("#types li");
      //console.debug ('There are ' + productTypesList.length + ' types of products.');

      productTypesList.forEach(
        dojo.hitch(this, function (elem) {
          dojo.connect(elem, "onclick", this, "showProducts");
          console.debug('elem.className = ' + elem.className);
        })
      );
    },


    /**
    	This function will display / hide the selected product swatches
    **/
    showProducts: function ( /** Event */ evt) {
      dojo.stopEvent(evt);

      //dojo.query (evt.currentTarget).removeClass ('added');

      this.hideAllProducts();


      // Check to make sure we're getting the right className for the productType
      var thisProductType = evt.currentTarget.className;

      console.debug('showing : ' + thisProductType);

      var thisBtnOver = thisProductType + "-Over";
      console.debug(':: showing thisBtnOver = ' + thisBtnOver);

      // Show the selected product
      if (thisProductType != 'sizes') {
        dojo.removeClass('morescroll', 'hide');
      } else {
        dojo.addClass('morescroll', 'hide');
      }
      dojo.removeClass('productInfoOver', 'hide');
      console.debug(':: showing productInfoOver');

      dojo.removeClass('productContainer', 'hide');
      console.debug(':: showing productContainer');

      dojo.removeClass(thisProductType, 'hide');
      dojo.removeClass(thisBtnOver, 'hide');
      // Show the product menu
    },


    /**
    	This function will display / hide the selected product swatches
    **/
    showSizes: function () {

      //dojo.query (evt.currentTarget).removeClass ('added');

      this.hideAllProducts();


      // Check to make sure we're getting the right className for the productType
      var thisProductType = 'sizes';

      console.debug('showing : ' + thisProductType);

      var thisBtnOver = thisProductType + "-Over";
      console.debug(':: showing thisBtnOver = ' + thisBtnOver);

      // Show the selected product
      dojo.addClass('morescroll', 'hide');

      dojo.removeClass('productInfoOver', 'hide');
      console.debug(':: showing productInfoOver');

      dojo.removeClass('productContainer', 'hide');
      console.debug(':: showing productContainer');

      dojo.removeClass(thisProductType, 'hide');
      dojo.removeClass(thisBtnOver, 'hide');
      // Show the product menu
    },

    hideMore: function () {
      console.debug('HIDING MORE');
      dojo.addClass('morescroll', 'hide');
    },

    hideMoreScroll: function () {

      var productTypesList = dojo.query(".productList ul li");
      console.debug('There are ' + productTypesList.length + ' types of products.');

      productTypesList.forEach(
        dojo.hitch(this, function (elem) {
          dojo.connect(elem, "onmouseenter", this, "hideMore");
        })
      );
    },

    /**
    	Hide all product containers
    **/
    hideAllProducts: function () {
      dojo.addClass('productInfoOver', 'hide');
      dojo.addClass('productContainer', 'hide');

      dojo.addClass('morescroll', 'hide');

      // Reset all product types back to the default / unselected state
      var productTypesList = dojo.query("#types li");

      console.debug(':: productTypesList = ' + productTypesList);

      for (i = 0; i < productTypesList.length; i++) {
        console.debug('Hiding ' + productTypesList[i].className);
        var selectedItemType = productTypesList[i].className;

        dojo.addClass(selectedItemType, 'hide');
        dojo.addClass(selectedItemType + '-Over', 'hide')
      }
    },


    /**
    	Reset the product selections
    **/
    resetProducts: function ( /** Event */ evt) {
      dojo.stopEvent(evt);

      var resetType = 'all';


      // Reset all product types back to the default / unselected state
      var productTypesList = dojo.query("#types li");

      console.debug(':: productTypesList = ' + productTypesList);

      for (i = 1; i < productTypesList.length; i++) {
        console.debug('Resetting ' + productTypesList[i].className);
        var selectedItemType = productTypesList[i].className;
        this.resetThisProduct(selectedItemType);
        console.debug('::1:: resetProducts: :: selectedItemType = ' + selectedItemType);
      }

      if (dojo.hasClass("productContainer", "hide")) {
        // Do nothing; menu is already hidden
      } else {
        dojo.addClass(dojo.byId("productContainer"), 'hide');
      }

      dojo.query('.btnbkgd').removeClass('added');

      this.showSizes();

    },

    /**
    	Reset the selected product
    **/
    resetThisProduct: function (selectedItemType) {

      console.debug('::selectedItemType = ' + selectedItemType);

      var selectedItemAlt = selectedItemType.substring(0, selectedItemType.length - 1);
      console.debug('selectedItemAlt: ' + selectedItemAlt);

      var confirmSelectedItemName = 'nameConfirm-' + selectedItemType;
      var confirmSelectedItemImage = 'swatchConfirm-' + selectedItemType;

      var confirmSelectedItemOverName = 'nameConfirmOver-' + selectedItemType;
      var confirmSelectedItemOverImage = 'swatchConfirmOver-' + selectedItemType;

      if (selectedItemType != "paints") {


        // Identify the selected item's hero image container
        var compoundedLocation = 'current' + selectedItemAlt;
        var currentImage = dojo.byId(compoundedLocation);
        // Set the image path
        var roomImagePath = IMAGEPATH + 'room-views/' + selectedItemType + '/';
        // Create the new image's path
        var fullImagePath = roomImagePath + eval(selectedItemType)[0][2];

        console.debug('Full image path is: ' + fullImagePath);
        // Swap out selected product image
        currentImage.src = fullImagePath;

        dojo.byId(confirmSelectedItemImage).src = IMAGEPATH + 'swatches/' + selectedItemType + '/' + eval(selectedItemType)[0][1];
        dojo.byId(confirmSelectedItemOverImage).src = IMAGEPATH + 'swatches/' + selectedItemType + '/' + eval(selectedItemType)[0][1];
        // alert ('Trying to set currentSelectedItemImage to: \n' + IMAGEPATH + 'swatches/' + selectedItemType + '/' + eval(selectedItemType)[0][1]);
      } else {
        var wallColorContainer = dojo.query(".wall-color");
        var wallColor = paints[0][2];
        // alert (wallColor);
        dojo.style(wallColorContainer[0], "backgroundColor", wallColor);
        dojo.byId(confirmSelectedItemImage).src = IMAGEPATH + 'swatches/paints/' + eval(selectedItemType)[0][1];
        dojo.byId(confirmSelectedItemOverImage).src = IMAGEPATH + 'swatches/paints/' + eval(selectedItemType)[0][1];
        // alert ('Trying to set currentSelectedItemImage to: \n' + IMAGEPATH + 'swatches/paints/' + eval(selectedItemType)[0][1]);
      }

      // Update selected item's global variable number
      dojo.byId(confirmSelectedItemImage).className = 0;

      dojo.byId(confirmSelectedItemName).innerHTML = '(' + selectedItemType.length + ' options)';
      dojo.byId(confirmSelectedItemOverName).innerHTML = '(' + selectedItemType.length + ' options)';
      // alert ('Trying to set confirmSelectedItemName to: \n' + 'None')
    },

    /**
    	Add the selected products to the cart!
    **/
    addSelectedProductsToCart: function ( /** Event */ evt) {
      dojo.stopEvent(evt);
      // alert ('You want to buy something!');
      // Look up the items that have been selected
      var productsTypes = dojo.query("#types li");
      // alert ('There are ' + selectedProducts.length + ' types of products');

      var sizeIndex = new Array();
      var selectedProductSKUs = new Array();
      var defaultQuantities = new Array();

      if (typeof (SELECTEDSIZE) != 'undefined') {
        // Create the simplified array structure for sizes
        for (i = 0; i < sizes.length; i++) {
          sizeIndex[i] = sizes[i][0];
        }

        // alert ('The selected product size is ' + SELECTEDSIZE + ', and it is the ' + dojo.indexOf(sizeIndex, SELECTEDSIZE) + ' item in the size array');

        var sizeIndexReference = dojo.indexOf(sizeIndex, SELECTEDSIZE) + 3;

        // // console.debug (sizeIndexReference);
      }

      // Cycle through the list of product types and gather selected SKUs
      var itemCount = 0;
      for (i = 0; i < productsTypes.length; i++) {
        var thisProduct = dojo.query('.' + productsTypes[i].className + ' .productLabel');

        if (thisProduct[0].innerHTML != "None") {
          // Search for this product name in the various arrays
          var thisProductType = productsTypes[i].className;
          // // console.debug (thisProductType);

          for (j = 0; j < eval(thisProductType).length; j++) {
            if (eval(thisProductType)[j][0] == thisProduct[0].innerHTML) {

              if (thisProductType == "paints") {
                selectedProductSKUs[itemCount] = eval(thisProductType)[j][3];
              } else {
                selectedProductSKUs[itemCount] = eval(thisProductType)[j][sizeIndexReference];
              }

              if ((thisProductType == "duvetshams") || (thisProductType == "quiltshams")) {
                defaultQuantities[itemCount] = 2;
              } else {
                defaultQuantities[itemCount] = 1;
              }
            }
          }

          itemCount += 1;
          // // console.debug ('There are now ' + itemCount + ' items in the customer purchase queue');
        }
      }

      // Check to see if customer selected some products
      // // console.debug ('Starting to assemble XML for ATC Call');
      if (itemCount > 0) {
        // Yay!  Now build out the XHR request and sell it!
        // Full call example:
        var xmlString = '<?xml version="1.0" encoding="UTF-8"?><AddToCartRequest xmlns=".../AddToCartRequest"><items>';
        // // console.debug ('I think there are ' + itemCount + ' items that the customer selected');
        for (i = 0; i < itemCount; i++) {

          // console.debug ('Customer selected this SKU ' + selectedProductSKUs[i] + ' with a default quanitity of ' + defaultQuantities[i]);
          if ((selectedProductSKUs[i] == "000000") || (selectedProductSKUs[i] == undefined)) {
            console.debug("000000 ++++ EMPTY SKU FOUND! SKIPPING ::::: " + selectedProductSKUs[i]) //  do nothing skip it
            //  do nothing skip it
          } else {
            xmlString += '<item><sku>' + selectedProductSKUs[i] + '</sku><quantity>' + defaultQuantities[i] + '</quantity></item>';

          }

        }

        xmlString += '</items></AddToCartRequest>';

        console.debug('Compiled XML String= ' + xmlString);
        this.ATCCall(xmlString);
      }
    },

    /**
    	Simple function to add the selected items to the cart
    **/
    ATCCall: function (xmlString) {
      dojo.xhrPost({
        handleAs: 'xml',
        url: '/services/shoppingcart',
        load: function (data) {
          location.href = WSI.config.appUrl + data.getElementsByTagName("url")[0].firstChild.nodeValue;
        },
        content: {
          'p_xml': xmlString
        }
      });
    },

    /**
    	Check the URL Parameters against the available product types, and pre-select any valid items.
    	If an item is no longer available, call it out in the instruction panel...
    **/
    processPreselectedItems: function () {
      var url = window.location.href;
      if (url.indexOf("?") > 0) {
        var query = url.substring(url.indexOf("?") + 1, url.length);
        query = query.split('&');
        // // console.debug (query.length);

        var productTypesList = dojo.query("#types li");

        for (i = 0; i < query.length; i++) {
          var thisPair = query[i].split('=');
          thisPair[0] = thisPair[0].replace(/%20/g, ' ');
          thisPair[1] = thisPair[1].replace(/%20/g, ' ');
          // // console.debug ('Product type: ' + thisPair [0] + ', product selection: ' + thisPair [1]);

          for (j = 0; j < productTypes.length; j++) {
            // Look for the pre-selected product type in the productTypes array
            if (productTypes[j][0] == thisPair[0]) {
              // // console.debug ('We\'ve got a match!  You were looking for and found ' + thisPair [0]);
              var targetProductType = productTypes[j][0];

              // Look for the pre-selected product in the specific product type array
              for (k = 0; k < eval(targetProductType).length; k++) {
                if (eval(targetProductType)[k][0] == thisPair[1]) {
                  // // console.debug ('We\'ve got a match!  You were looking for and found ' + thisPair [1]);
                  var actualTarget = dojo.query('#' + thisPair[0] + ' ul li.' + k)[0];
                  // // console.debug ('Trying to click this item: ' + actualTarget.innerHTML );

                  dojo.connect(actualTarget[0], 'onclick', this, 'changeOutProductImage');
                  if (document.createEvent) // Firefox etc.
                  {
                    event = document.createEvent("HTMLEvents");
                    event.initEvent("click", false, true);
                    actualTarget.dispatchEvent(event);
                  } else // IE
                  {
                    actualTarget.fireEvent("onclick");
                  }
                }
              }
            }
          }
        }
      }
    },

    shareMyDesign: function ( /** Event */ evt) {
      dojo.stopEvent(evt);

      // Determine how we'll share the user's design
      var shareType = evt.currentTarget.id;
      // console.debug (shareType);

      var selectedProducts = '';
      var productsTypes = dojo.query("#types li");

      // Cycle through the list of product types and gather selected SKUs
      for (i = 0; i < productsTypes.length; i++) {
        var thisProduct = dojo.query('.' + productsTypes[i].className + ' .productLabel');

        if (thisProduct[0].innerHTML != "None") {
          // Search for this product name in the various arrays
          var thisProductType = productsTypes[i].className;

          for (j = 0; j < eval(thisProductType).length; j++) {
            if (eval(thisProductType)[j][0] == thisProduct[0].innerHTML) {
              // // console.debug ('Found the product at position ' + j);

              if (selectedProducts.length > 0) {
                selectedProducts += '&';
              }
              selectedProducts += thisProductType + '=' + eval(thisProductType)[j][0];
            }
          }
        }
      }

      var finalURL = window.location.href;
      if (finalURL.indexOf('?') > 0) {
        finalURL = finalURL.substring(0, finalURL.indexOf('?'));
      }

      if (selectedProducts.length > 0) {
        finalURL += '?' + selectedProducts;
      }

      console.debug(finalURL);
      bitlyMe(finalURL);

      if (shareType == "emailMyDesign") {
        var targetURL = function () {
          var shortenedURL = dojo.byId('sharedURL').innerHTML;
          window.location.href = 'mailto:?subject=Check Out My Design!&body=' + shortenedURL;
        };
        setTimeout(targetURL, 1000);
      }
    }




  });

}