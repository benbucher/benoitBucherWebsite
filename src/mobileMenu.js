/* Toggle between adding and removing the "responsive" class to menuCategory when the user clicks on the icon */
function showMobileMenu() {
    var x = document.getElementById("myMenu");
    if (x.className === "menuCategory") {
        x.className += " responsive";
    } else {
        x.className = "menuCategory";
    }
}