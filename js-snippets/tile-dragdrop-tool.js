var fabrics = new Array(
  ["Pink Dottie Fabric-Covered Tackboard", "tile_fabric_dottie_bpink", 0, "391433"],
  ["Black Dottie Fabric-Covered Tackboard", "tile_fabric_dottie_black", 0, "391425"],
  ["Coffee Dottie Fabric-Covered Tackboard", "tile_fabric_dottie_coffee", 0, "391490"],
  ["Pool Dottie Fabric-Covered Tackboard", "tile_fabric_dottie_pool", 0, "391417"],
  ["Blue Dottie Fabric-Covered Tackboard", "tile_fabric_dottie_blue", 0, "391508"],

  ["Berkeley Peace Fabric-Covered Tackboard", "tile_fabric_berkeley", 0, "391565"],
  ["Nouveau Floral Fabric-Covered Tackboard", "tile_fabric_nouveaufloral", 0, "504597"],

  ["Bright Pink Bubble Fabric-Covered Tackboard", "tile_fabric_bubble_pink", 0, "391797"],
  ["Blue Bubble Fabric-Covered Tackboard", "tile_fabric_bubble_blue", 0, "391631"],

  ["Black Zebra Fabric-Covered Tackboard", "tile_fabric_zebra_black", 0, "391896"],

  ["Pink Petal Dot Fabric-Covered Tackboard", "tile_fabric_petaldot_pink", 0, "391912"],
  ["Pool Petal Dot Fabric-Covered Tackboard", "tile_fabric_petaldot_pool", 0, "391904"],

  ["Swirly Paisley Warm Fabric-Covered Tackboard", "tile_fabric_swirly_warm", 0, "391409"],
  ["Swirly Paisley Cool Fabric-Covered Tackboard", "tile_fabric_swirly_cool", 0, "391375"]

);

// fix IE's lack of getcomputedstyle - so we can check to see how much a tile has been rotated.
if (!window.getComputedStyle) {
  window.getComputedStyle = function (el, pseudo) {
    this.el = el;
    this.getPropertyValue = function (prop) {
      var re = /(\-([a-z]){1})/g;
      if (prop == 'float') prop = 'styleFloat';
      if (re.test(prop)) {
        prop = prop.replace(re, function () {
          return arguments[2].toUpperCase();
        });
      }
      return el.currentStyle[prop] ? el.currentStyle[prop] : null;
    }
    return this;
  }
}


var productListContainer = document.getElementById("productNav");

var myproductlist = '<ul class=\'myProductList\'>';



for (var i = 0; i < fabrics.length; i++) {

  var myname = fabrics[i][0]; // product name
  var myimg = fabrics[i][1]; // product image
  var mysku = fabrics[i][3]; // product sku
  //var mytype = fabrics[i][2]; // product type

  var thisProduct = "<li id='" + i + "' class=\'myProduct\'>" +
    "<div class=\'myimg\'><img src =\'images/fabrics/" + myimg + ".jpg\' /></div>" +
    "<div class=\'myName\' id=\'" + mysku + "\'>" + myname + "</div>" +
    "</li>"

  // add it to the List
  myproductlist += thisProduct;

}


// now that we've added all the elements - close the list
myproductlist += '</ul>';
console.debug('TOTAL NUMBER OF PRODUCTS : ' + fabrics.length);

// add it to our container
productListContainer.innerHTML += myproductlist;



var clearAllTiles = function () {
  var tilesonstage = dojo.query(".item");
  dojo.query(".item").forEach(function (elem) {
    elem.parentNode.removeChild(elem)
  });
  TILECOUNT = 0;
}


var clearbutton = dojo.byId("clearbtn");
dojo.connect(clearbutton, "onclick", function () {
  clearAllTiles();
});


function deleteTile(myId) {
  var element = dojo.byId(myId);
  var par = element.parentNode.id;
  console.debug('parentnode = ' + par);

  element.parentNode.removeChild(element);
}


function rotateTile(myId) {
  var el = dojo.byId(myId);

  var st = window.getComputedStyle(el, null);
  var tr = st.getPropertyValue("-webkit-transform") ||
    st.getPropertyValue("-moz-transform") ||
    st.getPropertyValue("-ms-transform") ||
    st.getPropertyValue("-o-transform") ||
    st.getPropertyValue("transform") ||
    "fail...";

  // With rotate(30deg)...
  // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
  console.log('Matrix: ' + tr); // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

  if (tr != 'none' && tr != 'fail...' && tr != null) {

    var values = tr.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];

    var scale = Math.sqrt(a * a + b * b);

    // arc sin, convert from radians to degrees, round
    var sin = b / scale;
    var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

    // works!
    console.log(':: ' + myId + ' is currently Rotated by: ' + angle + 'deg');
  } else {
    var angle = 0;
  }


  var rotateTo = parseInt(angle + 90);
  console.debug('rotate this: ' + myId);
  var ele = dojo.byId(myId);
  ele.style.webkitTransform = "rotate(" + rotateTo + "deg)";
  ele.style.MozTransform = "rotate(" + rotateTo + "deg)";
  ele.style.msTransform = "rotate(" + rotateTo + "deg)";
  ele.style.OTransform = "rotate(" + rotateTo + "deg)";
  ele.style.transform = "rotate(" + rotateTo + "deg)";
}


