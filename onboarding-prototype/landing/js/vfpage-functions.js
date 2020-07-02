

         
        

          
        
        function openLicenseModal(){
            console.log('show modal....');
            
            var selectedOccupation = $j('select[id$=selectOccupation]').val();
            var selectedState = $j('select[id$=selectState]').val();
            
            console.log('selectedOccupation = '+selectedOccupation);
            console.log('selectedState = '+selectedState);
            
            if(selectedOccupation == 'none' || selectedState === 'none' ){
                console.log('no state or occupation selected...');
            }
            else{

                j$(".pr-modal.normal-type")
                    .css("display", "flex")
                    .hide()
                    .slideDown('fast');
        
                j$(".pr-modal.normal-type .pr-modal-window").addClass('pr-modal-window--open');
                j$("#pr-modal-viewrequirements").fadeIn('fast');
                j$(".pr-modal-viewreqs").hide();
                j$(".spinner-wrapper").show();
                
                j$('#req-heading').hide();
                j$('#req-temp-heading').show();
                j$('.pr-modal-msg').hide();
            }
            
    };

        function insertOrSeperator(){
            var ordivider = '<li class="or-divider color-bgray"> or </li>';
            var anddivider = '<span class="font-weight-bold">&nbsp; and &nbsp;</span>';
            var reqMessage = 'Pro Referral requires <span class="font-weight-bold">ONE</span> of the following license(s) for';
            var noreqMessage = 'No license is required for ';

             j$('.pr-modal-viewreqs li:not(:last)').each(function(){
                 j$(this).after(ordivider);
             });

             j$('.pr-modal-viewreqs li:contains("AND")').html(function(_, txt) {
                return txt.replace('AND',anddivider);
            });
            
            if(j$(".pr-modal-viewreqs li:contains('License is not required')").length > 0){
                j$('#req-message').html(noreqMessage);
                j$('#req-heading').show();
                j$('#req-temp-heading').hide();
                j$('.pr-modal-content').hide();
            }
            else{
                j$('#req-message').html(reqMessage);
                j$('.pr-modal-msg').show();
                j$('#req-heading').show();
                j$('#req-temp-heading').hide();
                j$('.pr-modal-content').show();
            }

        };

       function showLicenseReqs(){
            insertOrSeperator();
            j$(".pr-modal-viewreqs").fadeIn('fast');
            j$(".spinner-wrapper").hide();
        };
        
        function getStartedEnable(){
            var emalBtnSave = document.getElementById('inputbtngetstarted');
            
            var firstname = $j('input[id$=inputfirstname]')[0];
            var lastname = $j('input[id$=inputlastname]')[0];
            var businessname = $j('input[id$=inputBusinessname]')[0];
            var phone = $j('input[id$=inputPhone]')[0];
            var email = $j('input[id$=inputEmail]')[0];
            var pwd = $j('input[id$=inputPassword]')[0];

            if(
                (firstname.value).trim() != '' && 
                (lastname.value).trim() != '' && 
                (businessname.value).trim() != '' && 
                inputOccupationEnable == 'true' && 
                (pwd.value).trim() != '' && 
                (phone.value).trim() != '' && 
                (email.value).trim() != ''){
                
                if($j(emalBtnSave).hasClass('DisabledActionbtn')) {
                    $j(emalBtnSave).removeClass("DisabledActionbtn");
                    $j(emalBtnSave).addClass("EnabledActionbtn");
                    emalBtnSave.disabled= false;
                }  
            }else{
                if($j(emalBtnSave).hasClass('EnabledActionbtn')) {
                    $j(emalBtnSave).removeClass("EnabledActionbtn");
                    $j(emalBtnSave).addClass("DisabledActionbtn");
                    emalBtnSave.disabled= true;
                }
            }
        }
        
        function validateEmail(){
            var email = $j('input[id$=inputEmail]')[0].val;
            $j('input[id$=inputEmail]')[0].value= $j.trim(email);
        }
        
        function saveHidden(evt, fldName){
            var edValue = document.getElementById("hidden"+fldName); 
            var pval = String.fromCharCode(evt.which);
            var s = edValue.value + pval;
            $j(edValue).val( s );
        }
        
        function interceptKeys(evt) {
            evt = evt||window.event // IE support
            var c = evt.keyCode
            var ctrlDown = evt.ctrlKey||evt.metaKey // Mac support
            if (ctrlDown && evt.altKey) return true
            
            // Check for ctrl+c, v and x
            else if (ctrlDown && c==67) return true // c
            else if (ctrlDown && c==86) return true // v
            else if (ctrlDown && c==88) return false // x
            // Otherwise allow
            return true;
        }
        
        function isNumberKeyZip(evt){
            var regex = new RegExp("^[0-9]$");
            var str = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);
            var edValue = document.getElementById("hiddeninputBusinessZip");
            var pval = String.fromCharCode(evt.which);
            if (!regex.test(str)){
                return false;
            }
            return true;
            
        }
        
        function validateNum(event){
            var num = $j('input[id$=inputPhone]')[0];//document.getElementById("j_id0:j_id4:inputPhone");
            var val = num.value;
            val = val.replace(/\(|\)/g,"").replace(/\-/g,"").replace(/\s/g, '').trim();;
            num.maxLength=10;
            num.value = val;
        }
        
        var specialKeys = new Array();
            specialKeys.push(8); //Backspace
            specialKeys.push(9); //Tab
            specialKeys.push(46); //Delete
            specialKeys.push(36); //Home
            specialKeys.push(35); //End
            specialKeys.push(37); //Left
            specialKeys.push(39); //Right
        
        function IsAlphaNumeric(e, fldName) {
            var hidValueFrstname = document.getElementById("hidden"+fldName);
            var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
            if((keyCode >= 48 && keyCode <= 57) || (specialKeys.indexOf(e.keyCode) != -1)){
                return false;
            }else{
                var pval = String.fromCharCode(e.which);
                var s = hidValueFrstname.value + pval;
                $j(hidValueFrstname).val( s );
                return true;
            }
        }
        
        function IsAlphaNumericBusiness(e, fldName) {
            var hidValueFrstname = document.getElementById("hidden"+fldName);
            
            $j(hidValueFrstname).val("");        
            var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
            if(specialKeys.indexOf(e.keyCode) != -1){
                return false;
            }else{
                
                return true;
            }
        }
        
        function isNumberKey(evt,ele){
            if (/\D/g.test(ele.value)){
                // Filter non-digits from input value.
                ele.value = ele.value.replace(/\D/g, '');
            }
        }
        
        function formatPhone(obj) {
            var s2= obj.value.replace(/\D/g, "");
            var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
            obj.value= (!m) ? s2 : "(" + m[1] + ") " + m[2] + "-" + m[3];
            
            
        }
        
        function IsAlphabetic(event) {
            var key = event.keyCode == 0 ? event.charCode : event.keyCode;
            if (key == 8 || key == 9 || key == 32) {
                return true;
            }else if ((key > 64 && key < 91) || (key > 96 && key < 123)){
                return true;
            } else{
                return false;
            }
        }
        
        function cleanSpecialChar(t) {
            var text = t.value.toString().replace(/[^a-zA-Z/\s\n\r]+/g, '');
                       t.value = text.replace(/([\/\\])/g, "");
            
        }
      
        
        function onCompleteErrorAlert(){
            var emalBtnSave = document.getElementById('inputbtngetstarted');
            if($j(emalBtnSave).hasClass('DisabledActionbtn')) {
                $j(emalBtnSave).removeClass("DisabledActionbtn");
                $j(emalBtnSave).addClass("EnabledActionbtn");
                emalBtnSave.disabled = false;
            }
            
            onCompleteSave();
        }

        function onCompleteSave(){
            
            var lblerr_email = $j("input[id$=h_lblerr_email]").val();
            var lblerr_phone = $j("input[id$=h_lblerr_phone]").val();
            var lblerr_pwd = $j("input[id$=h_lblerr_pwd]").val();
            
            var emalElepwd = $j('input[id$=inputPassword]')[0];
            var emalElep = $j('input[id$=inputPhone]')[0];
            var emalElee = $j('input[id$=inputEmail]')[0];
            
            emalElez.style.border="1px solid #D8DDE6";
            emalElep.style.border="1px solid #D8DDE6";
            emalElee.style.border="1px solid #D8DDE6";
            
            if(lblerr_email == 'true'){
                emalElee.style.border="1px solid red";
                //emalElee.focus();                   
            }
            if(lblerr_phone == 'true'){
                emalElep.style.border="1px solid red";
                //emalElep.focus();                   
            }
            if(lblerr_pwd == 'true'){
                emalElez.style.border="1px solid red";
                //emalElez.focus();                   
            }
        }
        function onStartEnable(){
            var elmBody = document.getElementById('lockscreendiv');
            elmBody.style.display= 'block';
        }
        function onCompleteEnable(){
            var emalBtnSave = document.getElementById('inputbtngetstarted');
            var btnclass = $j("input[id$=inputhdnbtngetstarted]").val();
            if(btnclass == 'EnabledActionbtn')
                emalBtnSave.disabled= false;
            else
                emalBtnSave.disabled= true;
            
            var elmBody = document.getElementById('lockscreendiv');
            elmBody.style.display= 'none';
        }

        function BeforeEnableAdditionalOcc(AddMoreIndex,AddMoreOption){
            
            if(AddMoreIndex == '0' && AddMoreOption == '1'){
                EnableAdditionalOcc();
            }
            else if(AddMoreIndex == '1' && AddMoreOption == '2'){
                EnableAdditionalOcc3();
            }
        }

        function onclickAddMoreOptionJS(){
            onclickAddMoreOption();
        }

        function onChangeSelectListJS(optionId,ele){    
            var v=ele.value;
            onChangeSelectList(v,optionId);
        }

        function submitShortForm(){
            mixpanel.track( "Submit ShortForm", {"PageName": "BecomeaPro"});
            var leadEmail = $j('input[id$=inputEmail]')[0].value;                               
            mixpanel.alias(leadEmail);
        }

        function myFunction(event) { 
           if(event.target.id!="mySidenavWeb" && event.target.id!="chatWeb")
            { 
               document.getElementById("chatWeb").className = "display-block";
               document.getElementById("mySidenavWeb").className = "display-none"; 
                //document.getElementById("mySidenavWeb").style.width = "0";
            }
        }
        function openNavWeb() {
            document.getElementById("chatWeb").className = "display-none";
            document.getElementById("mySidenavWeb").className = "display-block"; 
            document.getElementById("mySidenavWeb").style.width = "300px";
        }
        
        function closeNavWeb() {
            document.getElementById("chatWeb").className = "display-block";
            document.getElementById("mySidenavWeb").className = "display-none"; 
            document.getElementById("mySidenavWeb").style.width = "0";
        }
        function openNavMobile() {
            document.getElementById("chatMobile").className = "display-none";
            document.getElementById("mySidenavMobile").className = "display-block"; 
            document.getElementById("mySidenavMobile").style.width = "300px"; 
        }
        
        function closeNavMobile() {
            document.getElementById("chatMobile").className = "display-block";
            document.getElementById("mySidenavMobile").className = "display-none";
            document.getElementById("mySidenavMobile").style.width = "0";
        }
        function chatAvailableClicked(){
            mixpanel.track( "Live Chat button Available - clicked", {"PageName": "BecomeaPro"});
        }
        function chatOfflineClicked(){
            mixpanel.track( "Live Chat button Offline - clicked", {"PageName": "BecomeaPro"});
        }
        function chatOfflinePopupClicked(){
            mixpanel.track( "Live Chat button Offline info Pop-Up Window - clicked closed", {"PageName": "BecomeaPro"});
        }
        

