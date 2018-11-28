
    const URL = 'http://localhost:3100/api/v1/';
// switch nav bar
function toggleSidebar() {
    var m = document.getElementById("sidebar");
    m.style.display = "block";
    
}
// close
function closeSidebar() {
    var m = document.getElementById("sidebar");
    m.style.display = "none";
    
}

window.addEventListener('scroll', function() {
    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    var val = document.getElementsByClassName("on-scroll-shadow");

});
