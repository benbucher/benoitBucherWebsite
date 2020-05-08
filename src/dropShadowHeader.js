/*

Author: Benoit Bucher
Date: April 2020

Description:

This script creates a drop shadow animation of the header

*/


$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 0) {
        $("header").addClass("active");
    } else {
        $("header").removeClass("active");
    }
});