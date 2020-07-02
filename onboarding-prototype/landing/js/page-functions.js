console.log(' page-function.js ready......');




    j$(window).scroll(function() {    
        var scroll = j$(window).scrollTop();

        if (scroll >= 100) {
            j$(".pr-header").addClass("fixed");
        } else {
            j$(".pr-header").removeClass("fixed");
        }
    });

    j$('.numbered-header').on('click', function(){
        var selector = j$(this).data('selector');

        j$('#section-howitworks').find('.howitworks-hero.active').removeClass('active');
        j$('#section-howitworks').find('.numbered-header.active').removeClass('active');
        j$(this).addClass('active');
        j$('#section-howitworks').find('.howitworks-hero.'+selector).addClass('active');
    });

    j$('#more-faq-btn').on('click', function(){
        j$(this).hide();
        j$('#less-faq-btn').fadeIn('fast');
        j$('#remainder-faq').fadeIn('fast');
        console.log('show more faq');
    });
    j$('#less-faq-btn').on('click', function(){
        j$(this).hide();
        j$('#more-faq-btn').fadeIn('fast');
        j$('#remainder-faq').fadeOut('fast');
        console.log('show more faq');
    });



// Open Modal
let openModal = function(whichModal){
            console.log('show modal....');

        j$(".pr-modal")
            .css("display", "flex")
            .hide()
            .slideDown('fast');

        j$(".pr-modal-window").addClass('pr-modal-window--open');
        j$('#'+whichModal).fadeIn('fast');
  
};

// Close Modal
let closeModal = function(){
        j$(".pr-modal-window").removeClass('pr-modal-window--open');       
        j$(".pr-modal").fadeOut('fast', function(){
            j$('.pr-modal-screen').hide();
        });
};

j$('.link-to-example').on('click', function(){
    openModal('pr-modal-liability-sample');
});


j$('.modal-btn-Close').on("click", function() {
        closeModal();
});

// connect X-Close Button for Modal
j$('#closex-btn').on('click', function(){
    closeModal();
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





console.log(' license-tool.js ready......');


let selectedState = '';
let selectedService = '';
let hasRequirements = false;


            // Get the Required and Acceptable Licenses - for this State and Occupation
            let collectLicensesText = function(occ, state, view){
                console.log('selectedState = '+selectedState);
                console.log('selectedService = '+selectedService);
                console.log('occ = '+occ);
                console.log('state = '+state);
              
                let requiredLicenses = '';
                let acceptableLicenses = '';
                let combinedText = '';

                let found_reqs = j$.grep(requirements, function(v) {
                    return v.STATE == state && v.VERTICAL == occ;
                });

                j$.each(found_reqs, function( k, v ) {
                  console.log( "Key: " + k + ", VERTICAL: " + v.VERTICAL + ", LICENSE: " + v.LICENSE + ", REQUIRED: " + v.REQUIRED + ", REQUIRED: " + v.REQUIRED );
                });


                console.log(' requirements: ',requirements.length);
                console.log(' found_reqs: ',found_reqs.length);
                console.log(' found_reqs: ',found_reqs);

                if (found_reqs.length > 0){
                    hasRequirements = true;
                        console.log('hasRequirements: ', hasRequirements);
                }
                else{
                    hasRequirements = false;
                        console.log('hasRequirements: ', hasRequirements);
                        j$('#step2-continue-btn').prop('disabled', false);
                        return "No License Required.";
                }
              
                j$.each(found_reqs, function(i, item){

                    let licenseText = item.LICENSE;
                    let isRequired = item.REQUIRED;

                        if (isRequired === 'ACCEPTABLE') {
                            acceptableLicenses += '<li>'+licenseText+'</li>';
                        }

                        else {
                            if(requiredLicenses){
                                requiredLicenses += '&nbsp; - AND - &nbsp;';
                            }
                            requiredLicenses += licenseText;
                        }

                    

                });


                    combinedText = '<li>'+requiredLicenses+'</li>';

                    if(acceptableLicenses){
                        combinedText +=  acceptableLicenses;
                    }
                    console.log('combinedText :'+combinedText);

              
                    

                console.log(' : requiredLicenses: ' + requiredLicenses);
                console.log(' : acceptableLicenses: ' + acceptableLicenses);
                j$('.occ-txt').text(occ);
                j$('.state-txt').text(state);

                return combinedText;
            };



j$('#check-requirements-btn').on('click', function(){

    console.log('check requirements...')
   
     let reqsforthisService = collectLicensesText(selectedService, selectedState, true);
     j$('.pr-modal-viewreqs').html(reqsforthisService);

    openModal('pr-modal-viewrequirements');
});



// connect occupation selector
j$('#occupation-selector').on('change', function(){

    let occupation = j$(this).val();
    j$('.occ-txt').text(occupation);
    selectedService = occupation;
});


// connect state selector
j$('#state-selector').on('change', function(){

    let stateName = j$(this).find("option:selected").text();
    j$('.state-txt').text(stateName);

    let state = j$(this).val();
    selectedState = state;

    j$('#business-state').val(selectedState).parent().addClass('filled');
});








