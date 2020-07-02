 let isAgentFlow = true; // set to apex flag/var

 function showSectionSpinner(msg) {
   openModal("#pr-modal-HangOn", msg);
 }

 function hideSectionSpinner() {
   //console.log(" hide Section spinner....");
   j$("#pr-modal-HangOn").removeClass("open");
   j$("body").removeClass("noScroll");
   reEnableTabbingOnPage(tabbableElements);
   j$(elementWithFocus).focus();
 }

 function showCompletedSection() {
   j$("#section-confirmation").removeClass("d-none");
   j$("#section-pro-xtra").addClass("d-none");
 }

 function showStartSection() {
   j$("#section-pro-xtra").removeClass("d-none");
   j$("#section-confirmation").addClass("d-none");
 }

 function checkInputs() {
   // check if proxtra number is prepopulated - if so - show the input and check the radio
   //console.log(':::: CHECK INPUTS :::: ');

   let proxtraNumberInput = j$(".input-proxtra-number"),
     proxtraNumber = proxtraNumberInput.val(),
     proxtraNumberContainer = proxtraNumberInput.parent(),

     proxtraRadioContainer = j$("#proxtra-radio-container"),
     yesProXtraNumberRadio = j$("input[id$='radio-proxtra-yes']"),
     ProXtraNumberRadio = j$("input[name='radio-proxtra']"),
     ProXtraRadioChecked = j$("input[name='radio-proxtra']:checked"),
     proXtraType = ProXtraRadioChecked.val();

   if (proxtraNumber.length > 4) {
     //console.log('pro xtra number is found - show the input and check the yes radio');
     proxtraComplete = true;
     proxtraNumberContainer.removeClass("error").addClass("filled success")
     proxtraNumberInput.prop("disabled", true);
     yesProXtraNumberRadio.prop("checked", true);
     ProXtraNumberRadio.prop("disabled", true);

     j$(".proxtra-no-show").hide();
     j$(".nextstep-btn").removeClass("d-none");
     j$(".proxtra-yes-show").css("display", "flex");
   } else if (proXtraType != undefined) { // if Radio is checked
     //console.log('proXtraType'+proXtraType);

     j$(".proxtra-yes-show").hide();
     j$(".proxtra-no-show").hide();
     j$(".nextstep-btn").removeClass("d-none");
     j$(".proxtra-" + proXtraType + "-show").css("display", "flex");
     j$("#proxtra-TOS").removeClass("d-none");
     showStartSection();

   } else {
     j$(".proxtra-no-show").hide();
     j$(".proxtra-yes-show").hide();
     ProXtraNumberRadio.prop("disabled", false);
     proxtraComplete = false;
     showStartSection();
   }


   j$(".proxtra-input").each(function () {
     //console.log('proxtra-input:...'+j$(this).val());
     if (j$(this).val() != "" && j$(this).val() != " " || j$(this).is(":invalid")) {
       j$(this).parent().addClass("filled");

       if (!j$(this).parent().hasClass("error") && !j$(this).parent().hasClass("sferror")) {
         j$(this).parent().addClass("success");
       }
     } else {
       //console.log('proxtra-input:...EMPTY'+j$(this).val());

       j$(this).parent().removeClass("filled success");
     }
   });


 }


 let proxtraComplete = false;

 function validateProXtra() {
   //console.log('validate ProXtra...');

   let proxtraNumberInput = j$(".input-proxtra-number"),
     proxtraNumber = proxtraNumberInput.val(),
     proxtraNumberContainer = proxtraNumberInput.parent(),

     proxtraPhoneInput = j$(".input-phone-number"),
     proxtraPhone = proxtraPhoneInput.val(),
     proxtraPhoneContainer = proxtraPhoneInput.parent(),

     proxtraRadioContainer = j$("#proxtra-radio-container"),

     mobileNumberInput = j$(".input-mobile-number"),
     mobileNumber = mobileNumberInput.val(),
     mobileNumberContainer = mobileNumberInput.parent();

   doyouhaveaProXtraNumber = j$("input[name='radio-proxtra']:checked").val();

   //console.log('radio checked value :'+doyouhaveaProXtraNumber);

   if (!doyouhaveaProXtraNumber) {
     //console.log('Nothing is checked!');
     proxtraRadioContainer.addClass("error");
     proxtraComplete = false;

     return false;
   } else {
     //console.log('One of the radio buttons is checked!');
     proxtraRadioContainer.removeClass("error");

     if (mobileNumber != "" && mobileNumberInput.is(":invalid")) {
       //console.log('ERROR: invalid mobile number is entered...');
       mobileNumberContainer.addClass("error");
       return false;
     } else {
       mobileNumberContainer.removeClass("error");
     }

     if (doyouhaveaProXtraNumber == "yes") {
       //console.log('Yes  - I have a ProXtra Number is checked!'+proxtraNumber);
       if (proxtraNumber.length > 4) {
         proxtraComplete = true;
         proxtraNumberContainer.removeClass("error");
         return true;
       } else {
         proxtraComplete = false;
         proxtraNumberContainer.addClass("error");
         return false;
       }
     } else {
       //console.log('No -  I dont have a ProXtra Number is checked! '+proxtraPhone);
       if (proxtraPhone.length > 4) {
         proxtraPhoneContainer.removeClass("error");
         proxtraComplete = true;
         return true;
       } else {
         proxtraPhoneContainer.addClass("error");
         proxtraComplete = false;
         return false;
       }
     }
   }

 }




 function initApp() {

   // Mark inputs as "filled" when users type - so we can keep the label up when they leave   
   j$(".app").on("input", ".input", function () {
     if (j$(this).val() !== "" && j$(this).val() !== null && j$(this).val().length > 0) {
       j$(this).parent().addClass("filled").removeClass("error");

     } else {
       j$(this).parent().removeClass("filled");
     }
   });



   j$(".app").on("click", ".modal-close-btn", function () {
     closeModal();
   });


   // ESCAPE KEY close modal
   j$(document).keyup(function (e) {
     if (e.keyCode === 27) {
       closeModal();
     }
   });

   // MODAL BACKDROP click to close modal
   j$(".app").on("click", ".pr-modal-backdrop", function () {
     closeModal();
   });

   j$(".app").on("click", ".link-to-modal", function () {
     let gotomodal = j$(this).data("target");
     openModal(gotomodal);
   });

   j$(".proxtra-input").mask('(000) 000-0000');

   j$(".proxtra-input").on("blur", function () {

     if (j$(this).is(":invalid") && j$(this).val() != "") {
       //console.log('input invalid');
       j$(this).parent().removeClass("success").addClass("error");
     } else if (j$(this).val() === "") {
       j$(this).parent().removeClass("success error");
     } else {
       //console.log('input valid... adding success');
       j$(this).parent().removeClass("error sferror").addClass("success");
     }

   });


   j$(".radio-proxtra").on("keydown", function (e) {
     if ((e.keyCode ? e.keyCode : e.which) == 13) {
       j$(this).find("input[name='radio-proxtra']").trigger("change").prop("checked", true);
       //console.log("enter..");
     }

   });



   let proXtraType = "number";

   j$("#section-loader").on("change", "input[name='radio-proxtra']", function () {
     proXtraType = j$(this).val();
     //console.log(proXtraType);

     j$(".proxtra-yes-show").hide();
     j$(".proxtra-no-show").hide();
     j$(".nextstep-btn").removeClass("d-none");
     j$(".proxtra-" + proXtraType + "-show").css("display", "flex");
     j$("#proxtra-TOS").removeClass("d-none");
   });


   j$("#section-loader").on("click", ".nextstep-btn", function () {

     if (validateProXtra()) {
       showSectionSpinner("While we save your changes...");
       btnSubmitApex();
     } else {
       //console.log('error....');
     }

   });

   checkInputs();
 }


 j$(document).ready(function () {
   console.log(" App js ready......" + j$(".app").length);
   initApp();
 });