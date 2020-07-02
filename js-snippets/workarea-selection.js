
/*

        workarea validations
        ZipcodenotInState = true
        bZipcodeVaidError = true
        ZipcodeVaidError ='Please enter a valid zip code';

*/
            let zipContainer = j$("#zip-input-container");
            let zipCodeInput = j$(".businessZipInput");
            let radiusContainer = j$("#radius-input-container");
            let workradiusSelect = j$(".workarea-radius");
            let zipCodeValid = false;
            let workradiusValid = false;
            let currentZip, currentRadius;
            let inputcount = j$(".shortform-input").length;
            let isValid = true;



                j$(".app").on("click", "#back-to-previous-btn", function () {
                    showSectionSpinner("While we redirect your page...");
                    gotoPrevious();
                });
        
    
                 j$(".app").on("click", "#coveragearea-submit-btn", function () {
                     showSectionSpinner("While we redirect your page...");
                     submitWorkarea();
                  });
        

            function checkWorkAreaInputs() {
                //console.log('check work area inputs');

                if (zipCodeInput.val() > 4) {
                    zipCodeValid = true;
                }
                if (workradiusSelect.val() != "none") {
                    workradiusValid = true;
                }

                if (zipCodeValid && workradiusValid) {
                    //console.log('zip and radius are selected');
                    return true;
                }
                else {
                    //console.log('inputs not valid...');
                    return false;
                }
            }



            function validateWorkAreaInputs() {
                //console.log('check work area inputs');

                if (zipCodeInput.val() > 4) {
                    zipCodeValid = true;
                    currentZip = zipCodeInput.val();
                    zipContainer.removeClass("error");

                }
                else {
                    zipContainer.addClass("error");
                }
                if (workradiusSelect.val() != "none") {
                    workradiusValid = true;
                    currentRadius = workradiusSelect.val();
                    radiusContainer.removeClass("error");
                }
                else {
                    radiusContainer.addClass("error");
                }

                if (zipCodeValid && workradiusValid) {
                    //console.log('zip and radius are selected');
                    return true;
                }
                else {
                    //console.log('inputs not valid...');
                    return false;
                }
            }


            function showCompletedSection() {
                j$("#section-confirmation").removeClass("d-none");
                j$("#section-coverage-area").addClass("d-none");
            }
            function showStartSection() {
                j$("#section-coverage-area").removeClass("d-none");
                j$("#section-confirmation").addClass("d-none");
            }

            function submitWorkarea() {
                console.log('...submit WORKAREA...');
                showSectionSpinner("While we save your work area...");
                j$(window).scrollTop(0);

                let inputsAreSelected = validateWorkAreaInputs();

                if (inputsAreSelected) {
                    console.log('inputs are selected -- and valid so we can submit - and redirect to services page');
                    gotoNext();
                   
                    mixpanel.track("Submit", {
                        "PageName": "ProOnboarding Coverage Area",
                        "Zip": currentZip,
                        "Radius": currentRadius
                    });
                }
                else {
                    //console.log('error found...');
                    showStartSection();
                }

            }

            function checkIfComplete() {
                let isComplete = "{!bComplete}";
                //console.log('check if complete...'+isComplete);

                if (isComplete == "true") {
                    showCompletedSection();
                }
                else {
                    showStartSection();
                }

            }

            function initWorkArea() {
    
                j$(".app").on("click", "#back-to-previous-btn", function () {
                    showSectionSpinner("While we redirect your page...");
                    gotoPrevious();
                });
        
    
                 j$(".app").on("click", "#coveragearea-submit-btn", function () {
                     showSectionSpinner("While we redirect your page...");
                     submitWorkarea();
                  });
        


            }

            j$(document).ready(function () {
                mixpanel.track("View Onboarding Work Area", { "PageName": "BecomeaPro Coverage Area" });
                initWorkArea();
                checkIfComplete();
            });
