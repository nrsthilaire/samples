j$('.app').on('change', '.uploader-input', function () {
  var upContainer = j$(this).parent().parent().parent(); // uploader-container
  var upPreview = upContainer.find('.upload-preview');
  var upForm = upContainer.find('.uploader-form');
  var upData = upContainer.find('.uploader-data');

  var file = this.files[0];
  var imageType = /image.*/;

  var fr = new FileReader();
  fr.fileName = file.name;
  if (file.type.match(imageType)) {
    console.log('File Supported');

    fr.onload = function (e) {
      e.target.result
      html = '<input type="hidden" name="data" value="' + e.target.result.replace(/^.*,/, '') + '" >';
      html += '<input type="hidden" name="mimetype" value="' + e.target.result.match(/^.*(?=;)/)[0] + '" >';
      html += '<input type="hidden" name="filename" value="' + e.target.fileName + '" >';
      html += '<input type="hidden" name="username" value="' + userName + '" >';
      upData.empty().append(html);

      upPreview.innerHTML = "";

      var img = new Image();
      img.src = fr.result;

      upPreview.append(img);

    }
    fr.onloadend = function (e) {
      upForm.submit();
    }
    fr.readAsDataURL(file);

  } else {
    upPreview.innerHTML = "Please select a .jpg, .png, or .pdf file.";
  }

});

var liabilityUploaded = false;

j$('.app').on('submit', '.uploader-form', function () {
  var upContainer = j$(this).parent(); // uploader-container
  var upLoader = upContainer.find('.loader');
  var upSuccess = upContainer.find('.success-check');
  var upButton = upContainer.find('.upload-btn-text');

  $.ajax({
    url: j$(this).attr('action'),
    type: 'POST',
    data: j$(this).serialize(),
    success: function () {
      console.log('form submitted.');
      upContainer.addClass('success');
      j$('.uploader-message').text('');
    },
    beforeSend: function () {
      // Code to display spinner
      console.log('uploading....');
      upLoader.addClass('active');
      upContainer.addClass('active');
      //mixpanel.track("GL UPLOADER - uploading"); 

    },
    complete: function () {
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




// DRAG/DROP and Upload

function uploadFile(files, uploader) {

  var upContainer = uploader; // uploader-container
  var upPreview = upContainer.find('.upload-preview');
  var upForm = upContainer.find('.uploader-form');
  var upData = upContainer.find('.uploader-data');

  var file = files;
  var imageType = /image.*/;

  var reader = new FileReader();
  reader.fileName = file.name;


  if (file.type.match(imageType)) {
    console.log('File Supported');

    reader.onload = function (e) {
      e.target.result
      html = '<input type="hidden" name="data" value="' + e.target.result.replace(/^.*,/, '') + '" >';
      html += '<input type="hidden" name="mimetype" value="' + e.target.result.match(/^.*(?=;)/)[0] + '" >';
      html += '<input type="hidden" name="filename" value="' + e.target.fileName + '" >';
      html += '<input type="hidden" name="username" value="' + userName + '" >';
      upData.empty().append(html);

      upPreview.innerHTML = "";

      var img = new Image();
      img.src = reader.result;

      upPreview.append(img);

    }
    reader.onloadend = function (e) {
      upForm.submit();
    }
    reader.readAsDataURL(file);

  } else {
    upPreview.innerHTML = "Please select a .jpg, .png, or .pdf file.";
  }

}

j$('.app').on('dragover', '.uploader-container', function (event) {
  event.preventDefault();
  event.stopPropagation();
  j$(this).addClass('active');
  console.log("drag detected");
});

j$('.app').on('dragleave', '.uploader-container', function (event) {
  event.preventDefault();
  event.stopPropagation();
  j$(this).removeClass('active');
  console.log("stop drag");
});



j$('.app').on('drop', '.uploader-container', function (event) {

  console.log('File dropped');

  event.preventDefault(); // Prevent default behavior (Prevent file from being opened)

  var dt = event.dataTransfer || (event.originalEvent && event.originalEvent.dataTransfer);
  var files = event.target.files || (dt && dt.files);
  if (files) {
    uploadFile(files[0], j$(this));
    console.log('filename: ' + files[0].name);
  } else {
    // Perhaps some kind of message here
  }

  j$(this).removeClass('active');
  j$(this).addClass('success');
  console.log("Dropped!");
});