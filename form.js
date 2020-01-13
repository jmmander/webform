$(document).ready(function() {
$("#ImplementationManager").change(function() {
  if (this.checked) {
    $('#IMconditional').hide();
  } else {
    $('#IMconditional').show();
  }
})

$('input[name=platform]').change(function() {
  if (this.id == "PartnerTraining") {
    $("#partnerconditional").show();
  } else {
    $("#partnerconditional").hide();
  }
})

$('input[name=AdminTraining]').change(function() {
  if (this.id == "yes") {
    $(".adminconditional").hide();
    //set values for hidden stuff!!!! no users = 1
  } else {
    $(".adminconditional").show();
  }
});


});
