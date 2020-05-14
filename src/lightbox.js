/*

Author: Benoit Bucher
Date: April 2020

Description: this script will create the lightbox for each photo album.

*/


// Open the Modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    //alert(slides.length);
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}


// Add controls for the modal to go left and right and echap with the keyboard as well
document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        // left arrow
        if (document.getElementById("myModal").style.display == "block") {
            // the modal is open so go left
            plusSlides(-1);
        }
    } else if (e.keyCode == '39') {
        // right arrow
        if (document.getElementById("myModal").style.display == "block") {
            // the modal is open so go right
            plusSlides(1);
        }
    } else if (e.keyCode == '27') {
        // echap
        if (document.getElementById("myModal").style.display == "block") {
            // the modal is open so close it
            closeModal();
        }
    }
}