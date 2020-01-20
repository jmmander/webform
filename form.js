$(document).ready(function() {
  //sets valid dates in selector 
  Date.prototype.yyyymmdd = function() {
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    var date1 = [
      this.getFullYear(),
      mm.length === 2 ? "" : "0",
      mm,
      dd.length === 2 ? "" : "0",
      dd
    ].join(""); // padding
    var formattedDate =
      date1.slice(0, 4) + "-" + date1.slice(4, 6) + "-" + date1.slice(6, 8);
    return formattedDate;
  };

  var date = new Date();
  var minDate = date.yyyymmdd();
  $('input[name="startDate"]').prop("min", minDate);
  $('input[name="endDate"]').prop("min", minDate);

  //hides IM email if I am the IM is checked and sets IM email
  $("#implementationManager").change(function() {
    if (this.checked) {
      $("#IMconditional").hide();
      $('#imEmail').val( $('#requestersEmail').val())
      //var imEmail = //$("name='requestersEmail']").val();
      //$("input:email[name='imEmail']").val(imEmail);
    } else {
      $("#IMconditional").show();
    }
  });

  //Shows partner training if partner training checked
  $("input[name='platform']").change(function() {
    if (this.id == "PartnerTraining") {
      $("#partnerconditional").show();
      $("input:email[name='partnerEmail']").prop("required", true);
    } else {
      $("#partnerconditional").hide();
      $("input:email[name='partnerEmail']").removeAttr("required");
    }
  });

  //hides and sets SSH, automation and hadoop if admin training selected
  $("input[name='adminTraining']").change(function() {
    if (this.id == "yes") {
      $(".adminconditional").hide();
      
      $('input[name="API"]')[0].checked = true;
      $('input[name="SSH"]')[0].checked = true;
      $('input[name="Hadoop"]')[0].checked = true;
    } else {
      $(".adminconditional").show();
    }
  });

  //hides kubernetes and sets response to false
  $("#kubernetes").hide();
  $('input[name="Kubernetes"]')[1].checked = true;
  
 function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

  var $form = $("form#requestForm"),
    url =
      "https://script.google.com/macros/s/AKfycbwo0JNckKfRpkSUOVGFuWTBH2LjWy4_OMtZXrVWi4VT4ZUcyio/exec";

  $("#submit").on("click", function(e) {
     //sets dateTime to submitted datetime for timestamp
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" +          today.getSeconds();
    var dateTime = date+' '+time;
    $('input[name="dateTime"]').val(dateTime)
    
    //server side data validation
    //creates variables
   	var reqEmail =  $('input[name="requestersEmail"]').val()
    var imCheck = $('input[name="implementationManager"]').val()
    var imEmail = $('input[name="imEmail"]').val()
    var trainerEmail = $('input[name="trainerEmail"]').val()
    var customerEmail =$('input[name="customerEmail"]').val()
    var customerOrgName = $('input[name="customerOrgName"]').val()
    var platform = $("input[name='platform']:checked").val();
    var partnerEmail = $('input[name="partnerEmail"]').val();
    var office = $('input[name="office"]').val(); 
    var trainingLocation = $('input[name="trainingLocation"]').val(); 
    var adminTraining = $("input[name='adminTraining']:checked").val();
    var noStudios = $('input[name="noStudios"]').val();
    var usersPerStudio = $('input[name="usersPerStudio"]').val();
    var startDate = $('input[name="startDate"]').val(); 
    var endDate = $('input[name="endDate"]').val(); 
    var API = $("input[name='API']:checked").val();
    var SSH = $("input[name='SSH']:checked").val();
    var Hadoop = $("input[name='Hadoop']:checked").val();
    var Kubernetes = $("input[name='Kubernetes']:checked").val();
    var sendCopy = $('input[name="sendCopy"]').val()
    
    //email validation
    var emails = [reqEmail, imEmail, trainerEmail, customerEmail, partnerEmail]
    //for (email of emails) 
      //{if (!$(this).prop('required')){
        //if (!$(this).val().length === 0){
          //validateEmail(email)}}
       //else if ($(this).prop('required')){
        //if (!$(this).val().length === 0){
          //validateEmail(email)
        //}}
          
      
    
    
    
    
    e.preventDefault();
    var jqxhr = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: $form.serializeObject()
    }).success(alert("your form has been submitted"));
  });
});
