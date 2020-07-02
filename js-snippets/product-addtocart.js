/**
	Add the selected products to the cart!
**/
function addSelectedProductsToCart(evt) {
  dojo.stopEvent(evt);
  // Look up the items that have been selected
  var productsTypes = dojo.query("#types li");

  var sizeIndex = new Array();
  var selectedProductSKUs = new Array();
  var defaultQuantities = new Array();

  if (typeof (SELECTEDSIZE) != 'undefined') {
    // Create the simplified array structure for sizes
    for (i = 0; i < sizes.length; i++) {
      sizeIndex[i] = sizes[i][0];
    }

    var sizeIndexReference = dojo.indexOf(sizeIndex, SELECTEDSIZE) + 3;

  }

  // Cycle through the list of product types and gather selected SKUs
  var itemCount = 0;
  for (i = 0; i < productsTypes.length; i++) {
    var thisProduct = dojo.query('.' + productsTypes[i].className + ' .productLabel');

    if (thisProduct[0].innerHTML != "None") {
      // Search for this product name in the various arrays
      var thisProductType = productsTypes[i].className;

      for (j = 0; j < eval(thisProductType).length; j++) {
        if (eval(thisProductType)[j][0] == thisProduct[0].innerHTML) {
          // // console.debug ('Found the product at position ' + j);

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
  if (itemCount > 0) {
    // Now build out the XHR request and sell it!
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
}


/**
	Simple function to add the selected items to the cart
**/
function ATCCall(xmlString) {
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
}