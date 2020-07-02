document.addEventListener("DOMContentLoaded", function(){
  initApp();
});

	var currentSlide = 2;
	var numofSlides = 3;


function initApp(){
	console.log('initApp');

	var nextbtn = document.getElementById( 'next-button' );
	var prevbtn = document.getElementById( 'prev-button' );
	  
  	nextbtn.onclick = function() {
    	gotoNext();
  	};

  	prevbtn.onclick = function() {
    	gotoPrev();
  	};

	document.onkeydown = checkKey;

}


function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '37') { // left arrow
       gotoPrev();
    }
    else if (e.keyCode == '39') { // right arrow
       gotoNext();
    }

}


function gotoNext(){
	console.log('next slide');

		  var gotoslide = currentSlide + 1;

		  if (gotoslide > numofSlides){
		    gotoslide = 1;
		  }
		  currentSlide = gotoslide;

    	gotoSlide(gotoslide);
}

function gotoPrev(){
	console.log('prev slide');

		  var gotoslide = currentSlide - 1;

		  if (gotoslide < 1){
		    gotoslide = 3;
		  }

		  currentSlide = gotoslide;

    	gotoSlide(gotoslide);

}
function gotoSlide(slide){
	var page = document.getElementsByClassName('page current');
	for (var i = 0; i < page.length; i++) {
	    page[i].classList.remove('current');
	  }
	document.querySelector( '#s'+slide ).checked = true;
	document.querySelector( '#p'+slide ).classList.add('current');
}