function creategrid(w, h, size) {

  var standardW = Math.floor((w) / size),
    standardH = Math.floor((h) / size);

  var standard = document.createElement('div');
  standard.className = 'grid coords';
  standard.style.width = (standardW * size) + 'px';
  standard.style.height = (standardH * size) + 'px';

  for (var i = 0; i < standardH; i++) {
    for (var p = 0; p < standardW; p++) {
      var cell = document.createElement('div');
      cell.className = 'droptarget';
      cell.style.height = (size - 1) + 'px';
      cell.style.width = (size - 1) + 'px';
      cell.style.position = 'relative'
      cell.style.zIndex = '2';
      standard.appendChild(cell);
    }
  }
  var mygrid = dojo.byId("grid");
  mygrid.appendChild(standard);
}

creategrid(610, 510, 100);

/**
	This function will set the selected size
**/
var selectProduct = function () {
  var productOptions = dojo.query(".myProduct");

  productOptions.forEach(
    dojo.hitch(this, function (elem) {
      dojo.connect(elem, "onclick", this, "catchSelectedProduct");
    })
  );
};

TILECOUNT = 0;

var catchSelectedProduct = function ( /** Event */ evt) {
  dojo.stopEvent(evt);

  var stage = dojo.byId("board");

  var whichProduct = evt.currentTarget;

  var thisItem = whichProduct.id;
  var myname = fabrics[thisItem][0]; // product name
  var myimg = fabrics[thisItem][1]; // product image
  var mysku = fabrics[thisItem][3]; // product sku
  var myId = TILECOUNT++;
  var tileId = 'tile-' + myId;
  var imgId = 'tileimg' + myId;
  var delId = 'tiledel' + myId;
  var rotId = 'tilerot' + myId;

  console.debug('myId = ' + myId);
  //var mytype = fabrics[thisItem][2]; // product type

  var tile = "<div id='tile-" + myId + "' class='item'><div class=\'handle\'><img id='" + imgId + "' src =\'images/fabrics/" + myimg + ".jpg\' datasku='" + mysku + "'/></div><div  id='" + rotId + "' class=\'rotate\'><img src =\'images/rotate.png\' /></div><div id='" + delId + "' class=\'deleteX\'><img src =\'images/x_delete.png\' /></div></div>";



  stage.innerHTML += tile;

  console.debug('rotId : ' + rotId);
  console.debug('dojo.byId(rotId) : ' + dojo.byId(rotId));


  addNewDraggie(myId);
  addNewDeleteBtns(myId);
  addNewRotateBtns(myId);






};
var addNewDeleteBtns = function (myId) {
  var deleteBtns = dojo.query('.deleteX');
  deleteBtns.forEach(
    dojo.hitch(this, function (elem) {
      var deleteId = elem.id;
      var tileNum = deleteId.substring(deleteId.indexOf("tiledel") + 7, deleteId.length);
      var tileId = 'tile-' + tileNum;
      dojo.connect(elem, "onclick", function () {
        deleteTile(tileId);
      });
    })
  );

}

var addNewRotateBtns = function (myId) {
  var rotateBtns = dojo.query('.rotate');
  rotateBtns.forEach(
    dojo.hitch(this, function (elem) {
      var rotateId = elem.id;
      var tileNum = rotateId.substring(rotateId.indexOf("tilerot") + 7, rotateId.length);
      var tileimgId = 'tileimg' + tileNum;
      dojo.connect(elem, "onclick", function () {
        rotateTile(tileimgId);
      });
    })
  );

}

var addNewDraggie = function (myId) {
  var items = document.querySelectorAll('.item');

  for (var i = 0, len = items.length; i < len; i++) {
    var item = items[i];
    var draggie = new Draggabilly(item, {
      handle: '.handle',
      containment: '#board'
    });

    draggie.on('dragStart', function (draggieInstance, event, pointer) {
      //console.debug( 'DRAG START', draggieInstance, event, pointer );
    });

    draggie.on('dragMove', function (draggieInstance, event, pointer) {
      // console.debug( 'DRAG MOVE', draggieInstance, event, pointer );
      var position = draggieInstance.position;
      //console.debug('position.x : '+position.x +': position.y  '+ position.y);
    });

    draggie.on('dragEnd', function (draggieInstance, event, pointer) {
      console.debug('DRAG END', draggieInstance, event, pointer);
      var position = draggieInstance.position;
      console.debug('position.x : ' + position.x + ': position.y  ' + position.y);

      console.debug('this.element ' + this.element);

      var newposx = findClosest(position.x, gridXarray)
      var newposy = findClosest(position.y, gridYarray)
      console.debug('newposx : ' + newposx);
      console.debug('newposy : ' + newposy);

      this.element.style.left = newposx + 'px';
      this.element.style.top = newposy + 'px';

    });
  }

};
// function to find the closest droptarget x or y value
function findClosest(num, arr) {
  var curr = arr[0];
  var diff = Math.abs(num - curr);
  for (var val = 0; val < arr.length; val++) {
    var newdiff = Math.abs(num - arr[val]);
    if (newdiff < diff) {
      diff = newdiff;
      curr = arr[val];
    }
  }
  return curr;
}

// create an array for the grid X values - for drop targets
var gridXarray = [];
var xOrigin = 248;
var gridcolumns = 6;
for (i = 0; i < gridcolumns; i++) {
  var nextXValue = (100 * i) + xOrigin;
  gridXarray.push(nextXValue);
  console.debug(i + ' : nextXValue : ' + nextXValue);
  console.debug(i + ' : gridXarray : ' + gridXarray);
}

// create an array for the grid Y values - for drop targets
var gridYarray = [];
var yOrigin = 20;
var gridrows = 6;
for (i = 0; i < gridrows; i++) {
  var nextYValue = (100 * i) + yOrigin;
  gridYarray.push(nextYValue);
  console.debug(i + ' : nextYValue : ' + nextYValue);
  console.debug(i + ' : gridYarray : ' + gridYarray);
}



selectProduct();