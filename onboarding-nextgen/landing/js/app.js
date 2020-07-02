
var j$ = jQuery.noConflict();

let confirmationVersion = false;
let currentSlide = 0;
let numofSlides = 2;




// get any prarmeters from the URL (input entries passed from short form) - 
function getUrlParameter(param) {
    let pageURL = decodeURIComponent(window.location.search.substring(1)),
        URLVariables = pageURL.split('&'),
        paramName,
        i;

    for (i = 0; i < URLVariables.length; i++) {
        paramName = URLVariables[i].split('=');

        if (paramName[0] === param) {
            return paramName[1] === undefined ? true : paramName[1];
        }
    }
}





// use if you need to wait until an element loads before doing something..
var waitForEl = function(selector, callback) {
  if (j$(selector).length) {
    console.log('looking for: '+selector+' : found it...');
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};



function setExpanderListHeights(){
    var vpw = j$(window).width();
    console.log('view port width : '+vpw);
    var itemheight = 32;
    var col = 1;
    
    if(vpw > 768){
        col = 2;
    }
    if(vpw > 960){
        col = 3;
    }
    if(vpw > 1280){
        col = 4;
    }
            console.log(':::: col: '+col);

    j$('.task-lists').each(function(i){
        var qty =  j$(this).data('qty');
        
        if(qty > 20){
            var itemspercol = qty / col;
            itemspercol = Math.round(itemspercol);
            console.log(i+': qty: '+qty+ ' / col:'+ col);

            console.log(i+': items per col: '+itemspercol);

            var colheight = itemspercol * itemheight;
            console.log(i+': colheight: '+colheight);

            j$(this).find('.task-list-wrapper').height(colheight);
        }
        

    })
};

 function setExpanderWrapperWidth(){
    var vpw = j$(window).width();
    console.log('view port width : '+vpw);
    var cardqty = j$('.task-category').length;
    var card = j$('.task-category')[0];
    var cardwidth = j$(card).width() + 24;
    
    var containerwidth = '100%';
    var container = j$('#browse-expand');
    
    if(vpw < 768){
        containerwidth = cardwidth * cardqty;
    }
    
     container.width(containerwidth)
    
     console.log(':::: containerwidth: '+containerwidth);
};



function openModal(whichModal){
    console.log("show modal...."+whichModal);
    j$(whichModal).addClass("open");
    j$("body").addClass("noScroll");
}

function closeModal(){
    j$(".pr-modal.open").removeClass("open");
    j$("body").removeClass("noScroll");
}




function submitShortForm() {


  let shortFormComplete = false,
      firstNameComplete = false,
      lastNameComplete = false,
      businessNameComplete = false,
      businessPhoneComplete = false,
      businessEmailComplete = false,
      userPasswordComplete = false,

      firstNameInput = j$('#input-firstname'),
      lastNameInput = j$('#input-lastname'),
      businessNameInput = j$('#input-businessname'),
      businessPhoneInput = j$('#input-businessphone'),
      businessEmailInput = j$('#input-businessemail'),
      userPasswordInput = j$('#input-password'),

      firstName = firstNameInput.val(),
      lastName = lastNameInput.val(),
      businessName = businessNameInput.val(),
      businessPhone = businessPhoneInput.val(),
      businessEmail = businessEmailInput.val(),
      userPassword = userPasswordInput.val(),

      firstNameInputContainer = firstNameInput.parent(),
      lastNameInputContainer = lastNameInput.parent(),
      businessNameInputContainer = businessNameInput.parent(),
      businessPhoneInputContainer = businessPhoneInput.parent(),
      businessEmailInputContainer = businessEmailInput.parent(),
      userPasswordInputContainer = userPasswordInput.parent();


       if(firstName.length > 2){
            firstNameComplete = true;
       }
       if(lastName.length > 2){
          lastNameComplete = true;
       }
       if(businessName.length > 2){
          businessNameComplete = true;
       }
       if(businessPhone.length > 2){
          businessPhoneComplete = true;
       }
       if(businessEmail.length > 2){
        businessEmailComplete = true;
       }
       if(userPassword.length > 2){
          userPasswordComplete = true;
       }

       if(firstNameComplete && lastNameComplete && businessNameComplete && businessPhoneComplete && businessEmailComplete && userPasswordComplete){
        console.log('short form complete .... submit and redirecting now....');
          shortFormComplete = true;

          if(shortFormComplete){
              let newAppendage = '?&firstname='+firstName +'&lastname='+lastName +'&busname='+ businessName +'&phone='+ businessPhone +'&email='+ businessEmail +'&confirm='+ confirmationVersion; // add this section to hash in URL - so we can go keep track of where we are.
              window.open("../steps/index.html"+newAppendage, "_self");
          }

          return true;
       }
       else{
        console.log('short form INCOMPLETE...');
          if(!firstNameComplete){
              firstNameInputContainer.addClass('error');
          }
          else{
              firstNameInputContainer.removeClass('error');
          }
          if(!lastNameComplete){
              lastNameInputContainer.addClass('error');
          }
          else{
              lastNameInputContainer.removeClass('error');
          }
          if(!businessNameComplete){
              businessNameInputContainer.addClass('error');
          }
          else{
              businessNameInputContainer.removeClass('error');
          }
          if(!businessPhoneComplete){
              businessPhoneInputContainer.addClass('error');
          }
          else{
              businessPhoneInputContainer.removeClass('error');
          }
          if(!businessEmailComplete){
              businessEmailInputContainer.addClass('error');
          }
          else{
              businessEmailInputContainer.removeClass('error');
          }
          if(!userPasswordComplete){
              userPasswordInputContainer.addClass('error');
          }
          else{
              userPasswordInputContainer.removeClass('error');
          }

          return false;
       }

}




function nextSlide(){
   var gotoslide = currentSlide + 1;

        if (gotoslide > numofSlides){
          gotoslide = 0;
        }
        currentSlide = gotoslide;


          j$('.slider-carousel').animate({left: -(100 * gotoslide) + '%' }, 'slow');

        j$('.slider-dot').removeClass('slider-active');
        j$(".slider-dot[data-slide='" + currentSlide +"']").addClass('slider-active');

        return false;
}

function prevSlide(){
   var gotoslide = currentSlide - 1;

        if (gotoslide < 0){
          gotoslide = 2;
        }

        currentSlide = gotoslide;

         j$('.slider-carousel').animate({left: -(100 * gotoslide) + '%' }, 'slow');
         j$('.slider-dot').removeClass('slider-active');
         j$(".slider-dot[data-slide='" + currentSlide +"']").addClass('slider-active');

          return false;

}






function initSlider(){

    j$('.slider-arrow.next').on('click', function(){
      nextSlide();
    });



    j$('.slider-arrow.prev').on('click', function(){
      prevSlide();
    });

    // Pagination dots
    j$('.slider-dot').on('click', function(){
    j$('.slider-dot').removeClass('slider-active');
    j$(this).addClass('slider-active');

    var gotoslide =  j$(this).data('slide');
        currentSlide = gotoslide;

       j$('.slider-carousel').animate({left: -(100 * gotoslide) + '%' }, 'slow');

    });

}

       
function initModals(){
  

    j$(".link-to-modal").on("click", function(){
          let gotomodal = j$(this).data("target");
          openModal(gotomodal);
     });

    j$(".app").on("click", 'link-to-modal', function(){
          let gotomodal = j$(this).data("target");
          openModal(gotomodal);
     });


    j$(".app").on("click", ".modal-close-btn", function(){
        console.log('click it!');
          closeModal();
    });
       
    j$(".app").on("click", ".pr-modal-backdrop", function(){
      closeModal();
    });

    j$(document).keyup(function(e) { 
        if (e.keyCode === 27) { 
            closeModal();
        } 
    });

}




function initApp(){
    console.log(' APP.js ready......');


  let confirmURL = getUrlParameter('confirm');
  
  if(confirmURL !== undefined){
    confirmationVersion = confirmURL;
  }
    console.log('confirmation version: ' +confirmationVersion);



    var firstname = j$('input[id$=inputfirstname]')[0];
    if(!firstname){
      firstname = j$('#input-firstname');
    }
    var lastname = j$('input[id$=inputlastname]')[0];
    if(!lastname){
      lastname = j$('#input-lastname');
    }
    var businessname = j$('input[id$=inputBusinessname]')[0];
    if(!businessname){
      businessname = j$('#input-businessname');
    }
    var phone = j$('input[id$=inputPhone]')[0];
    if(!phone){
      phone = j$('#input-businessphone');
    }
    var email = j$('input[id$=inputEmail]')[0];
    if(!email){
      email = j$('#input-businessemail');
    }
    var pwd = j$('input[id$=inputPassword]')[0];
    if(!pwd){
      pwd = j$('#input-password');
    }
    firstname.value = '';
    lastname.value = '';
    businessname.value = '';

    phone.value = '';
    email.value = '';
    pwd.value = '';
    
    setExpanderListHeights();
    setExpanderWrapperWidth();

    var isIE = (navigator.userAgent.indexOf("MSIE") != -1);
    var isIE11 = (navigator.userAgent.indexOf("rv:11.0") != -1); 
    if( isIE || isIE11 ){
        j$('#isIEErr').css("display","block");
    }

    j$(window).resize(function(){
            setExpanderListHeights();
            setExpanderWrapperWidth();
            j$('.task-category').removeClass('expanded');
        });


    j$(".app").on("input", ".input", function() {
        if (j$(this).val() !== "" && j$(this).val() !== null && j$(this).val().length > 0) {
            j$(this).parent().addClass("filled").removeClass('error');

        } else {
            j$(this).parent().removeClass("filled");
        }
    });

    /* Check for touch event */
    window.addEventListener('touchstart', function touched() {  
      document.body.classList.add('touch');
      window.removeEventListener('touchstart', touched, false);
    }, false);



    j$(window).scroll(function() {    
        var scroll = j$(window).scrollTop();

        var firstSection = j$('#section-howitworks').offset().top; 

        if (scroll >= firstSection) {
            j$(".pr-header-fixed").addClass("fixed");
        } else {
            j$(".pr-header-fixed").removeClass("fixed");
        }
    });


    j$('.numbered-header').on('mouseenter', function(event) {
        var selector = j$(this).data('selector');
        var selected = j$(this).data('selected');

        j$('#section-howitworks').find('.howitworks-hero.active').removeClass('active');
        j$('#section-howitworks').find('.numbered-header.active').removeClass('active');
        j$(this).addClass('active');
        j$('#section-howitworks').find('.howitworks-hero.'+selector).addClass('active');

    });

    j$('.numbered-header').on('mouseleave', function(event) {
         var selected = j$(this).data('selected');

        j$('#section-howitworks').find('.howitworks-hero.active').removeClass('active');
        j$('#section-howitworks').find('.numbered-header.active').removeClass('active');

        j$('#section-howitworks').find('.numbered-header.'+selected).addClass('active');
        j$('#section-howitworks').find('.howitworks-hero.'+selected).addClass('active');

     });

    j$('.numbered-header').on('click', function(){
        var selector = j$(this).data('selector');
        j$('.numbered-header').data('selected', selector);

        j$('#section-howitworks').find('.howitworks-hero.active').removeClass('active');
        j$('#section-howitworks').find('.numbered-header.active').removeClass('active');
        j$(this).addClass('active');
        j$('#section-howitworks').find('.howitworks-hero.'+selector).addClass('active');
    });


    j$('#more-faq-btn').on('click', function(){
        j$(this).hide();
        j$('#less-faq-btn').fadeIn('fast');
        j$('#remainder-faq').fadeIn('fast');
    });

    j$('#less-faq-btn').on('click', function(){
        j$(this).hide();
        j$('#more-faq-btn').fadeIn('fast');
        j$('#remainder-faq').fadeOut('fast');
    });


    j$('#start-form-applybtn').on('click', function(){
        submitShortForm();
    });


    j$('#header-getstarted-btn').on('click', function(){
       j$("html, body").animate({ scrollTop: "0px" });
    });

    j$('.header-tab').on('click', function(){
        var gotosection = j$(this).data('scroll');
        gotosection = 'section-'+gotosection;

        var newPos = j$('#'+gotosection).offset().top - 80;

        j$('html,body').animate({scrollTop: newPos},'slow');

        j$(this).addClass('active');

    });


// ACTIVATE TABS when we scroll to that section
    j$(document).on('scroll', function(){
        var scrollPos = j$(document).scrollTop();

        j$('.header-tab').each( function () {
            var currLink = j$(this);
            var refElement = j$(this).data('scroll');
                refElement = '#section-'+refElement;

                refElement = j$(refElement);
            var thisTop = refElement.position().top - 80;
            var thisHeight = refElement.height();


            if (thisTop <= scrollPos && thisTop + thisHeight > scrollPos) {
                j$('.header-tab').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }

        });
    });







}



j$(document).ready(function() {
	console.log('initialize App');


  initApp();
  initModals();
  initSlider();



  if(window.location.href.indexOf("thdserviceprovider") > -1) {
       console.log("url contains thdserviceprovider - we are in SF");
  }
  else{ // 
    console.log('not SF - load sections and check appended URL');
  	initLicenseTool();
  	initServiceExpander();
  }


});


