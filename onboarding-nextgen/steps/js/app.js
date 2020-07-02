
let j$ = jQuery.noConflict();

let proXtraType = "number";

let statusTypes = ["Incomplete", "Complete", "Pending Approval", "Action Required"];
let statusClass = ["incomplete", "complete", "pending", "action"];

let progressPercentages = [0, 10, 20, 40, 60, 80, 100];

let statusHash = "";

let stepStatus = [
  {"id": "short-form",          "vfname": "ShortForm",          "status": 1, "complete": true},
  {"id": "general-liability",   "vfname": "GeneralLiability",   "status": 0, "complete": false},
  {"id": "occupations",         "vfname": "Occupations",        "status": 0, "complete": false},
  {"id": "coverage-area",       "vfname": "CoverageArea",       "status": 0, "complete": false},
  {"id": "pro-xtra",            "vfname": "ProXtra",            "status": 0, "complete": false},
  {"id": "background-check",    "vfname": "BackgroundCheck",    "status": 0, "complete": false},
  {"id": "profile",             "vfname": "Profile"},
  {"id": "login",               "vfname": "Login"}
];

let stepCount = stepStatus.length - 2;
let currentSection = 1;




// use if you need to wait until an element loads before doing something..
var waitForEl = function(selector, callback) {
  if (j$(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};




let gotoSection = function(section){
    let stepName = stepStatus[section].id;
    currentSection = section;

    //window.location = '#'+currentSection +'&'+statusHash; // add this section to hash in URL - so we can go keep track of where we are.

    console.log('go to section: '+section);
    console.log('statusHash: '+statusHash);

    if(section >= stepCount){ // if we're going to the Sign in or Profile page
      j$('#nav-wrapper').hide();
    }
    else{
      j$('#nav-wrapper').show();
    }

    j$('#sidenav-loader').fadeOut('fast');

    j$('.section-loader').hide();
    j$('#section-'+section+'-loader').fadeIn();

    j$('.sidenav-step').removeClass('selected');
    j$('body').find('.step-'+stepName).addClass('selected');

      j$(window).scrollTop(0);
    
};


function updateProgressBar(countCompleted){
    let percentComplete = 10;

    percentComplete = progressPercentages[countCompleted];
      
      console.log("#countCompleted: " + countCompleted);
      console.log("#percentComplete: " + percentComplete);

    j$(".progress-text").html(percentComplete+"% Completed");
    j$(".progress-indicator").css("width", percentComplete + "%");

}




function checkCompleted(){
    console.log("checking completed...statusHash: "+statusHash);

    // check the stepStatus array and count completed
    let countCompleted = j$.grep(stepStatus, function(val){
        return val.complete;
    }).length;

    // update progress bar based on completed
    updateProgressBar(countCompleted);

}




function changeStepStatus( step, newstatus ) {

  let newcomplete = false;

    if(newstatus === "1" || newstatus === "2"){
      newcomplete = true;
    }
   
    stepStatus[step].status = newstatus;
    stepStatus[step].complete = newcomplete;
    console.log("changing "+step+" step status to :"+stepStatus[step].status);
     
      let sectionID = stepStatus[step].id;
      let thisstatusClass = statusClass[newstatus];
      let thisstatusText = statusTypes[newstatus];
      
      j$(".step-"+sectionID).removeClass("notstarted inprogress complete action notification").addClass(thisstatusClass);
      j$(".step-"+sectionID).find(".sidenav-step-status").html(thisstatusText);
      let updatedHash = "";

      for (let i in stepStatus) {
        let thisstatus = stepStatus[i].status;

        if(i < stepCount){
          thisstatus = thisstatus.toString(); // convert to string so they can be concatenated
          updatedHash += thisstatus; 
        }
     }
     statusHash = updatedHash;

     checkCompleted();

}



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




// READ URL - pull section from hash - go to section - and set navigation status
function hashReader(){
  let hash = location.hash.replace("#", "");
    console.log("hash: "+hash);
  
  let splithash = hash.split("&");
  
  let section = splithash[0];
  let status = splithash[1];

  if(!section || section >= stepCount+2){
    console.log("no section in hash::: setting to default: 1");
     section = 1; // set to default;
  }
  
  if(!status || !j$.isNumeric(status)){
    console.log("no status listed in hash::: setting to default");
    status = "100000"; // set to default status
  }

  let splitstatus = status.split("");

        for (let i in stepStatus) {
          let thisstatus = splitstatus[i];

          if(thisstatus === undefined || thisstatus > statusTypes.length){
            console.log("changestepstatus for "+i+" : "+splitstatus[i]);
            thisstatus = 1;
          }
          if(i < stepCount){
            console.log(i + ": stepCount : "+stepCount);
            changeStepStatus(i, thisstatus);
          }
   }

    gotoSection(section); // remove in SALESFORCE

}



function showhideMenuOnResize() {
    j$(".header-dropdown").hide();
}



// REMOVE FOR SALESFORCE
function loadAllSections(){

  j$("#modal-loader").load("sections/modals.html"); 

  for (var i = stepStatus.length - 1; i >= 1; i--) {

        var thissection = stepStatus[i].id;

        j$("#section-"+i+"-loader").load("sections/"+thissection+".html"); 
     }

      

}


function initNav(){
    console.log('initiate Navigation');
    

    j$(window).scroll(function() {    
            let scroll = j$(window).scrollTop();
            let vpw = j$(window).width();
            let headerheight = 200;

          if(vpw > 768){
            headerheight = 175;
            if (scroll >= headerheight) {
                  j$(".sidenav").addClass("fixed");
              } 
              else {
                  j$(".sidenav").removeClass("fixed");
              }
          }
          else{
            if (scroll >= headerheight) {
                  j$(".sidenav-fixed").addClass("fixed");
              } 
              else {
                  j$(".sidenav-fixed").removeClass("fixed");
              }
               
          }
        
    });

    j$(window).resize(showhideMenuOnResize);

     // LEFT nav control
    j$(".app").on("click", ".sidenav-step", function(){
        let gotosection = j$(this).data("step");
      console.log("clicked on step: "+gotosection);
        gotoSection(gotosection);
    });



    j$(".app").on("click", ".header-toggle-menu", function(){
      j$(".header-dropdown").slideToggle("fast");
    });

    j$(".app").on("click", ".header-application-link", function(){
      gotoSection(1);
        j$(".header-dropdown").slideUp("fast");
        j$("#hamburger-icon").removeClass("active");

    });

    j$(".app").on("click", ".header-edit-profile-link", function(){
      gotoSection(6);
        j$(".header-dropdown").slideUp("fast");
        j$("#hamburger-icon").removeClass("active");
    });



    j$(".app").on("click", ".header-login-link", function(){
      gotoSection(7);
        j$(".header-dropdown").slideUp("fast");
        j$("#hamburger-icon").removeClass("active");
    });




    j$(".app").on("click", ".section-back-btn", function(){
        let gotosection = j$(this).data("target");
        console.log("go back to : "+gotosection);

        gotoSection(gotosection);
    });



    j$(".app").on("click", "#hamburger-icon", function(){
          j$(this).toggleClass("active");
          return false;
    });


        // Mark inputs as "filled" when users type - so we can keep the label up when they leave   
    j$(".app").on("input", ".input", function() {
        if (j$(this).val() !== "" && j$(this).val() !== null && j$(this).val().length > 0) {
            j$(this).parent().addClass("filled").removeClass('error');

        } else {
            j$(this).parent().removeClass("filled");
        }
    });

        
}






let pro = {};

pro.liability = false;

pro.ownerName = {};

pro.setUserName= function(first, last, middle){
  console.log('set user name: '+first, middle, last);
    this.ownerName.first = first;
    this.ownerName.middle = middle;
    this.ownerName.last = last;
    this.ownerName.fullname = first +' '+ middle +' '+ last;
    console.log('pro fullname: '+ pro.ownerName.fullname);
};


pro.businessName = '';
pro.dba = '';

pro.address = {
  // street,
  // city,
  // state,
  // zip,
};

pro.setUserAddress = function(street, city, state, zip){
  this.address.street = street;
  this.address.city = city;
  this.address.state = state;
  this.address.zip = zip;
    console.log('pro address: '+ pro.address);

};

pro.businessphone ='';
pro.mobile ='';
pro.email ='';

pro.coverage = {
  // zip:'',
  // radius:'',
};

pro.occupations = [ // Array of objects
// { 
//   occupation:'', 
//   state:'', 
//   license:'', 
//   licensenumber:'',
// },
];

pro.addOccupation = function(occ, state, license, num){
  this.occupations.push({
      occupation: occ, 
      state: state,
      license: license,
      licensenumber: num
    });
  console.log('pro occupations: '+ pro.occupations);
};

pro.proxtra = '';



/*
{
"liability":true,

"ownerName":{
  "first":"Nick",
  "middle":"Bobby",
  "last":"St.Hilaire",
  "fullname":"Nick Bobby St.Hilaire"
  },

"businessName":"",
"dba":"dfhdgfsfdgfg",

"address":{
  "street":"3256 Wyman Street",
  "city":"Oakland",
  "state":"CA",
  "zip":"94619"
  },

"businessphone":"",
"mobile":"",
"email":"",

"coverage":{
  "zip":"94619",
  "radius":"20"
},
"occupations":[
  {"occupation":"House-Cleaner","state":"CA","license":"No License Required","licensenumber":null},
  {"occupation":"House-Cleaner","state":"CO","license":"No License Required","licensenumber":null},
  {"occupation":"General Contractor","state":"AR","license":"Residential Remodeler","licensenumber":"789456156156"}],

"proxtra":"879456123"
}
*/




let proFirstName = '';
let proLastName = '';
let proBusinessName = '';
let proPhone = '';
let proEmail = '';
let confirmationVersion = false;


//  &firstname=Bobby
//  &lastname=McGee
//  &busname=Bobbys%20Landscaping
//  &phone=564654654
//  &email=65465454

function getShortFormInput(){
     console.log('pulling URL appendage data...');
     
     proFirstName = getUrlParameter('firstname');
     proLastName = getUrlParameter('lastname');
     proBusinessName = getUrlParameter('busname');
     proPhone = getUrlParameter('phone');
     proEmail = getUrlParameter('email');
     
      let confirmURL = getUrlParameter('confirm');
      if(confirmURL !== undefined){
        confirmationVersion = confirmURL;
      }


     if(proFirstName !== undefined && proFirstName !== ''){
        pro.firstname = proFirstName;
        
        waitForEl('#owner-firstname-input', function() {
          console.log('waiting for firstname input: '+proFirstName);
          j$('#owner-firstname-input').val(proFirstName).prop('readonly', true);

        });
     }
     if(proLastName !== undefined && proLastName !== ''){
           pro.lastname = proLastName;
           waitForEl('#owner-lastname-input', function() {
          console.log('waiting for lastname input: '+proLastName);
              j$('#owner-lastname-input').val(proLastName).prop('readonly', true);
          });
     }
     if(proBusinessName !== undefined && proBusinessName !== ''){
           pro.businessName = proBusinessName;
     }
     if(proPhone !== undefined && proPhone !== ''){
        pro.businessphone = proPhone;
        waitForEl('#proxtra-phone', function() {
              j$('#proxtra-phone').val(proPhone);
              j$('#proxtra-phone').parent().addClass('filled');
          });
     }
     if(proEmail !== undefined && proEmail !== ''){
        pro.email = proEmail;
     }

     console.log(':: from URL: proFirstName: '+proFirstName);
     console.log(':: from URL: proLastName: '+proLastName);
     console.log(':: from URL: proBusinessName: '+proBusinessName);
     console.log(':: from URL: proPhone: '+proPhone);
     console.log(':: from URL: proEmail: '+proEmail);

     console.log(':: from URL: confirm: '+confirmationVersion);
    
}





var requirements = [
  {
    STATE: 'AK',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Electrical Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Specialty Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Electrical Administrator License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Administrator is also accepted.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Residential Plumbing and Hydronic Heating (RPHH) License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Painting Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'General Contractor – Handyman License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Handymen License is the minimum requirement.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'General Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'General Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Landscaping Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Carpentry Contractor,Rough License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Carpentry Contractor,Finish License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Carpentry Contractor,Rough License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Concrete and Paving Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Masonry Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AL',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'http://www.aecb.state.al.us/licensee.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AL',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'http://www.pgfb.state.al.us/inquiry.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AL',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://alhob.glsuite.us/GLSuiteweb/clients/alhob/public/LicenseeSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AL',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://alhob.glsuite.us/GLSuiteweb/clients/alhob/public/LicenseeSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AL',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://alhob.glsuite.us/GLSuiteweb/clients/alhob/public/LicenseeSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.ark.org/labor/electrician/search.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'http://adhplumbinghvacrlookup.arkansas.gov/ProtectiveHealthCodesLicensees/Show-ProtectiveHealthCodesLicensees-Table.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Painting, Wallcovering (Specialty Classification)',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Painting, Wall Covering (Specialty Classification) is the minimum requirement.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Remodeler is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Remodeler is the minimum requirement.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Carpentry, Framing, Milwork, Cabinet (Specialty Classification)',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Carpentry, Framing, Milwork, Cabinet (Specialty Classification) is the minimum requirement.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Remodeler is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Remodeler is the minimum requirement.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Concrete (Specialty Classification)',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Concretet & Masonry (Specialty Classification) is the minimum requirement.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Masonry (Specialty Classification)',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Concretet & Masonry (Specialty Classification) is the minimum requirement.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Remodeler is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'CR-11-Electrical Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. CR-11 Electrical Contractor License is also accepted.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'CR-37 Plumbing Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'CR-34 Painter and Wall Covering License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'R-62-Minor Home Improvements',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. R-62 is the minimum license required.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B-3-General Remodeling and Repair Contractor',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-3 License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'KB-1 Dual Building Contractor',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. KB-1 Dual Building Contractor is also accepted.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'KB-2 Dual Residential Contractor',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. KB-2 Dual Residential Contractor is also accepted.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B License is the minimum license required.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B-3-General Remodeling and Repair Contractor',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-3 License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'KB-1 Dual Building Contractor',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. KB-1 Dual Building Contractor is also accepted.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'KB-2 Dual Residential Contractor',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. KB-2 Dual Residential Contractor is also accepted.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'CR-21 Landscaping and Irrigation/ Fencing License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Landscaper',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'CR-61 Carpentry Remodeling and Repairs',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'CR-7 Carpentry',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'CR-63 Appliance License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'CR-31 Masonry',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'R-09 Concrete',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'C-10 Electrical Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'C-36 Plumbing Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'C-33 Painting and Decorating Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'B General Building Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'B General Building Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'C-27 Landscaping Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'C-5 Framing and Rough Carpentry License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-5 Framing and Rough Carpentry License is the minimum requirement.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'C-6 Cabinet , Milwork and Finish Carpentry License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-6 Cabinet, Milwork and Finish Carpentry License is the minimum requirement.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'California Major Appliance Repair License',
    VALIDATION: 'http://www2.dca.ca.gov/pls/wllpub/wllqryna$lcev2.startup?p_qte_code=SRD&p_qte_pgm_code=3900',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'D-41 Siding and Decking Contractors License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'C-29 Masonry License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-29 Mansonry License is the minimum requirement.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'C-8 Concrete Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-8 Concrete License is the minimum requirement'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B General Building Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'CO',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'CO',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'CO',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'CO',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'E-1 Unlimited Electrical Contractor License',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. E-1 Unlimited Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'P-1 Unlimited Plumbing Contractor License',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. P-1 Unlimited Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'E-1 Unlimited Electrical Contractor License',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. E-1 Unlimited Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'E-2 Unlimited Journeyman Electrician License',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. E-2 Unlimited Journeyman Electrician License is also accepted.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://www.asisvcs.com/services/licensing/DCOPLA/search_page.asp?CPCAT=3609STATEREG',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.asisvcs.com/services/licensing/DCOPLA/search_page.asp?CPCAT=3609STATEREG',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://www.asisvcs.com/services/licensing/DCOPLA/search_page.asp?CPCAT=3609STATEREG',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://www.asisvcs.com/services/licensing/DCOPLA/search_page.asp?CPCAT=3609STATEREG',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'Refrigeration/AC Limited',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Refrigeration/AC Limited License is the minimum requirement.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DE',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://dpronline.delaware.gov/mylicense weblookup/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'DE',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://dpronline.delaware.gov/mylicense weblookup/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'DE',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'MSE-Master Special Electrician License',
    VALIDATION: 'https://dpronline.delaware.gov/mylicense weblookup/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Special Electrician License is also accepted.'
  },
  {
    STATE: 'DE',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://dpronline.delaware.gov/mylicense weblookup/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'DE',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://dpronline.delaware.gov/mylicense weblookup/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'DE',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'BL-Business License',
    VALIDATION: 'http://revenue.delaware.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Certified Electrical License',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Certified Plumbing License',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Certified General Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified General Contractor License is the minimum requirment.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Residential Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Residential Contractor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Building Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Building Contracor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Certified General Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified General Contractor License is the minimum requirment.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Residential Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Residential Contractor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Building Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Building Contracor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Certified General Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified General Contractor License is the minimum requirment.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Residential Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Residential Contractor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Building Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Building Contracor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Certified General Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified General Contractor License is the minimum requirment.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Residential Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Residential Contractor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Building Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Building Contracor License is also accepted.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License Non Restricted',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor Non Restricted is the minimum requirement.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Electrical Contractor License Restricted',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor Restricted is also accepted.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License Non-Restricted',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License Non Restricted is the minimum requirement.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License Restricted',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License Restricted is also accepted.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Residential Basic',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Basic License is the minimum requirement. The following are acceptable Residential Basic Licenses:(RBI) Residential Basic Individual, (RBQA) Residential Basic Qualifying Agent, and (RBCO)Residential Basic Company.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Light',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential/Light Commercial License is also accepted. The following are acceptable Residential Light Licenses: (RLCI) Residential Light Commercial Individual and (RLQA) Residential Light Qualifying Agent.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'General Contractor',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. General Contractor License is also accepted.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Residential Basic',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Basic License is the minimum requirement. The following are acceptable Residential Basic Licenses:(RBI) Residential Basic Individual, (RBQA) Residential Basic Qualifying Agent, and (RBCO)Residential Basic Company.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Light',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential/Light Commercial License is also accepted. The following are acceptable Residential Light Licenses: (RLCI) Residential Light Commercial Individual and (RLQA) Residential Light Qualifying Agent.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'General Contractor',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. General Contractor License is also accepted.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Residential Basic',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Basic License is the minimum requirement. The following are acceptable Residential Basic Licenses:(RBI) Residential Basic Individual, (RBQA) Residential Basic Qualifying Agent, and (RBCO)Residential Basic Company.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Light',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential/Light Commercial License is also accepted. The following are acceptable Residential Light Licenses: (RLCI) Residential Light Commercial Individual and (RLQA) Residential Light Qualifying Agent.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'General Contractor',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. General Contractor License is also accepted.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'C-13 Electrical Contractor License',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'C-37 Plumbing Contractor License',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'C-33 Painting and Decorating Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is also accepted.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'C-27 Landscaping Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Landscaper',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is also accepted.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'C-6 Carpentry Framing Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-6 Framing and Rough Carpentry License is the minimum requirement.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'C-5 Cabinet,Milwork, and Carpentry Remodeling and Repairs',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-5 Cabinet, Milwork and Finish Carpentry License is the minimum requirement.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is also accepted.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'C-31 Masonry Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-31- Masonry Contractor License is the minimum requirement .'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'C-31a Cement Concrete Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-31a- Cement Concrete Contractor License is the minimum requirement.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is also accepted.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://web.dbs.idaho.gov/etrakit3/Custom/Idaho_LicenseSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://web.dbs.idaho.gov/etrakit3/Custom/Idaho_LicenseSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://web.dbs.idaho.gov/etrakit3/Custom/Idaho_LicenseSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://web.dbs.idaho.gov/etrakit3/Custom/Idaho_LicenseSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Registered Individual Contractor (RCT)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Individual Contractor (RCT) is the minimum requirement.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Registered Entity Contractor (RCE)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Entity Contractor (RCE) is also acceptable'
  },
  {
    STATE: 'ID',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Registered Individual Contractor (RCT)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Individual Contractor (RCT) is the minimum requirement.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Registered Entity Contractor (RCE)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Entity Contractor (RCE) is also acceptable'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Registered Individual Contractor (RCT)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Individual Contractor (RCT) is the minimum requirement.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Registered Entity Contractor (RCE)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Entity Contractor (RCE) is also acceptable'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Registered Individual Contractor (RCT)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Individual Contractor (RCT) is the minimum requirement.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Registered Entity Contractor (RCE)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Entity Contractor (RCE) is also acceptable'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'General Remodel Contractor License',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IL',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://plumblicv5pub.dph.illinois.gov/Clients/ILDOHPlumb/Public/Verification/Plumber_License_Verification.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IN',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://mylicense.in.gov/everification/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'KY',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://ky.joportal.com/License/Search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'KY',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://ky.joportal.com/License/Search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'KY',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://ky.joportal.com/License/Search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'KY',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://ky.joportal.com/License/Search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Work (StateWide)',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Must have \'Electrical Work (StateWide)\' classification.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumbing License',
    VALIDATION: 'http://www.spbla.com/rosters-v3/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. \'Master Plumber License\' must be from the State Plumbing Board of Louisiana.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Home Improvement Contractor Registration is the minimum requirement.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential License',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Building Contactor License is also acceptable'
  },
  {
    STATE: 'LA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Home Improvement Contractor Registration is the minimum requirement.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential License',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Building Contactor License is also acceptable'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Building Construction License',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://elicensing.state.ma.us/CitizenAccess/GeneralProperty/PropertyLookUp.aspx?isLicensee=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://elicensing.state.ma.us/CitizenAccess/_SearchaLicense.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://services.oca.state.ma.us/hic/licenseelist.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://services.oca.state.ma.us/hic/licenseelist.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://services.oca.state.ma.us/hic/licenseelist.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://services.oca.state.ma.us/hic/licenseelist.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://services.oca.state.ma.us/hic/licenseelist.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://services.oca.state.ma.us/hic/licenseelist.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_Search/OP_search.cgi?calling_app=ME::ME_registration_num',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=PLM::PLM_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ME',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.pfr.maine.gov/almsonline/almsquery/welcome.aspx?board=4220',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'ME',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://www.pfr.maine.gov/almsonline/almsquery/welcome.aspx?board=4220',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Special Electrician License is also accepted.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://aca3.accela.com/lara/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://aca3.accela.com/lara/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Maintenance & Alteration License (J-Painting & Decorating)',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Maintenance & Alteration (J-Painting & Decorating) classification is the minimum requirement.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder License',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Residential Builder License',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Maintenance & Alteration License (A-Carpentry)',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Maintenance & Alteration (A-Carpentry) classification is the minimum requirement.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder License',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Residential Builder License',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Maintenance & Alteration License (I-Masonry)',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Maintenance & Alteration (I-Masonry) classification is the minimum requirement.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Maintenance & Alteration License (B-Concrete)',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Maintenance & Alteration (B-Concrete) classification is the minimum requirement.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder License',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'MN',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master (A) Electrician',
    VALIDATION: 'https://secure.doli.state.mn.us/lookup/licensing.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MN',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://secure.doli.state.mn.us/lookup/licensing.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MN',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Residential Building Contractor',
    VALIDATION: 'https://secure.doli.state.mn.us/lookup/licensing.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MN',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Residential Building Contractor',
    VALIDATION: 'https://secure.doli.state.mn.us/lookup/licensing.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MN',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Residential Building Contractor',
    VALIDATION: 'https://secure.doli.state.mn.us/lookup/licensing.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://arls-public.ncbeec.org/Public/Search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'PU(Electrical-Ahead of P.O.D)',
    VALIDATION: 'https://arls-public.ncbeec.org/Public/Search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. PU(Electrical-Ahead of P.O.D) is also acceptable.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://onlineweb.nclicensing.org/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Plumbing Class I License',
    VALIDATION: 'https://onlineweb.nclicensing.org/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Class I License is also accepted.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Plumbing Class II License',
    VALIDATION: 'https://onlineweb.nclicensing.org/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Class II License is also accepted.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Residential Contractor License',
    VALIDATION: 'http://www.nclbgc.org/lic_fr.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Building Contractor License',
    VALIDATION: 'http://www.nclbgc.org/lic_fr.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.Building Contractor License is also accepted.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Residential Contractor',
    VALIDATION: 'http://www.nclbgc.org/lic_fr.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Building Contractor',
    VALIDATION: 'http://www.nclbgc.org/lic_fr.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Building Contractor License',
    VALIDATION: 'http://www.nclbgc.org/lic_fr.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.ndseb.com/index.php?id=70',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Contractor License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Contractor License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Contractor License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Contractor License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Contractor License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Contractor License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'http://www.nebraska.gov/sed/search/index.cgi',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'A Master Electrician License',
    VALIDATION: 'http://www.nebraska.gov/sed/search/index.cgi',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. A Master Electrician License is also accepted.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B Master Electrician License',
    VALIDATION: 'http://www.nebraska.gov/sed/search/index.cgi',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B Master Electrician License is also accepted.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NH',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrical License',
    VALIDATION: 'https://nhlicenses.nh.gov/verification/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'NH',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://nhlicenses.nh.gov/verification/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is the minimum requirement.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is the minimum requirement.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'GB 98- General Building',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GB-98 is the minimum requirement.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'GB-2-Residential Building',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GB-2 is also accepted.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'GB 98- General Building',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GB-98 is the minimum requirement.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'GB-2-Residential Building',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GB-2 is also accepted.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'GB 98- General Building',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GB-98 is also accepted.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'GS-29-Fixtures,cabinet and milwork',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GS 29 is the minimum requirement.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'GB 98- General Building',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'GS-16- Masonry',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GS-16 license is the minimum requirement.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'GS-4-Concrete, cement, walkwayss and driveways',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GS-4 license is the minimum requirement.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'C-2 Electrical Contracting License',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'C-1 Plumbing and Heating License',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'C-4 Painting and Decorating',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'C-10 Landscaping Contracting',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'C-3 Carpentry, Maintenance and Mirrors Repair',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'OH',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://elicense4.com.ohio.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'OH',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://elicense4.com.ohio.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'OH',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'Refrigeration Contractor License',
    VALIDATION: 'https://elicense4.com.ohio.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'OK',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'http://cibverify.ok.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'OK',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor',
    VALIDATION: 'http://cibverify.ok.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Must have both, (Building Codes Division) License and CCB License Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Must have both, (Building Codes Division) License and CCB License Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor. Must have Lead-Based Paint Renovation License(LBPR).'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Perito Electricista',
    VALIDATION: 'https://pr.pcshq.com/lookup/en/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Maestro Plomero',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Registro de Contratista: Pintura',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Registro de Contratista: Construcción General',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Registro de Contratista: Construcción General',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Registro de Contratista: Carpintería',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Registro de Contratista: Construcción General',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Registro de Contratista: Construcción General',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Registro de Contratista: Construcción General',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Contractors License(Residential)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Contractors License(Commercial)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Commercial Contractor License is also accepted.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Contractors License(Residential)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Contractors License(Commercial)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Commercial Contractor License is also accepted.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Contractors License(Residential)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Contractors License(Commercial)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Commercial Contractor License is also accepted.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'Contractors License(Residential)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Contractors License(Commercial)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Commercial Contractor License is also accepted.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Contractors License(Residential)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Contractors License(Commercial)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Commercial Contractor License is also accepted.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Contractors License(Residential)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Contractors License(Commercial)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Commercial Contractor License is also accepted.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Painters/Wall Paper Hange Specialty License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Carpenters Specialty License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Mason Specialty Contractor Liense',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SD',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'Call 605-773-3573 for Electrical License Verification',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is the minimum requirement.'
  },
  {
    STATE: 'SD',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'Call 605-773-3429 for Plumbers License Verification',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contracting License (CE)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contracting License is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Limited Licensed Electrician License (LLE)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Limited Licensed Electrician is also accepted'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Limited Licensed Plumber License (LLP)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Limited Licensed Plumber is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Plumbing and Gas Piping License (CMC-A)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing and Gas Piping License is also accepted.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement License',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Home Improvement Contractor License is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Building Construction License (BC-A)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Building Construction License is also accepted.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Limited Residential Construction License (BC-A/r)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Limited Residential Construction License is also acceptd.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement License',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Home Improvement Contractor License is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Building Construction License (BC-A)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Building Construction License is also accepted.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Limited Residential Construction License (BC-A/r)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Limited Residential Construction License is also acceptd.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement License',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Home Improvement Contractor License is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Building Construction License (BC-A)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Building Construction License is also accepted.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Limited Residential Construction License (BC-A/r)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Limited Residential Construction License is also acceptd.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement License',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Home Improvement Contractor License is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Building Construction License (BC-A)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Building Construction License is also accepted.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Limited Residential Construction License (BC-A/r)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Limited Residential Construction License is also acceptd.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Building Construction Contractor License',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://www.tdlr.texas.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contracting License is the minimum requirement'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.tdlr.texas.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://vo.licensing.hpc.texas.gov/datamart/selSearchType.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'RAIC - Residential Appliance Installation Contractor License',
    VALIDATION: 'https://www.tdlr.texas.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. RAIC License is the minimum requirement.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'RAI - Residential Appliance Installer',
    VALIDATION: 'https://www.tdlr.texas.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Appliance installer license is also accepted.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Home Irrigation Pro',
    REQUIRED: 'YES',
    LICENSE: 'Landscape Irrigator License',
    VALIDATION: 'http://www2.tceq.texas.gov/lic_dpa/index.cfm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Low Voltage Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://www.tdlr.texas.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contracting License is the minimum requirement'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Low Voltage Pro',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.tdlr.texas.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Security System Pro',
    REQUIRED: 'YES',
    LICENSE: 'Alarms System Installer License',
    VALIDATION: 'https://tops.portal.texas.gov/psp-self-service/search/index',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Local Movers',
    REQUIRED: 'YES',
    LICENSE: 'Household Goods Carrier License',
    VALIDATION: 'https://apps.txdmv.gov/apps/mccs/truckstop/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Locksmith',
    REQUIRED: 'YES',
    LICENSE: 'Locksmith License',
    VALIDATION: 'https://tops.portal.texas.gov/psp-self-service/search/index',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Pest Control Pro',
    REQUIRED: 'YES',
    LICENSE: 'Structural Pest Control License',
    VALIDATION: 'http://texasagriculture.gov/regulatoryprograms/structuralpestcontrolservice/pestcontrolbusinesslicenseewebsearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Home Inspector',
    REQUIRED: 'YES',
    LICENSE: 'Professional Real Estate Inspector License',
    VALIDATION: 'https://www.trec.texas.gov/apps/license-holder-search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'S-200 General Electrical Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. S-200 License is the minimum requirement.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'S-201 Residential Electrical Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. S-201 is also acceptable.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'S-210 General Plumbing Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html;jsessionid=c7156693f364c163512d846b0741',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. S-210 License is the minimum requirement.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'S-217 Residential Plumbing Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html;jsessionid=c7156693f364c163512d846b0741',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. S-217 is also acceptable'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'S-300 General Painting Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Handyman Exemption Registration',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Handyman Excemption is the required minimum.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'R100 Residential and Small Commercial',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B100 General Building Contractor is also acceptable.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B100 General Building Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. R100 Residential and Small Commercial is also acceptable.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'R100 Residential and Small Commercial',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. R100 Residential and Small Commercial is the required minimum'
  },
  {
    STATE: 'UT',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B100 General Building Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B100 General Building Contractor is also acceptable.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'S-330 Landscaping Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'S-220 Carpentry Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'B100 General Building Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'S-290 General Masonry Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'S-261 Concrete Form Setting and Shoring Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'PTC- Painting and wallcovering contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. PTC License is the minimum requirement.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'CBC-Commercial Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. CBC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'RBC-Residential Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. RBC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'HIC-Home Improvement Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. HIC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'CIC-Commmercial Improvement Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. CIC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'HIC-Home Improvement License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. HIC is the minimum requirement.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'RBC-Residential Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. RBC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'RBC-Residential Building License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. RBC License is the minimum requirement.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'CBC-Commercial Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. CBC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'HIC-Home Improvement License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. HIC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'LSC-Landscape Service Contracting',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'ISC- Landscape Irrigation Contracting',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'RBC-Residential Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'HIC-Home Improvement License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'RBC-Residential Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'RBC-Residential Building License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'CBC-Commercial Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VT',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'http://firesafety.vermont.gov/building_trades',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VT',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'http://firesafety.vermont.gov/building_trades',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Plumbing Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Plumbing) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Painting and Wall Covering Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Painting and Wall Covering Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Handyman)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Handyman Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Landscaping Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Landscaping Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Landscaper',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Cabinets, Milwork and Finish Carpentry)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Cabinets, Milwork and Finish Carpentry Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Framing and Rough Carpentry Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Framing and Rough Carpentry Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Appliances Equipment Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Appliances Equipment Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Framing and Rough Carpentry Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Framing and Rough Carpentry Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Concrete Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Concrete Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Masonry Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Masonry Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is the minimum requirement.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is the minimum requirement.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Dwelling Contractor License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Dwelling Contractor License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Dwelling Contractor License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Dwelling Contractor License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Dwelling Contractor License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: '015-Painting License',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. 015-Painting License is the minimum requirement.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B-General Building',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'H-Residential',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. H-Residential License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is the minimum requirement.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'H-Residential',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. H-Residential License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'Landscaping License-003',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. 003-License is the minimum requirement.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is the minimum requirement.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'H-Residential',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. H-Residential License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: '083-Decks',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. 083 license is the minimum requirement.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B-General Building',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'H-Residential',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. H-Residential License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WY',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'Call the Electrical Safety Division at 307-777-7288, or email Lynette Paxton (lynette.paxton@wyo.gov) or Lynn Devilbiss (lynn.devilbiss@wyo.gov).',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'WY',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'Call the Electrical Safety Division at 307-777-7288, or email Lynette Paxton (lynette.paxton@wyo.gov) or Lynn Devilbiss (lynn.devilbiss@wyo.gov).',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  }
];


var found_reqs = j$.grep(requirements, function(v) {
    return v.STATE === "WY" && v.VERTICAL === "Electrician";
});

console.log(found_reqs);



function openModal(whichModal){
    console.log("show modal...."+whichModal);
    j$(whichModal).addClass("open");
    j$("body").addClass("noScroll");
}

function closeModal(){
    j$(".pr-modal.open").removeClass("open");
    j$("body").removeClass("noScroll");
}



function initCheckboxes(){



    let zipcheckboxes = j$(".zipOption"),
        citycheckall = j$(".cityOption"),
        statecheckall = j$(".stateOption");

    citycheckall.on("click", function() {
      zipcheckboxes.prop("checked", this.checked);
    });


    statecheckall.on("click", function() {
        citycheckall.prop("checked", this.checked);
        zipcheckboxes.prop("checked", this.checked);
    });


   
  j$(".app").on("click", "#services-selectall", function(){
    j$("#services-list").find(".checkbox input").each(function() {
              this.checked = true;
            });
  });
   
  j$(".app").on("click", "#services-clearall", function(){
    j$("#services-list").find(".checkbox input").each(function() {
              this.checked = false;
            });
  });

  j$(".app").on("click", ".nested input", function(){
      console.log("Click!");
          let parentlists = j$(this).parent().parent().parent().siblings(".nested");
          let nestedlist = j$(this).parent().siblings(".nested-list");
          console.log("nestedlist : "+nestedlist.length);
          console.log("parentlists : "+parentlists.length);
    
    if(this.checked){
      console.log("check! look for child checkboxes");
          if(nestedlist.length){
            j$(nestedlist).find(".nested input").each(function() {
              this.checked = true;
            });
          }
          if(parentlists.length){
            j$(parentlists).find("input").each(function() {
              this.checked = true;
            });
          }

    }
    else{
      console.log("UNcheck!");
        if(nestedlist.length){
            j$(nestedlist).find(".nested input").each(function() {
              this.checked = false;
            });
          }
          // if there"s a parent - and it doesn"t have siblings
         if(parentlists.length){
            j$(parentlists).find("input").each(function() {
              this.checked = false;
            });
          }
    }
  });
}


function initModals(){


     j$(".app").on("click", ".link-to-modal", function(){
          let gotomodal = j$(this).data("target");
          openModal(gotomodal);
     });


      j$(".app").on("click", ".modal-close-btn", function(){
          closeModal();
     });
       
          
    j$('.app').on('click', '#modal-btn-Close', function() {
        closeModal();
    });

// ESCAPE KEY close modal
    j$(document).keyup(function(e) { 
        if (e.keyCode === 27) { 
            closeModal();
        } 
    });


  

    j$(".app").on("click", ".pr-modal-backdrop", function(){
      closeModal();
    });


    j$(".app").on("click", ".pr-modal-radios .radio", function(){
        j$(".pr-modal-radios .radio.selected").removeClass("selected");
        j$(this).addClass("selected").find(".radio-license-option").prop( "checked", true );

    });




}


  




let usrFirstName = '';
//let usrMiddleName = '';
let usrLastName = '';
let liabilityUploaded = false;

if(usrFirstName === undefined || usrFirstName === ''){
      usrFirstName = "Testy";
      usrLastName = "Testerson";
  }

let userName = usrFirstName + ' ' + usrLastName;


let deleteUpload = function(){
    j$('#file-uploaded-container').hide();
    j$('#liability-upload-container').show();
    j$('.uploader-container').removeClass('active success');
    j$('#liability-dba').hide();

    j$('#file-upload-spinner').show();
    j$('#file-upload-details').hide();
    liabilityUploaded = false;

};



// DRAG/DROP and Upload

  function uploadFile(files, uploader) {

    let upContainer = uploader; // uploader-container
    let upPreview = upContainer.find('.upload-preview');
    let upMsg = upContainer.find('uploader-message');
    let upForm = upContainer.find('.uploader-form');
    let upData = upContainer.find('.uploader-data');
    
      let file = files;
      let imageType = /image\/.*|application\/pdf/; // - /image.*/;

      let fr = new FileReader();
      fr.fileName = file.name;

      if (file.type.match(imageType)) {
          console.log('File Supported...uploading....'+file.type);
          upMsg.html('Uploading...');
          liabilityUploaded = true;
              j$('.uploader-message').removeClass('error');
              j$('#file-uploaded-container').show();
              j$('#liability-upload-container').hide();

               setTimeout(function() {
                j$('#liability-dba').css('display', 'flex');
                j$('#uploaded-filename').text(fr.fileName);
                j$('#business-name-input').focus();

                j$('#file-upload-spinner').hide();
                j$('#file-upload-details').show();
                j$('#liability-section-footer').delay(500).fadeIn('slow');

                    setTimeout(function() {
                       j$('html, body').animate({
                        scrollTop: j$('#liability-dba').offset().top - 80
                      }, 500);

                    }, 800);

              }, 1500);


          fr.onload = function(e) {
              let result = e.target.result;
              let html = '<input type="hidden" name="data" value="' + result.replace(/^.*,/, '') + '" >';
              html += '<input type="hidden" name="mimetype" value="' + result.match(/^.*(?=;)/)[0] + '" >';
              html += '<input type="hidden" name="filename" value="' + e.target.fileName + '" >';
              html += '<input type="hidden" name="username" value="' + userName + '" >';
              upData.empty().append(html);

              upPreview.innerHTML = "";

              let img = new Image();
              img.src = fr.result;

              upPreview.append(img);
              
          };
          fr.onloadend = function(){
              upForm.submit();
          };
          fr.readAsDataURL(file);
          
      } 
      else {
        upMsg.html("Please select a .jpg, .png, or .pdf file.");
      }

}

let liabilityComplete = false;

function validateLiability(){
  console.log('validate Liability ...');

    let dbaComplete = false,
        dbaInput = j$('#business-name-input'),
        dba = dbaInput.val(),
        dbaContainer = dbaInput.parent();

        if(dba.length > 4){
            dbaComplete = true;
        }


        if(dbaComplete && liabilityUploaded){
          console.log('Liability Complete!');
            dbaContainer.removeClass('error');
            j$('.uploader-message').removeClass('error');
            liabilityComplete = true;
            
            pro.liability = true;
            pro.dba = dba;
            console.log('set pro.liability to: '+pro.liability);
            console.log('set pro.dba to '+pro.dba);
            
            changeStepStatus(1, '2');
            return true;
        }
        else{
            if(!liabilityUploaded){
              j$('.uploader-message').addClass('error');
            }
            else{
              j$('.uploader-message').removeClass('error');
            }

            if(!dbaComplete){
                dbaContainer.addClass('error');
            }
            else{
                dbaContainer.removeClass('error');
            }
            liabilityComplete = false;
            return false;

        }

}
function initGeneralLiability(){


    j$(".app").on("click", "#liability-submit", function(){

      if(validateLiability()){
             console.log("show hang on modal...");

            openModal("#pr-modal-HangOnGL");

              setTimeout(function() {
                  gotoSection(2);
                  if(confirmationVersion === 'true'){
                    j$('#section-general-liability').hide();
                    j$('#section-nextsteps-liability').show();
                  }
                  setTimeout(function(){
                    closeModal();
                  }, 800);
            }, 2500);

        }
        else{
            console.log('error....');
        }

    });



    j$(".app").on("click", ".link-to-nextinsurance", function(){
      console.log("click insurance");
          window.open("https://www.next-insurance.com/", "_blank");
    });



    j$('.app').on('click', '#no-liability-checkbox', function(){
      if(j$('#no-liability-checkbox').is(":checked")) {
            deleteUpload();
            j$('#liability-section-footer').hide();

            j$('#no-liability-msg').slideDown('fast');
             j$('#liability-shop').slideDown('fast');
             j$('#liability-upload-container').fadeTo( "fast" , 0.5);
             j$('.uploader-button').prop("disabled", true);
       }
       else{
            j$('#no-liability-msg').slideUp('fast');
            j$('#liability-shop').slideUp('fast');
             j$('#liability-upload-container').fadeTo( "fast" , 1);
             j$('.uploader-button').prop("disabled", false);
       }
    });


    j$('.app').on('click', '#delete-upload-file-btn', function(event){
      event.preventDefault();  
            event.stopPropagation();
      deleteUpload();
    });


    j$('.app').on('change', '.uploader-input', function() {
        let upContainer = j$(this).parent().parent().parent(); // uploader-container

          console.log('selecting file to upload');
  
          let file = this.files[0];

          if (file) {
              uploadFile(file, upContainer);
              console.log('filename: '+file.name);
          }
          else {
              // Perhaps some kind of message here
          }

            j$(this).removeClass('active');
            j$(this).addClass('success');
            console.log("Uploaded!");
        });


    // j$('.app').on('change', '.uploader-input', function() {
    //     let upContainer = j$(this).parent().parent().parent(); // uploader-container
    //     let upPreview = upContainer.find('.upload-preview');
    //     let upMsg = upContainer.find('uploader-message');
    //     let upForm = upContainer.find('.uploader-form');
    //     let upData = upContainer.find('.uploader-data');
        
    //       let file = this.files[0];
    //       let imageType = /image\/.*|application\/pdf/; // - /image.*/;


    //       let fr = new FileReader();
    //       fr.fileName = file.name;
          
    //       if (file.type.match(imageType)) {
    //           console.log('File Supported');
    //            upMsg.html("");

    //           liabilityUploaded = true;
    //           j$('.uploader-message').removeClass('error');
    //           j$('#file-uploaded-container').show();
    //           j$('#liability-upload-container').hide();

    //            setTimeout(function() {
    //             j$('#liability-dba').css('display', 'flex');
    //             j$('#business-name-input').focus();
    //             j$('#uploaded-filename').text(fr.fileName);

    //             j$('#file-upload-spinner').hide();
    //             j$('#file-upload-details').show();
    //             j$('#liability-section-footer').delay(500).fadeIn('slow');

    //                 setTimeout(function() {
    //                    j$('html, body').animate({
    //                     scrollTop: j$('#liability-dba').offset().top - 80
    //                   }, 500);

    //                 }, 800);

    //           }, 1500);



    //           fr.onload = function(e) {
    //               let result = e.target.result;
    //               let html = '<input type="hidden" name="data" value="' + result.replace(/^.*,/, '') + '" >';
    //               html += '<input type="hidden" name="mimetype" value="' + result.match(/^.*(?=;)/)[0] + '" >';
    //               html += '<input type="hidden" name="filename" value="' + e.target.fileName + '" >';
    //               html += '<input type="hidden" name="username" value="' + userName + '" >';
    //               upData.empty().append(html);

    //               upPreview.innerHTML = "";

    //               let img = new Image();
    //               img.src = fr.result;

    //               upPreview.append(img);
    //           };
    //           fr.onloadend = function(){
    //               upForm.submit();
    //           };
    //           fr.readAsDataURL(file);
    //       } 
    //       else {
    //         upMsg.html("Please select a .jpg, .png, or .pdf file.");
    //       }
          
    //   });


      j$('.app').on('submit', '.uploader-form', function(){
        let upContainer = j$(this).parent(); // uploader-container
        let upLoader = upContainer.find('.loader');
        let upSuccess = upContainer.find('.success-check');
        let upButton = upContainer.find('.upload-btn-text');

          j$.ajax({
              url: j$(this).attr('action'),
              type: 'POST',
              data : j$(this).serialize(),
              success: function(){
                  console.log('form submitted.');
                  upContainer.addClass('success');
                  j$('.uploader-message').text('');
              },
              beforeSend: function(){
              // Code to display spinner
                  console.log('uploading....');
                  upLoader.addClass('active');
                  upContainer.addClass('active');
                  //mixpanel.track("GL UPLOADER - uploading"); 

              },
              complete: function(){
                  // Code to hide spinner.
                  console.log('complete.');
                  upLoader.removeClass('active');
                  upSuccess.addClass('active');
                  upButton.text('Change File');
                  liabilityUploaded = true;
                  //mixpanel.track("GL UPLOADER - complete"); 
              }


          });
          return false;
      });



      j$('.app').on('dragover', '.uploader-container', function(event) {
            event.preventDefault();  
            event.stopPropagation();
            j$(this).addClass('active');
            console.log("drag detected");
       });

      j$('.app').on('dragleave', '.uploader-container', function(event) {
            event.preventDefault();  
            event.stopPropagation();
            j$(this).removeClass('active');
            console.log("stop drag");
        });

      j$('.app').on('drop', '.uploader-container', function(event) {

          console.log('File dropped');
        
          event.preventDefault();// Prevent default behavior (Prevent file from being opened)

          let dt = event.dataTransfer || (event.originalEvent && event.originalEvent.dataTransfer);
          let files = event.target.files || (dt && dt.files);
          if (files) {
              uploadFile(files[0], j$(this));
              console.log('filename: '+files[0].name);
          }
          else {
              // Perhaps some kind of message here
          }

            j$(this).removeClass('active');
            j$(this).addClass('success');
            console.log("Dropped!");
        });

}


let occupationsComplete = false,
    selectedState = '',
    selectedService = '',
    hasRequirements = false,
    numberofOccupationsAdded = 0,
    podLimit = 6,
    userLicenses = [];


function collectUserLicenseData(){

  console.log('collect License Data...add to array');
    userLicenses = []; // clear any previously added licenses

    let noLicenseRequiredItems = j$('.occupation-listitem[data-licensereq="false"]');
    console.log('noLicenseRequiredItems '+noLicenseRequiredItems.length);
    pro.occupations = []; // clear any occupations already added - so we can be sure we don't have duplicates

    j$.each(noLicenseRequiredItems, function (index) {
        let stateVal = j$(this).data('state');
        let occVal = j$(this).data('occ');
        let licenseType = 'No License Required';
        let licenseNumber = '';

        console.log('adding Occupations with NO LICENSE REQUIRED');
        console.log(index + ' / state:'+stateVal+ ' / occupation:'+occVal+ ' / licenseType:'+licenseType);
        userLicenses.push({state: stateVal,  occupation:  occVal, licensetype: licenseType});

        pro.addOccupation(occVal, stateVal, licenseType, licenseNumber); // add to user object
        console.log('userLicenses[0]: '+userLicenses[index].licensetype);
        console.log('userLicenses[0]: '+userLicenses[index].licensenumber);
    }); 

    let licenseInputItems = j$('.license-listitem');
    console.log('licenseInputItems '+licenseInputItems.length);


    j$.each(licenseInputItems, function (index) {
        let stateVal = j$(this).data('state');
        let occVal = j$(this).data('occ');
        let licenseType = j$(this).data('licensetype');
        let licenseShare = j$(this).data('share');
        let licenseNumber = j$(this).find('input').val();

        console.log('adding Occupations with LICENSE REQUIRED');
        console.log(index + ' / state:'+stateVal+ ' / occupation:'+occVal+ ' / licenseType:'+licenseType+ ' / licenseNumber:'+licenseNumber);
        userLicenses.push({state: stateVal,  occupation:  occVal, licensetype: licenseType, licensenumber: licenseNumber });
        
        console.log('userLicenses[0]: '+userLicenses[index].licensetype);
        console.log('userLicenses[0]: '+userLicenses[index].licensenumber);

        pro.addOccupation(occVal, stateVal, licenseType, licenseNumber); // add to user object

        if(licenseShare !== ''){
          console.log('this is a shared license - so we add the same licence and second occupation');
          pro.addOccupation(licenseShare, stateVal, licenseType, licenseNumber); // add to user object
        }
    }); 
}



function checkforPods(){
    let numberofPods = j$('.occupation-listitem').length; 
    console.log('number of Pods : '+numberofPods);

    if(!numberofPods){
        j$('#section-licenses').hide();
        j$('#section-occupations').show();
        console.log('number of pods is <= 0 - showing license tool');
    }
    else{
        j$('#section-licenses').slideDown('fast');
        j$('#section-occupations').hide();
    }
}

function deleteOccupation(state, occ, licensetype){
    numberofOccupationsAdded --;

    let statePod = j$(".state-pod-container[data-state='" + state + "']"); 
    let occPod = j$(".occupation-listitem[data-occ='" + occ + "'][data-state='" + state + "']"); 
    let servicesPod = j$(".services-listitem[data-occ='" + occ + "']"); 

    let licensePod = j$(".license-listitem[data-state='" + state + "'][data-licensetype='" + licensetype + "']"); 

    let numberofStateOccPods = j$(".occupation-listitem[data-state='" + state + "']").length;
    let numberofSameOccPods = j$(".occupation-listitem[data-occ='" + occ + "']").length;
    console.log('number of state occ pods currently : '+numberofStateOccPods);

    console.log('::: number of SAME occ pods currently : '+numberofSameOccPods);

    console.log('::: licensePod : '+licensePod.length);
    if(licensePod.length){
      let licenseshare = licensePod.data('share');

      if (licenseshare === ''){
      console.log('this pod license is NOT shared - we can delete it');
          licensePod.remove();
      }
      else{
        licensePod.data('share', '');
        console.log('shared license - not deleting the input  - deleting occ from shared ...');
        /* NEED TO ADD ability to swap shared hidden input-pair*/
      }
    }
    else{
      console.log('license pod doesnt exist...!'+state, occ, licensetype);

    }
    if(numberofStateOccPods > 1){ // if there's more than one pod - then just remove this one
      console.log('remove OCC POD');
      console.log('remove OCC LICENSE: '+ licensePod.length);
        occPod.remove();
    }
    else{
      console.log('remove STATE POD');
        statePod.remove(); // if there's only one - remove the whole state pod
    }
    if(numberofSameOccPods === 1){
      servicesPod.remove();
    }

    if(numberofStateOccPods <= podLimit){
        j$('#section-occupations').hide();
        j$('#section-licenses').show();
    }

    j$('.add-occ-errormsg').text('').removeClass('error');


    checkforPods();

}






function createServicePod(occ, occVal, state, stateVal){
  console.log('create SERVICES POD: '+ occ, occVal, state, stateVal);

  let servicePod = '<li class="services-listitem" data-occ="'+occVal+'" data-state="'+stateVal+'">'+
                            
                               '<div class="services-pod-text">'+
                                        '<h6 class="services-name heading6 font-weight-semibold padding-bottom-1">'+occ+'</h6>'+
                                    
                                        '<div class="services-text text-large">'+
                                          '<span class="num-services-selected">36</span> of <span class="num-services-total">36</span> services added'+
                                        '</div>'+
                                '</div>'+

                                '<button class="edit-services-btn link-to-modal button" data-occ="'+occVal+'" data-state="'+stateVal+'" data-target="#pr-modal-EditServices">Edit Services</button>'+

                        '</li>';


    j$('.occupation-services-list').append(servicePod);
}


function createLicensePod(occ, occVal, stateVal, LicenseType){

  let occPod = j$(".occupation-listitem[data-occ='"+ occVal +"'][data-state='" + stateVal + "']");
  let licensePodExists = j$(".license-listitem[data-state='" + stateVal + "'][data-licensetype='" + LicenseType + "']");
  let statePod = j$(".state-pod-container[data-state='" + stateVal + "']");

  occPod.data('licensetype', LicenseType);

  console.log('occpod license: '+occPod.data('licensetype'));

  console.log(occPod.length + ' : '+occVal+' : adding licencetype : '+LicenseType);

  // check if this license already exists - in case same license required for 2 dif occupations (eg. Handyman and GC)
  if(!licensePodExists.length){
      console.log('license doesnt exist yet - number of same license/state pods: '+ licensePodExists.length);
      console.log('create LICENSE POD for: '+ stateVal, occ, LicenseType);

          let licensePod = '<li class="license-listitem margin-top-3" data-state="'+stateVal+'" data-licensetype="'+LicenseType+'" data-occ="'+occVal+'" data-share="">'+ 
                                  // '<div class="alert alert--error display-none" type="box">Agent comment notifcation will go here</div>'+
                                  '<div class="static-input-label font-weight-semibold">'+LicenseType+'</div>'+
                                  '<div static error="please enter your license number" class="input-container input-message licensenumber-input margin-top-1">'+
                                      '<input class="input" type="text" value="" placeholder="Enter License Number"/>'+
                                  '</div>'+
                            '</li>';

            // append to this statepod
            statePod.find('.license-list').append(licensePod);
    } 
    else{

     //let shareCount = licensePodExists.length+1;
     let sharedOccupation = licensePodExists.data('occ');
    
    console.log('license already exists....for another occuption - '+sharedOccupation);
    console.log('number of same license/state pods: '+ licensePodExists.length + ': adding 1');

      licensePodExists.data('share', occVal); // add the new occupation to data-share of the existing pod
      //licensePodExists.data('occ', sharedOccupation +'::'+ occVal); // add occupation to the data-occ
      console.log('add hidden input for this - same license now has share...'+licensePodExists.data('share'));
    }

}



function createRadioBtn(licenseInfo, licenseVal, occ, stateVal, selected){
  let selectedstate = '',
     checkedstate = '';

  if(selected === true){
    console.log('selected Radio...'+selected);
    selectedstate = ' selected ';
    checkedstate = ' checked="checked" ';
  }

    let radioHTML = '<div class="radio '+selectedstate+'">'+
                        '<input class="radio-license-option" type="radio" name="radio-license" value="'+licenseVal+'" data-occ="'+occ+'" data-state="'+stateVal+'" '+checkedstate+'>'+
                        '<label><span>'+licenseInfo+'<span></label>'+
                    '</div>';
    return radioHTML;
}





// Get the Required and Acceptable Licenses - for this State and Occupation
function collectLicensesText(occ, occVal, state, stateVal){
    console.log('selectedState = '+stateVal);
    console.log('selectedService = '+occ);
  
    let requiredLicenses = '';
    let requiredLicensesVal = '';
    let acceptableLicenses = '';
    let combinedText = '';
    let onlyOne = false;
    let radioCount = 0;

    let found_reqs = j$.grep(requirements, function(v) {
        return v.STATE === stateVal && v.VERTICAL === occ;
    });

    j$.each(found_reqs, function( k, v ) {
      console.log( "Key: " + k + ", VERTICAL: " + v.VERTICAL + ", LICENSE: " + v.LICENSE + ", REQUIRED: " + v.REQUIRED );
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

            return "No License Required.";
    }

    radioCount = found_reqs.length;

    if(radioCount === 1){
      onlyOne = true;
      console.log('only ONE requirement...'+radioCount);
    }
    else{
      console.log('MORE THAN ONE requirement...'+found_reqs.length);
      onlyOne = false;
    }
  
    j$.each(found_reqs, function(i, item){

        let licenseText = item.LICENSE;
        let isRequired = item.REQUIRED;

        if (isRequired === 'ACCEPTABLE') {
            acceptableLicenses += createRadioBtn(licenseText, licenseText, occ, stateVal, onlyOne);
        }
        else {
            if(requiredLicenses){
                requiredLicenses += ' <span class="font-weight-bold"> and </span> ';
                requiredLicensesVal += '::';
                radioCount--;
            }
            requiredLicenses += licenseText;
            requiredLicensesVal += licenseText;
        }

    });

    console.log(' : requiredLicenses: ' + requiredLicenses);
    console.log(' : acceptableLicenses: ' + acceptableLicenses);

    if(radioCount === 1){
      onlyOne = true;
      console.log('only ONE requirement...'+radioCount);
    }
    else{
      console.log('MORE THAN ONE requirement...'+found_reqs.length);
      onlyOne = false;
    }

        combinedText = createRadioBtn(requiredLicenses, requiredLicensesVal, occ, stateVal, onlyOne);

        if(acceptableLicenses){
            combinedText +=  acceptableLicenses;
        }
            console.log('combinedText :'+combinedText);


    j$('.occ-txt').text(occ);
    j$('.state-txt').text(state);

    return combinedText;
}




function createOccupationPod(occ, occVal, state, stateVal){
  let stateName = state.toUpperCase();

    occVal = occVal.replace(/\s/g, '-');
    occVal = occVal.replace(/\//g, '-');

  console.log('create pod for: '+occ + ' stateName: '+stateName+' StateVal: '+stateVal);

    let reqsforthisService = collectLicensesText(occ, occVal, state, stateVal);
        
        j$('#pr-modal-requirements').html(reqsforthisService);

               console.log('pod - hasRequirements: ' + hasRequirements);
               console.log('reqsforthisService: ' + reqsforthisService);
      
      let requireLink = ' <span class="pod-requirements">No License Required</span>';

      if(hasRequirements === true){
        console.log('has requirements....');
        closeModal();

         openModal('#pr-modal-LicenseSelect');
         requireLink = ' ';
      }
      else{
        console.log('NO requirements....');
        closeModal();
      }



    let statePodExists = j$(".state-pod-container[data-state='" + stateVal + "']"); 
    let occPodExists = j$(".occupation-listitem[data-occ='" + occVal + "'][data-state='" + stateVal + "']"); 
    let servicesPodExists = j$(".services-listitem[data-occ='" + occVal + "']"); 

    console.log('statePodExists : '+statePodExists.length);
    console.log('occPodExists : '+occPodExists.length);
    console.log('servicesPodExists : '+servicesPodExists.length);

    if(!occPodExists.length){ // if occ pod does not exist already
          numberofOccupationsAdded ++;

          if(!servicesPodExists.length){ // if service pod does NOT exist - add it
            createServicePod(occ, occVal, state, stateVal);
          }
      // if this State-Occ pod does NOT exist already
          let occupationPod = '<li class="occupation-listitem" data-occ="'+occVal+'" data-state="'+stateVal+'" data-licensereq="'+hasRequirements+'">'+
                                '<div class="occupation-pod">'+
                                    '<h6 class="text-large pod-occupation '+occVal+'">'+occ+requireLink+'</h6>'+
                                    '<div class="delete-occupation-pod delete-trashcan-icon"></div>'+
                                '</div>'+
                              '</li>';

            if(!statePodExists.length){ // if state pod does NOT exist already - create it - 
              console.log('state pod does NOT exist yet ... creating it now - and inserting occupation pod');
                  // <!-- IF STATE POD DOES NOT EXIST Already-->
                let    statePod = '<div class="state-pod-container" data-state="'+stateVal+'">'+
                                      '<p class="text-large font-weight-semibold color-gray80">'+stateName+'</p>'+
                                      '<ul class="occupation-list" data-state="'+stateVal+'">'+occupationPod+'</ul>'+
                                      '<ul class="license-list display-block margin-y-5" data-state="'+stateVal+'"></ul>'+
                                  '</div>'; 
                return statePod;
            }
            else{
              console.log('this state already exists.... - just add the new occupation');
                return occupationPod;
            }


    }
    else{
      console.log("this occupation for this state  already exists... do nothing");
      return null;

    }
}





function addOccupation(occ, occVal, state, stateVal){

    let pods = j$('.occupation-pod').length;
    let statePodExists = j$(".state-pod-container[data-state='" + stateVal + "']"); 
    // let occPodExists = j$(".occupation-listitem[data-occ='" + occVal + "'][data-state='" + stateVal + "']"); 
    // let servicesPodExists = j$(".services-listitem[data-occ='" + occVal + "']"); 

    console.log('podLimit : '+podLimit);
    console.log('pods : '+pods);
    

            if(pods >= podLimit){
                j$('.pod-btn-container').hide();
                j$('#section-occupations').hide();
                console.log('occupation limit reached - hiding buttons');
            }
            else{
                j$('.pod-btn-container').slideDown('fast');
                j$('#section-occupations').hide();
                console.log(' - showing add another, hiding license tool ');
            }

            if(pods <= podLimit){

              let newOccupationPod = createOccupationPod(occ, occVal, state, stateVal);

                  if(newOccupationPod !== ''){
                      j$('.add-occ-errormsg').text('').removeClass('error');


                        if(pods <= 0){
                            console.log('no pods... show it...');
                            j$('.pod-container').show();
                        }
                        
                        if(statePodExists.length){ // if state pod exists already - add occupation to it
                            let statePodList = statePodExists.find('.occupation-list');
                            statePodList.append(newOccupationPod);
                        }
                        else{
                          j$('.pod-container').append(newOccupationPod);
                        }
                        
                        checkforPods();

                        // mixpanel.track("Add - Occupation", {
                        //         "Occupation": occupation,
                        //         "State": stateVal
                        // });
                  }
                  else{
                      j$('.add-occ-errormsg').text('Service and state combination already exist. Please select another service or state').addClass('error');
                  }
            }

            else{
              console.log('pods: '+pods);

                j$('.add-occ-errormsg').text('You are limited to '+podLimit+' Services. Please remove one before adding more').addClass('error');

            }
    
  }




function cancelOccupationAdd(){

        let licenseRadio = j$("#pr-modal-requirements input[name='radio-license']:first");
        
          let licenseRadioExists = licenseRadio.length;
          console.log('licenseRadioExists..'+licenseRadioExists);

          let occ = licenseRadio.data('occ');
          let occVal = occ.replace(/\s/g, '-');
              occVal = occVal.replace(/\//g, '-');

          let stateVal = licenseRadio.data('state');

          console.log('occVal : '+occVal);
          console.log('stateVal : '+stateVal);

          deleteOccupation(stateVal, occVal);
          closeModal();
}


function checkSelectedLicenseRadio(){

        let licenseRadio = j$("#pr-modal-requirements input[name='radio-license']:checked");
        if(licenseRadio.length < 1){
          console.log('no RADIO SELECTED...');
          j$('.modal-radio-error').addClass('error');
        }
        else{
          j$('.modal-radio-error').removeClass('error');
          let licenseType = licenseRadio.val();
          
          let splitLicense = licenseType.split('::');

          console.log('ADDING : selected License: '+licenseType);
          console.log('splitLicense : '+splitLicense.length);
          console.log('splitLicense[0] : '+splitLicense[0]);

          let occ = licenseRadio.data('occ');
          let occVal = occ.replace(/\s/g, '-');
              occVal = occVal.replace(/\//g, '-');

          let stateVal = licenseRadio.data('state');

          console.log('occVal : '+occVal);
          console.log('stateVal : '+stateVal);

          j$.each(splitLicense, function(i, item){
            createLicensePod(occ, occVal, stateVal, item);// occ, stateVal, LicenseType
          });
           setTimeout(function() {
              j$(window).scrollTop(0);
              j$('#section-occupations').slideUp('fast');
              j$('#section-licenses').slideDown('slow');
                setTimeout(function(){
                  closeModal();
                   j$('html, body').animate({
                    scrollTop: j$('#state-occupation-pods').offset().top - 80
                  }, 500);
                }, 100);
          }, 100);

        
        }
}




function checkSelectOccupations(whichTool, check){
  console.log('check occupations selects...');
      let thisParent = j$(whichTool).parent().parent();

      console.log('thisParent ID: '+thisParent.prop('id'));

      let occSelect = thisParent.find('.occupation-select');
      let stateSelect = thisParent.find('.state-select');

      let occ = thisParent.find('.occupation-select option:selected').text();
      let occVal = occSelect.val();
      if(occVal){
          occVal = occVal.replace(/\s/g, '-');
          occVal = occVal.replace(/\//g, '-');
      }

      let state = thisParent.find('.state-select option:selected').text();
      let stateVal = stateSelect.val();

      console.log('occVal : '+occVal);
      console.log('stateVal : '+stateVal);

      let occPodExists = j$(".occupation-listitem[data-occ='" + occVal + "'][data-state='" + stateVal + "']"); 

      console.log('::: occPodExists: '+occPodExists.length);


      if(!occPodExists.length){ // if the pod does NOT exist


        if(occVal !== null && stateVal !== null && !check){
          //if both selectors have been selected
            addOccupation(occ, occVal, state, stateVal);
            thisParent.find('.occupation-select').val([]);
            thisParent.find('.state-select').val([]);
            occSelect.parent().removeClass('error filled');
            stateSelect.parent().removeClass('error filled');
          }
          else{
              console.log('somethings not selected...');
            if(occVal === null || occVal === undefined){
              console.log('ERR : please select occVal == '+occVal);
              thisParent.find('.occupation-select').parent().addClass('error');
            }
            else{
              thisParent.find('.occupation-select').parent().removeClass('error');
            }
            if(stateVal === null || stateVal === undefined){
              console.log('ERR - please select stateVal == '+stateVal);
              thisParent.find('.state-select').parent().addClass('error');
            }
            else{
              thisParent.find('.state-select').parent().removeClass('error');
            }
        }
      }
      
      else{
        if(occPodExists.length){
           j$('.add-occ-errormsg').text('Service and state combination already exist. Please select another service or state').addClass('error');
        }
        else{
           j$('.add-occ-errormsg').text('').removeClass('error');

        }
        
        

      }

}

function validateOccupations(){
    console.log('validate Occupations...');

       let licenseInputItems = j$('.license-listitem'),
            licenseCount = licenseInputItems.length,
            licenseNumbersCompleted = 0;

        console.log('licenseInputItems '+licenseInputItems.length);

        j$.each(licenseInputItems, function () {
            let licenseNumber = j$(this).find('input').val();
            let licenseOccupation = j$(this).data('occ');
            let licenseShared = j$(this).data('share');
            let licenseState = j$(this).data('state');
            let licenseType = j$(this).data('licensetype');

            let licenseNumberContainer = j$(this).find('.input-container');

            if(licenseNumber.length < 1){
              licenseNumberContainer.addClass('error').removeClass('success');
            }
            else{
              if(licenseNumber === '567890'){
                j$('#invalid-license-continue-modal-btn').data('occ', licenseOccupation).data('share', licenseShared).data('state', licenseState).data('licensetype', licenseType);
                 openModal('#pr-modal-HangOnLicense');

                setTimeout(function() {
                    setTimeout(function(){

                      closeModal();
                      openModal('#pr-modal-LicenseInvalid');
                        licenseNumberContainer.addClass('error expired').removeClass('success');
                    }, 800);
                  }, 2500);


                
              }
              else{
                licenseNumberContainer.removeClass('error expired').addClass('success');
                licenseNumbersCompleted++;
              }
            }

        });

        if(numberofOccupationsAdded > 0 && licenseNumbersCompleted === licenseCount){
          console.log('::::licenseNumbersCompleted: '+licenseNumbersCompleted+' == '+ licenseCount);
          occupationsComplete = true;
          return true;
        } 
        else{
          if(numberofOccupationsAdded < 1){
            checkSelectOccupations(j$('#add-occupation-btn'), false);
          }
          console.log('licenseNumbersCompleted: '+licenseNumbersCompleted+' != '+ licenseCount);
          occupationsComplete = false;
          return false;
        }

}























function initOccupations(){
  console.log('initiate Occupations....');


    j$(".app").on("click", "#occupations-submit", function(){
      let licenseInputItems = j$('.license-listitem'),
          licenseCount = licenseInputItems.length;
            

        console.log('licenseInputItems '+licenseCount);

      changeStepStatus(2, '1');
      gotoSection(3);
      if(confirmationVersion === 'true'){
          j$('#section-occupations').hide();
          j$('#section-licenses').hide();
          j$('#section-services').hide();
          if(licenseCount > 0){ // if there are required licenses - show the next steps confirmation
            j$('#section-nextsteps-occupations').show();
          }
          else{ // or else show the confirmation if now licenses are required
            j$('#section-confirmation-occupations').show();
          }
        }
    });

    j$('.app').on('click', '#invalid-license-continue-modal-btn', function(){
         closeModal();
         let occVal = j$(this).data('occ');
         let stateVal = j$(this).data('state');
         let sharedOcc = j$(this).data('share');
         let licenseType = j$(this).data('licensetype');
          
          deleteOccupation(stateVal, occVal, licenseType);
        
        if(sharedOcc !== ''){
          deleteOccupation(stateVal, sharedOcc, licenseType);
        }

         j$('#section-licenses').slideUp('fast');
         j$('#section-services').slideDown('slow');
    });



    j$('.app').on('click', '#licenses-next-btn', function(){

      if(validateOccupations()){
             console.log('show hang on modal...');

            collectUserLicenseData();

            openModal('#pr-modal-HangOnLicense');

                setTimeout(function() {
                  j$(window).scrollTop(0);
                  j$('#section-licenses').slideUp('fast');
                  j$('#section-services').slideDown('slow');
                    setTimeout(function(){
                      closeModal();
                    }, 800);
              }, 2500);
        }
        else{
            console.log('error....');
        }

    });

    j$('.app').on('click', '#back-to-license-btn', function(){
            j$('#section-services').slideUp('fast');
            j$('#section-licenses').slideDown('slow');
    });

    

    // connect occupation selector
    j$('.app').on('change', '.occupation-select', function(){
        let occupation = j$(this).val();
        
        console.log('occupation: '+occupation);
        j$('.occ-txt').text(occupation);
        selectedService = occupation;

        j$(this).parent().removeClass('error');
        j$('.add-occ-errormsg').text('').removeClass('error');
    });


    // connect state selector
    j$('.app').on('change', '.state-select', function(){
        let stateName = j$(this).find("option:selected").text();
        console.log('stateName = '+stateName);
        j$('.state-txt').text(stateName);

        let state = j$(this).val();
        selectedState = state;
        
        j$(this).parent().removeClass('error');
        j$('.add-occ-errormsg').text('').removeClass('error');
    });



    j$('#add-another-btn').on('click', function(){
        if(numberofOccupationsAdded <= podLimit){
            j$('.pod-btn-container').slideDown('fast');
            j$('#section-licenses').show();
            j$('#section-occupations').hide();
            j$('#section-services').hide();
            j$('.add-occ-errormsg').text('').removeClass('error');

        }
        else{
            j$('.add-occ-errormsg').text('You\'ve reached your limit of '+podLimit+' Occupations. Please remove one from above before adding more').addClass('error');
        }
        
    });



    j$('.app').on('click', '.add-license-btn', function(){
        checkSelectedLicenseRadio();
    });



  // connect ADD occupation Button
  j$('.app').on('click', '.add-occupation-btn', function(){      
      checkSelectOccupations(this, false);
  });
  // Occupation Pod Delete Button
  j$('.app').on('click', '.delete-occupation-pod', function(){
      let thisOccPod = j$(this).parent().parent();

      let thisState = thisOccPod.data('state');
      let thisOcc = thisOccPod.data('occ');
      let thisLicense = thisOccPod.data('licensetype');
      console.log('delete this: '+thisOcc+' '+thisState+' '+thisLicense);
      deleteOccupation(thisState, thisOcc, thisLicense);
  });



  j$('.app').on('click', '.pr-modal-radios .radio', function(){
     j$('.modal-radio-error').removeClass('error');
  });

  // Occupation Pod Delete Button
  j$('.app').on('click', '#delete-occupation-cancel', function(){
      cancelOccupationAdd();
  });



  checkforPods();
}

let startLatLng = { lat: 37.571663, lng: -122.266887 },
    meter = 0.00062137,
    zipcode = 94404,
    radius = 20,

    markers = [],

    geocoder,
    map,

    icon = '../images/map-pin-icon.svg',

    work_radius;


// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
    work_radius.setMap(null);
}

// Shows any markers currently in the array.
// function showMarkers() {
//     setMapOnAll(map);
// }

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}


// Adds a marker to the map and push to the array.
function addMarker(location) {

    if (markers.length > 0) {
        deleteMarkers();
    }

    let radiusSelect = document.getElementById("workarea-radius");
    radius = radiusSelect.options[radiusSelect.selectedIndex].value;

    let radius_meters = radius / meter;

    let marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: icon,
    });

    // Construct the radius circle
    let radiusOptions = {
        strokeColor: "#f96302",
        strokeOpacity: 0.0,
        strokeWeight: 1,
        fillColor: '#f96302',
        fillOpacity: 0.25,
        map: map,
        center: marker.getPosition(), // I want to set the center around the users location
        radius: radius_meters
    };

    // add the radius circle to the map
    work_radius = new google.maps.Circle(radiusOptions);

    markers.push(marker);
}


// Add the users point to the map
function addAddress() {
    // Get the users current location
    let location = j$("#workarea-zip").val(); // Users postcode

    // Translate the users location onto the map
    geocoder.geocode({
        'address': location
    }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {

            // Center around the users location
            map.setCenter(results[0].geometry.location);

            addMarker(results[0].geometry.location);
        }
    });


}


// Create our base map object 
function initMap() {
    
    if(window.location.href.indexOf("thdserviceprovider") > -1) {
       icon = globalStaticResourcePath+'/images/map-pin-icon.svg';
       console.log("url contains thdserviceprovider - changing icon link to: "+icon);
    }
    else{
        console.log('not SF - keep icon');
        icon = './images/map-pin-icon.svg';
    }


    geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(startLatLng);

    let mapOptions = {
        zoom: 8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    addMarker(startLatLng);
    initCoverageArea();
    initAutocomplete();

}


function updateZip() {
    let zipInput = j$("#workarea-zip");
    zipcode = zipInput.val();

    let radiusSelect = j$("#workarea-radius");
    radius = radiusSelect.val();

    console.log('zipcode = ' + zipcode);
    console.log('radius = ' + radius);

    if (zipcode.length > 4 && radius !== null) {
        addAddress();
        j$("#map-section").css('display', 'flex');
        j$("#workarea-zip").parent().removeClass('error');
    
    }
}

function updateRadius() {
    let radiusSelect = j$("#workarea-radius");
    radius = radiusSelect.val();
    console.log('radius = ' + radius);

    if (zipcode.length > 4 && radius !== null) {
        addAddress();
        j$("#map-section").css('display', 'flex');
        j$("#workarea-zip").parent().removeClass('error');
        j$('html, body').animate({
                    scrollTop: j$('#map-container').offset().top - 80
                  }, 500);
    }

}





function populateFormElements(addressComponent, formMap) {
  const addressType = addressComponent.types[0];
  if (formMap.googleComponent === addressType) {

    const formEle = formMap.id;
    const formFormat = formMap.format;
    const formValue = addressComponent[formFormat];

    console.log(formEle+' : '+formValue+' : '+formFormat);
    j$('#'+formEle).val(formValue).parent().addClass("filled");
  }
}



function initAutocomplete() {
  const googleComponents = [
    { googleComponent: 'sublocality_level_1', id: 'business-city', format: 'long_name' },
    { googleComponent: 'locality', id: 'business-city', format: 'long_name' },
    { googleComponent: 'administrative_area_level_1', id: 'business-state', format: 'short_name' },
    { googleComponent: 'postal_code', id: 'business-zip', format: 'long_name' },
  ];
  const autocompleteFormField = document.getElementById('business-street');
  const autocomplete = new google.maps.places.Autocomplete((autocompleteFormField), {
    types: ['address'],
    //componentRestrictions: ['us'],
  });
  google.maps.event.clearInstanceListeners(autocompleteFormField);
  google.maps.event.addListener(autocomplete, 'place_changed', () => {
    const place = autocomplete.getPlace();
    autocompleteFormField.value = place.name;
    
    for (const component in googleComponents) {
      const addressComponents = place.address_components;
      addressComponents.forEach( addressComponent => populateFormElements(addressComponent, googleComponents[component]));
    }
  });
}



/* END ADDRESS AUTOCOMPLETE _ */


function validateAddress(){
 console.log('validate address inputs...');

    let streetComplete = false,
        cityComplete = false,
        stateComplete = false,
        zipComplete = false,
        
        streetInput = j$('#business-street'),
        cityInput = j$('#business-city'),
        stateInput = j$('#business-state'),
        zipInput = j$('#business-zip'),

        street = streetInput.val(),
        city= cityInput.val(),
        state = stateInput.val(),
        zip = zipInput.val(),
            
        
        streetContainer = streetInput.parent(),
        cityContainer = cityInput.parent(),
        stateContainer = stateInput.parent(),
        zipContainer = zipInput.parent();

        if(street.length > 2){
            streetComplete = true;
        }
        if(city.length > 2){
            cityComplete = true;
        }
        if(state !== null && state !== undefined){
            stateComplete = true;
        }
        if(zip.length > 4){
            zipComplete = true;
        }

        if(streetComplete && cityComplete && stateComplete && zipComplete){
            console.log('Address Complete!');
            pro.setUserAddress(street, city, state, zip);
            console.log('setting pro.address: '+pro.address);
            

            streetContainer.removeClass('error');
            cityContainer.removeClass('error');
            stateContainer.removeClass('error');
            zipContainer.removeClass('error');
            return true;
        }
        else{
            if(!streetComplete){
                streetContainer.addClass('error');
            }
            else{
                streetContainer.removeClass('error');
            }
            if(!cityComplete){
                cityContainer.addClass('error');
            }
            else{
                cityContainer.removeClass('error');
            }
            if(!stateComplete){
                stateContainer.addClass('error');
            }
            else{
                stateContainer.removeClass('error');
            }
            if(!zipComplete){
                zipContainer.addClass('error');
            }
            else{
                zipContainer.removeClass('error');
            }

            return false;

        }

}

function validateCoverageArea(){
    console.log('validating Coverage area....');
    let zipComplete = false,
        radiusComplete = false,
        addressComplete = false,

        zipInput = j$("#workarea-zip"),
        radiusInput = j$("#workarea-radius"),

        zipInputContainer = zipInput.parent(),
        radiusInputContainer = radiusInput.parent(),

        zip = zipInput.val(),
        radius = radiusInput.val();

    console.log('validate CoverageArea radius: '+radius);
    console.log('validate CoverageArea zip: '+zipcode);

    if(zipcode.length > 4){
        zipComplete = true;
    }
    else{
        zipComplete = false;
    }
    if(radius !== 0 ||  radius !== '0'){
        radiusComplete = true;
    }
    else{
        radiusComplete = false;
    }
    if(validateAddress()){
        addressComplete = true;
    }
    else{
        addressComplete = false;
    }

    if(zipComplete && radiusComplete && addressComplete){
        console.log('coverage area COMPLETE! ');
        radiusInputContainer.removeClass('error');
        zipInputContainer.removeClass('error');

        pro.coverage.zip = zip;
        pro.coverage.radius = radius;
        console.log('set pro coverage zip: '+pro.coverage.zip);
        console.log('set pro coverage radius: '+pro.coverage.radius);

        return true;
    }
    else{
        if(!zipComplete){
            zipInputContainer.addClass('error');
        }
        else{
            zipInputContainer.removeClass('error');
        }
        if(!radiusComplete){
            radiusInputContainer.addClass('error');
        }
        else{
            radiusInputContainer.removeClass('error');
        }
        if(!addressComplete){
            console.log('address not complete');
        }

        return false;

    }

}




let coverageComplete = false;

function initCoverageArea(){
    console.log('init CoverageArea...');

    //initAutocomplete();
    
    j$('.app').on('keyup', '#workarea-zip', function() {
        updateZip();
    });

    j$('.app').on('change', '#workarea-radius', function() {
        updateRadius();
    });

    j$(".app").on("click", "#coveragearea-submit-btn", function(){
        if(validateCoverageArea()){
            console.log('CoverageArea COMPLETE! ');
            coverageComplete = true;
            changeStepStatus(3, '1');
            gotoSection(4);

            if(confirmationVersion === 'true'){
                  j$('#section-coverage-area').hide();
                  j$('#section-confirmation-coverage').show();
                }
        }
        else{
            coverageComplete = false;
            console.log('error....');
        }
    });
}



   let proxtraComplete = false;

function validateProXtra(){
    console.log('validate ProXtra...');

    let proxtraNumberInput = j$('#proxtra-number'),
        proxtraNumber = proxtraNumberInput.val(),
        proxtraNumberContainer = proxtraNumberInput.parent(),

        proxtraPhoneInput = j$('#proxtra-phone'),
        proxtraPhone = proxtraPhoneInput.val(),
        proxtraPhoneContainer = proxtraPhoneInput.parent(),

        proxtraRadioContainer = j$('#proxtra-radio-container');


        if (!j$("input[name='radio-proxtra']:checked").val()) {
           console.log('Nothing is checked!');
           proxtraRadioContainer.addClass('error');
           proxtraComplete = false;

            return false;
        }
        else {
          console.log('One of the radio buttons is checked!');
           proxtraRadioContainer.removeClass('error');
        }


        if(proxtraNumber.length > 4 || proxtraPhone.length > 4){
            proxtraComplete = true;

            pro.proxtra = proxtraNumber || proxtraPhone; // set to whichever is not null
            console.log('proxtraNumber: '+proxtraNumber);
            console.log('proxtraPhone: '+proxtraPhone);

            console.log('setting pro.proxtra: '+pro.proxtra);
            changeStepStatus(4, '1');

            proxtraNumberContainer.removeClass('error');
            proxtraPhoneContainer.removeClass('error');
            return true;
        }
        else{
            if(!proxtraComplete){
                proxtraNumberContainer.addClass('error');
                proxtraPhoneContainer.addClass('error');
            }
            else{
                proxtraNumberContainer.removeClass('error');
                proxtraPhoneContainer.removeClass('error');
            }

            proxtraComplete = false;
            return false;

        }
}


function initProXtra(){
	
    j$(".app").on("change", 'input[name="radio-proxtra"]', function(){
            proXtraType = j$(this).val();
            console.log(proXtraType);

            let proxtraRadioContainer = j$('#proxtra-radio-container');
            proxtraRadioContainer.removeClass('error');

            j$('#proxtra-number').parent().removeClass('filled');
            j$('#proxtra-phone').parent().removeClass('filled');

            j$(".proxtra-yes-show").hide();
            j$(".proxtra-no-show").hide();

            j$(".proxtra-"+proXtraType+"-show").css("display", "flex");
            j$("input.proxtra-"+proXtraType).focus();
    });

    
    j$(".app").on("click", "#proxtra-submit-btn", function(){

        if(validateProXtra()){
            gotoSection(5);

            
            if(confirmationVersion === 'true'){
              j$('#section-pro-xtra').hide();
              j$('#section-confirmation-proxtra').show();
            }
        }
        else{
            console.log('error....');
        }


      
    });

}



function toggleMiddleNameInput(){
  let middleNameInput = j$("#owner-middlename-input");
  let middleNameCheckbox = j$("#no-middlename-checkbox");
  
   if(middleNameCheckbox.is(":checked")) {
      middleNameInput.parent().removeClass("error");
      middleNameInput.prop('readonly', true).val("none");
   }
   else{
      middleNameInput.prop('readonly', false).val("");    
   }
}



function validateBackgroundCheck(){
	let firstNameComplete = false,
	 	middleNameComplete = false,
	 	lastNameComplete = false,

        firstNameInput = j$('#owner-firstname-input'),
        firstName = firstNameInput.val(),
        firstNameContainer = firstNameInput.parent(),

        middleNameInput = j$('#owner-middlename-input'),
        middleName = middleNameInput.val(),
        middleNameContainer = middleNameInput.parent(),


        middleNameCheckbox = j$("#no-middlename-checkbox"),
        noMiddleName = middleNameCheckbox.is(':checked'),

        lastNameInput = j$('#owner-lastname-input'),
        lastName = lastNameInput.val(),
        lastNameContainer = lastNameInput.parent();


        if(firstName.length > 1){
        	firstNameComplete = true;
        }
        if(noMiddleName || middleName.length > 1){
        	middleNameComplete = true;
        }
        if(lastName.length > 1){
        	lastNameComplete = true;
        }
        if(firstNameComplete && middleNameComplete && lastNameComplete){
            changeStepStatus(5, '2');
            pro.setUserName(firstName, lastName, middleName);
            console.log('user full name: '+ pro.ownerName.fullname);
            return true;

        }
        else{
        	if(!firstNameComplete){
        		firstNameContainer.addClass('error');
        	}
        	else{
        		firstNameContainer.removeClass('error');
        	}
        	if(!middleNameComplete){
        		middleNameContainer.addClass('error');
        	}
        	else{
        		middleNameContainer.removeClass('error');
        	}
        	if(!lastNameComplete){
        		lastNameContainer.addClass('error');
        	}
        	else{
        		lastNameContainer.removeClass('error');
        	}
            return false;
        }
}


function initBackgroundCheck(){
	console.log('init Background Check features');

    j$(".app").on("click", "#no-middlename-checkbox", function(){
        toggleMiddleNameInput();
    });






    j$(".app").on("click", "#backgroundcheck-submit", function(){

        if(validateBackgroundCheck()){
            
            // REMOVE BELOW AFTER TEST - as we don't need to validate all steps at once
                    validateLiability();
                    validateOccupations();
                    validateCoverageArea();
                    validateProXtra();


                	if(liabilityComplete && occupationsComplete && coverageComplete && proxtraComplete){
                		//gotoFinish();
                        
                        if(confirmationVersion === 'true'){
                          j$('#section-background-check').hide();
                          j$('#section-nextsteps-background').show();
                        }
                        console.log(JSON.stringify(pro));
                	}
                	else{
                		if(!liabilityComplete){
                            console.log('ERROR - liabilityComplete: '+liabilityComplete);
                			gotoSection(1);
                		}
                		else if(!occupationsComplete){
                            console.log('ERROR - occupationsComplete: '+occupationsComplete);
                			gotoSection(2);
                		}
                		else if(!coverageComplete){
                            console.log('ERROR - coverageComplete: '+coverageComplete);
                			gotoSection(3);
                		}
                		else if(!proxtraComplete){
                            console.log('ERROR - proxtraComplete: '+proxtraComplete);
                			gotoSection(4);
                		}
                		else {
                            console.log('ERROR - liabilityComplete: '+liabilityComplete);
                             console.log('ERROR - occupationsComplete: '+occupationsComplete);
                             console.log('ERROR - proxtraComplete: '+proxtraComplete);
                            console.log('ERROR - coverageComplete: '+coverageComplete);
                		}
                	}
            // REMOVE ABOVE -  AFTER TEST - as we don't need to validate all steps at once
        }
        else{
            console.log('background check - error....');
        }


      
    });
}



function initApp(){
  initNav();
  initCheckboxes();
  initModals();
  initGeneralLiability();
  initOccupations();
  initCoverageArea();
  initProXtra();
  initBackgroundCheck();

  if(window.location.href.indexOf("thdserviceprovider") > -1) {
       console.log("url contains thdserviceprovider - we are in SF");
  }
  else{ // 
    console.log('not SF - load sections and check appended URL');
    loadAllSections();
  }

    getShortFormInput();
    //hashReader();
    checkCompleted();
    gotoSection(1);

}



j$(document).ready(function() {

	console.log(" APP.js ready......"+j$(".app").length);
	console.log("step buttons : "+j$("#sidenav-steps").length);
	console.log("step buttons : "+j$("#sidenav-steps li").length);
  console.log(" APP.js ready......"+j$(".app").length);

	initApp();

});


