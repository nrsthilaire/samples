

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






