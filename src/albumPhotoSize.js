/*

Author: Benoit Bucher
Date: April 2020

Description:

This script will be called by each html album page to generate the width and margin of the photo from the current album. This script is generic and can be called by all the album pages without changing anything in the script

*/

//import config from '.albums/album_001/album_001.json';
//const data = requirejs('.albums/album_001/album_001.json');


// -------------------------
// STAR - IMPLEMENT NEW FILE

// retrieve the name of the html page that called this current script
var callerPagePath = window.location.pathname;
var callerPageName = callerPagePath.substring(callerPagePath.lastIndexOf('/') + 1);
alert(callerPageName);

// retrieve list of images from the folder album
//var fs = require('fs');
//var files = fs.readdirSync('/albums/album_001/');
//alert(files);

// Try to retrieve album data from a json file
var requestURL = 'albums/album_001/album_001.json';
var request = new XMLHttpRequest();
// Open json file
request.open('GET', requestURL);
// Retrieve data
var superHeroesText = request.response;

/*request.responseType = 'json';
request.send();

request.onload = function() {
    var superHeroes = request.response;
    populateHeader(superHeroes);
}

function populateHeader(jsonObj) {
    var myH1 = jsonObj['description'];
    alert(myH1);
}*/



/*function readJSON(path) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'json';
    xhr.onload = function(e) {
        if (this.status == 200) {
            var file = new File([this.response], 'temp');
            var fileReader = new FileReader();
            fileReader.addEventListener('load', function() {
                //do stuff with fileReader.result

            });
            fileReader.readAsText(file);
        }
    }
    xhr.send();
}*/

//var rData = JSON.parse('{"myparam": "myString"}');
// var tData = JSON.parse("./albums/album_001/album_001.json");

/*var request = new XMLHttpRequest();
request.open("GET", "/albums/album_001/album_001.json", false);
request.send(null)
var my_JSON_object = JSON.parse(request.responseText);
alert(my_JSON_object);*/



var tData = JSON.parse(albumJsonData);


// END - IMPLEMENT NEW FILE
// ------------------------



// retrieve the list of all the img tags in the container #albumPhotosContainer
var imgTableList = document.querySelectorAll('#albumPhotosContainer img');

// get the album number from the first pivture id name
var albumNumber = imgTableList[0].id.slice(0, -3); // remove the last three characters containing the photo number

// go through the list of pictures of the album
for (var i = 0, c = imgTableList.length; i < c; i++) {

    // draw random width
    var width = getRandomSize(20, 95); // the width of the picture is between 20% and 95% of the container width

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

    // apply margins
    catAlbumAndPhotoNumber.style.marginLeft = String(marginHorizontal * horizontalSplit) + '%';
    catAlbumAndPhotoNumber.style.marginRight = String(marginHorizontal * (1 - horizontalSplit)) + '%';
    catAlbumAndPhotoNumber.style.marginTop = String(marginTop) + 'px';
    catAlbumAndPhotoNumber.style.marginBottom = String(marginBottom) + 'px';

}


// random draw function
function getRandomSize(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// leading zero padding function
function pad(num, size) {
    return ('000000000' + num).substr(-size);
}