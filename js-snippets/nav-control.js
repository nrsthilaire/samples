let j$ = jQuery.noConflict();

let proXtraType = "number";

let statusTypes = ["Incomplete", "Complete", "Pending Approval", "Action Required", "Disabled"];
let statusClass = ["incomplete", "complete", "pending", "action", "disabled"];

let progressPercentages = [0, 10, 20, 40, 60, 80, 100];

let statusHash = "";

let stepStatus = [{
    "id": "short-form",
    "vfname": "ShortForm",
    "status": 1,
    "complete": true
  },
  {
    "id": "general-liability",
    "vfname": "GeneralLiability",
    "status": 2,
    "complete": true
  },
  {
    "id": "occupations",
    "vfname": "Occupations",
    "status": 2,
    "complete": false
  },
  {
    "id": "coverage-area",
    "vfname": "CoverageArea",
    "status": 5,
    "complete": false
  },
  {
    "id": "pro-xtra",
    "vfname": "ProXtra",
    "status": 0,
    "complete": false
  },
  {
    "id": "background-check",
    "vfname": "BackgroundCheck",
    "status": 0,
    "complete": false
  },
  {
    "id": "profile",
    "vfname": "Profile"
  },
  {
    "id": "login",
    "vfname": "Login"
  }
];

let stepCount = stepStatus.length - 2;
let currentSection = 1;




// use if you need to wait until an element loads before doing something..
var waitForEl = function (selector, callback) {
  if (j$(selector).length) {
    callback();
  } else {
    setTimeout(function () {
      waitForEl(selector, callback);
    }, 100);
  }
};




let gotoSection = function (section) {
  let stepName = stepStatus[section].id;
  currentSection = section;

  //window.location = '#'+currentSection +'&'+statusHash; // add this section to hash in URL - so we can go keep track of where we are.

  console.log('go to section: ' + section);
  console.log('statusHash: ' + statusHash);

  if (section >= stepCount) { // if we're going to the Sign in or Profile page
    j$('#nav-wrapper').hide();
  } else {
    j$('#nav-wrapper').show();
  }

  j$('#sidenav-loader').fadeOut('fast');

  j$('.section-loader').hide();
  j$('#section-' + section + '-loader').fadeIn();

  j$('.sidenav-step').removeClass('selected');
  j$('body').find('.step-' + stepName).addClass('selected');

  j$(window).scrollTop(0);

};


function updateProgressBar(countCompleted) {
  let percentComplete = 10;

  percentComplete = progressPercentages[countCompleted];

  console.log("#countCompleted: " + countCompleted);
  console.log("#percentComplete: " + percentComplete);

  j$(".progress-text").html(percentComplete + "% Completed");
  j$(".progress-indicator").css("width", percentComplete + "%");

}




function checkCompleted() {
  console.log("checking completed...statusHash: " + statusHash);

  // check the stepStatus array and count completed
  let countCompleted = j$.grep(stepStatus, function (val) {
    return val.complete;
  }).length;

  // update progress bar based on completed
  updateProgressBar(countCompleted);

}




