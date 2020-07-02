let startLatLng = {
        lat: 37.571663,
        lng: -122.266887
    },
    meter = 0.00062137,
    zipcode = 94404,
    radius = 20,

    markers = [],

    geocoder,
    map,

    icon = './images/map-pin-icon.svg',
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
    }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {

            // Center around the users location
            map.setCenter(results[0].geometry.location);

            addMarker(results[0].geometry.location);
        }
    });


}


// Create our base map object 
function initMap() {
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



var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('business-street')), {
            types: ['geocode']
        });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}



function validateAddress() {
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
        city = cityInput.val(),
        state = stateInput.val(),
        zip = zipInput.val(),


        streetContainer = streetInput.parent(),
        cityContainer = cityInput.parent(),
        stateContainer = stateInput.parent(),
        zipContainer = zipInput.parent();

    if (street.length > 2) {
        streetComplete = true;
    }
    if (city.length > 2) {
        cityComplete = true;
    }
    if (state !== null && state !== undefined) {
        stateComplete = true;
    }
    if (zip.length > 4) {
        zipComplete = true;
    }

    if (streetComplete && cityComplete && stateComplete && zipComplete) {
        console.log('Address Complete!');
        pro.setUserAddress(street, city, state, zip);
        console.log('setting pro.address: ' + pro.address);


        streetContainer.removeClass('error');
        cityContainer.removeClass('error');
        stateContainer.removeClass('error');
        zipContainer.removeClass('error');
        return true;
    } else {
        if (!streetComplete) {
            streetContainer.addClass('error');
        } else {
            streetContainer.removeClass('error');
        }
        if (!cityComplete) {
            cityContainer.addClass('error');
        } else {
            cityContainer.removeClass('error');
        }
        if (!stateComplete) {
            stateContainer.addClass('error');
        } else {
            stateContainer.removeClass('error');
        }
        if (!zipComplete) {
            zipContainer.addClass('error');
        } else {
            zipContainer.removeClass('error');
        }

        return false;

    }

}

function validateCoverageArea() {
    console.log('validating Coverage area....');
    let zipComplete = false,
        radiusComplete = false,
        addressComplete = false,

        zipInput = j$("#workarea-zip"),
        radiusInput = j$("#workarea-radius");

    zipInputContainer = zipInput.parent(),
        radiusInputContainer = radiusInput.parent(),

        zip = zipInput.val(),
        radius = radiusInput.val();

    console.log('validate CoverageArea radius: ' + radius);
    console.log('validate CoverageArea zip: ' + zipcode);

    if (zipcode.length > 4) {
        zipComplete = true;
    } else {
        zipComplete = false;
    }
    if (radius !== 0 || radius !== '0') {
        radiusComplete = true;
    } else {
        radiusComplete = false;
    }
    if (validateAddress()) {
        addressComplete = true;
    } else {
        addressComplete = false;
    }

    if (zipComplete && radiusComplete && addressComplete) {
        console.log('coverage area COMPLETE! ');
        radiusInputContainer.removeClass('error');
        zipInputContainer.removeClass('error');

        pro.coverage.zip = zip;
        pro.coverage.radius = radius;
        console.log('set pro coverage zip: ' + pro.coverage.zip);
        console.log('set pro coverage radius: ' + pro.coverage.radius);

        return true;
    } else {
        if (!zipComplete) {
            zipInputContainer.addClass('error');
        } else {
            zipInputContainer.removeClass('error');
        }
        if (!radiusComplete) {
            radiusInputContainer.addClass('error');
        } else {
            radiusInputContainer.removeClass('error');
        }
        if (!addressComplete) {
            console.log('address not complete');
        }

        return false;

    }

}




let coverageComplete = false;

function initCoverageArea() {
    console.log('init CoverageArea...');

    //initAutocomplete();

    j$('.app').on('keyup', '#workarea-zip', function () {
        updateZip();
    });

    j$('.app').on('change', '#workarea-radius', function () {
        updateRadius();
    });

    j$(".app").on("click", "#coveragearea-submit-btn", function () {
        if (validateCoverageArea()) {
            console.log('CoverageArea COMPLETE! ');
            coverageComplete = true;
            changeStepStatus(3, '1');
            gotoSection(4);
        } else {
            coverageComplete = false;
            console.log('error....');
        }
    });
}