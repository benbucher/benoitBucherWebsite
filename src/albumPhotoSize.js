/*

Author: Benoit Bucher
Date: April 2020

Description:

This script will be called by each html album page to generate the width and margin of the photo from the current album. This script is generic and can be called by all the album pages without changing anything in the script

*/


// aspect ratio of screen
if ((window.innerWidth / window.innerHeight) > 1) {
    // lanscape screen
    // max width for landscape set to smaller value
    widthBound = [25, 60];
} else {
    // portrait screen 
    // max width for portrait set to bigger value
    widthBound = [40, 90];
}

// retrieve the name of the html page that called this current script
var callerPagePath = window.location.pathname;
// only keep the last slash plus the file name and extension
var callerPageName = callerPagePath.substring(callerPagePath.lastIndexOf('/'));
//alert(callerPageName);

// remove the extension
callerPageName = callerPageName.replace(/\.[^/.]+$/, "")

// build url of the corresponding json file
var requestURL = './albums' + callerPageName + callerPageName + '.json';
//alert(requestURL);


// create the XHR request
var req = new XMLHttpRequest();
req.responseType = 'json';
req.open('GET', requestURL, true);
req.onload = function() {

    // store response
    var jsonResponse = req.response;

    // extract each field of the JSON
    var albumNumber = jsonResponse.album_info.number;
    var title = jsonResponse.album_info.title;
    var date = jsonResponse.album_info.date;
    var descr = jsonResponse.album_info.description;
    var photoList = jsonResponse.album_info.photoList;

    // update html content with data from JSON file
    document.querySelector('.photoAlbumTitle h2').innerHTML = title;
    document.querySelector('.photoAlbumTitle p').innerHTML = date;
    document.querySelector('#album000page section .textFont').innerHTML = descr;

    // initialize the final HTML text to insert for the photos
    var allPhotos = "";
    var allModalPhotos = "";

    // go through all the photos of the table
    for (var i = 0, c = photoList.length; i < c; i++) {

        // rebuild id tag for each photo number of the album
        var catAlbumAndPhotoNumber = albumNumber + '_photo_' + String(pad(i + 1, 3));
        //alert(catAlbumAndPhotoNumber);

        // build src and alt tag
        var srcAndAlt = 'src="albums/' + albumNumber + '/' + photoList[i] + '" alt="' + catAlbumAndPhotoNumber + '"';

        // build each picture i
        var pictureString = '<img id="' + catAlbumAndPhotoNumber + '" ' + srcAndAlt + ' loading="lazy"' + ' onclick="openModal();currentSlide(' + eval(i + 1) + ')" class="hover-shadow"' + '> \n';

        // build each modal picture i
        var modalPictureString = '<div class="mySlides"> \n <div class="numbertext subtitleFont">' + eval(i + 1) + '/' + photoList.length + '</div> \n <img ' + srcAndAlt + '> \n </div> \n';

        // concatenate the string of all pictures
        allPhotos = allPhotos + pictureString;
        allModalPhotos = allModalPhotos + modalPictureString;

    }

    // build the fixed html parts to add
    var fixedPart1 = '<div id="myModal" class="modal"> \n <div class="close" onclick="closeModal()"></div> \n <div class="prev" onclick="plusSlides(-1)"></div> \n <div class="next" onclick="plusSlides(1)"></div> \n <div class="modal-content"> \n'
    var fixedPart2 = '</div> \n </div> \n';

    // concatenate the whole html part to add
    var allHtml = allPhotos + fixedPart1 + allModalPhotos + fixedPart2;
    //alert(allHtml);

    // add total string to the innerHtml after the end of the for loop
    document.querySelector('#albumPhotosContainer').innerHTML = allHtml;


    // build album number plus photo prefix
    albumNumber = albumNumber + '_photo_';

    // call the function to compute and apply margins
    computeAndApplyMargins(albumNumber, photoList.length, widthBound);

};
req.send(null);




// function to compute and apply margins for each picture in the html file
function computeAndApplyMargins(albumNumber, numberOfImg, widthBound) {

    // go through the list of pictures of the album
    for (var i = 0, c = numberOfImg; i < c; i++) {

        // draw random width
        var width = getRandomSize(widthBound[0], widthBound[1]); // the width of the picture is between 20% and 85% of the container width

        // TODO? add condition for portrait picture to draw the size between 20 and 70 for landscape screens
        // TODO? consider the option to have the horizontal margin, only on the left and nothing on the right, to better center the pictures horizontally

        // draw random margins
        var marginHorizontal = 0.8 * getRandomSize(0, (100 - width)); // the sum of the left and right margin shall be between 0% and (100%-width)
        var horizontalSplit = getRandomSize(2, 8) / 10; // draw the repartition between left and right margin while ensureing minimum margin on left and right max desequilibrium set to 0.2 vs 0.8
        var marginTop = 24 * getRandomSize(1, 6);
        var marginBottom = 24 * getRandomSize(1, 6);

        // rebuild id tag for each photo number of the album
        var catAlbumAndPhotoNumber = eval(albumNumber + String(pad(i + 1, 3)));

        // apply width
        catAlbumAndPhotoNumber.style.width = String(width) + '%';

        // apply margins at the format margin = marginTop marginRight marginBottom marginLeft
        catAlbumAndPhotoNumber.style.margin = String(marginTop) + 'px ' + String(marginHorizontal * (1 - horizontalSplit)) + '% ' + String(marginBottom) + 'px ' + String(marginHorizontal * horizontalSplit) + '%';

    }
}

// random draw function
function getRandomSize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// leading zero padding function
function pad(num, size) {
    return ('000000000' + num).substr(-size);
}






/*

// retrieve the list of all the img tags in the container #albumPhotosContainer
var imgTableList = document.querySelectorAll('#albumPhotosContainer img');
var numberOfImg = imgTableList.length;

// get the album number from the first picture id name
var albumNumber = imgTableList[0].id.slice(0, -3); // remove the last three characters containing the photo number

// call the function to compute and apply margins
computeAndApplyMargins(albumNumber, numberOfImg);

*/


/*
var request = new XMLHttpRequest();
request.open("GET", "/albums/album_001/album_001.json", false);
request.send(null)
var my_JSON_object = JSON.parse(request.responseText);
alert(my_JSON_object.album_001_info.description);
*/