function changeStepStatus(step, newstatus) {

  let newcomplete = false;

  if (newstatus === "1" || newstatus === "2") {
    newcomplete = true;
  }

  stepStatus[step].status = newstatus;
  stepStatus[step].complete = newcomplete;
  console.log("changing " + step + " step status to :" + stepStatus[step].status);

  let sectionID = stepStatus[step].id;
  let thisstatusClass = statusClass[newstatus];
  let thisstatusText = statusTypes[newstatus];

  j$(".step-" + sectionID).removeClass("notstarted inprogress complete action notification").addClass(thisstatusClass);
  j$(".step-" + sectionID).find(".sidenav-step-status").html(thisstatusText);
  let updatedHash = "";

  for (let i in stepStatus) {
    let thisstatus = stepStatus[i].status;

    if (i < stepCount) {
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
function hashReader() {
  let hash = location.hash.replace("#", "");
  console.log("hash: " + hash);

  let splithash = hash.split("&");

  let section = splithash[0];
  let status = splithash[1];

  if (!section || section >= stepCount + 2) {
    console.log("no section in hash::: setting to default: 1");
    section = 1; // set to default;
  }

  if (!status || !j$.isNumeric(status)) {
    console.log("no status listed in hash::: setting to default");
    status = "100000"; // set to default status
  }

  let splitstatus = status.split("");

  for (let i in stepStatus) {
    let thisstatus = splitstatus[i];

    if (thisstatus === undefined || thisstatus > statusTypes.length) {
      console.log("changestepstatus for " + i + " : " + splitstatus[i]);
      thisstatus = 1;
    }
    if (i < stepCount) {
      console.log(i + ": stepCount : " + stepCount);
      changeStepStatus(i, thisstatus);
    }
  }

  gotoSection(section); // remove in SALESFORCE

}



function showhideMenuOnResize() {
  j$(".header-dropdown").hide();
}



// REMOVE FOR SALESFORCE
function loadAllSections() {

  j$("#modal-loader").load("sections/modals.html");

  for (var i = stepStatus.length - 1; i >= 1; i--) {

    var thissection = stepStatus[i].id;

    j$("#section-" + i + "-loader").load("sections/" + thissection + ".html");
  }



}


function initNav() {
  console.log('initiate Navigation');


  j$(window).scroll(function () {
    let scroll = j$(window).scrollTop();
    let vpw = j$(window).width();
    let headerheight = 200;

    if (vpw > 768) {
      headerheight = 175;
      if (scroll >= headerheight) {
        j$(".sidenav").addClass("fixed");
      } else {
        j$(".sidenav").removeClass("fixed");
      }
    } else {
      if (scroll >= headerheight) {
        j$(".sidenav-fixed").addClass("fixed");
      } else {
        j$(".sidenav-fixed").removeClass("fixed");
      }

    }

  });

  j$(window).resize(showhideMenuOnResize);

  // LEFT nav control
  j$(".app").on("click", ".sidenav-step:not(.disabled)", function () {
    let gotosection = j$(this).data("step");
    console.log("clicked on step: " + gotosection);
    gotoSection(gotosection);
  });


  j$(".app").on("click", ".header-toggle-sidenav", function () {
    j$('#nav-wrapper').toggleClass('open');
    j$('#section-loader').toggleClass('push-right');
    j$('.pr-footer').toggleClass('push-right');

  });

  j$(".app").on("click", ".push-right", function () {
    j$('#nav-wrapper').removeClass('open');
    j$('#section-loader').removeClass('push-right');
    j$('.pr-footer').removeClass('push-right');

  });

  j$(".app").on("click", ".header-toggle-menu", function () {
    j$(".header-dropdown").slideToggle("fast");
  });

  j$(".app").on("click", ".header-application-link", function () {
    gotoSection(1);
    j$(".header-dropdown").slideUp("fast");
    j$("#hamburger-icon").removeClass("active");

  });

  j$(".app").on("click", ".header-edit-profile-link", function () {
    gotoSection(6);
    j$(".header-dropdown").slideUp("fast");
    j$("#hamburger-icon").removeClass("active");
  });



  j$(".app").on("click", ".header-login-link", function () {
    gotoSection(7);
    j$(".header-dropdown").slideUp("fast");
    j$("#hamburger-icon").removeClass("active");
  });




  j$(".app").on("click", ".section-back-btn", function () {
    let gotosection = j$(this).data("target");
    console.log("go back to : " + gotosection);

    gotoSection(gotosection);
  });



  j$(".app").on("click", "#hamburger-icon", function () {
    j$(this).toggleClass("active");
    return false;
  });


  // Mark inputs as "filled" when users type - so we can keep the label up when they leave   
  j$(".app").on("input", ".input", function () {
    if (j$(this).val() !== "" && j$(this).val() !== null && j$(this).val().length > 0) {
      j$(this).parent().addClass("filled").removeClass('error');

    } else {
      j$(this).parent().removeClass("filled");
    }
  });


}