$(document).ready(function() {
$('#new_logo').on('mouseenter click', function() {
    var el = $(this);
    el.addClass('animation');
   setTimeout(function() {
     el.removeClass('animation');
   }, 1000);
   })
});