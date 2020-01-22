$(document).ready(function() {
  //date validation
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
      $('#imEmail').val($('#requestersEmail').val())
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
      $("#partnerconditional").hide();}
      $("input:email[name='partnerEmail']").removeAttr("required");
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
  
  
  });


  




  $("#submit").on("click", function(e) {
    
     //sets dateTime to submitted datetime for timestamp
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" +          today.getSeconds();
    var dateTime = date+' '+time;
    $('input[name="dateTime"]').val(dateTime)
    
    //server side data validation
   //checks required fields are not empty and shows error message
  let valid = true;
  $('[required]').each(function() {
    if ($(this).is(':invalid') || !$(this).val()) 
    {valid = false;
    var element = $(this).attr('name');
     if (element == "requestersEmail") {
       alert($('#ngreqEmailError').hasClass("ng-hide"))
       if ($('#ngreqEmailError').hasClass("ng-show"))
       {
         $('#reqEmailError').show();
      }
     }
     
     if (element == 'imEmail')
       {$('#imEmailError').show();}
     if (element == 'customerEmail')
       {$('#custEmailError').show();}
     if (element == 'customerOrgName')
       {$('#orgNameError').show();}
     if (element == 'platform') 
      {$("#platformError").show();}
     if (element == 'partnerEmail') 
      {$("#partnerEmailError").show();}
     if (element == 'office')
       {$("#officeError").show();}
     if (element == 'trainingLocation')
       {$("#trainingLocationError").show();}
     if (element == 'adminTraining')
       {$("#adminError").show();}
     if (element == 'noStudios')
       {$("#noStudiosError").show();}
     if (element == 'startDate')
       {$("#startDateError").show();}
     if (element == 'endDate')
       {$("#EndDateError").show();}
     }
  })
  if (!valid) 
    {alert("Please fill in all requried fields");
    return false;}


    
  function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
     $("input[type='email']").each(function() {
       email = $(this).val()
       if (email != "")
         {var validEmail = validateEmail(email);
          if (!validEmail){
            var whichEmail = $(this).attr('name');
            console.log(whichEmail);
            return false}
      }
     });
   
 
 var $form = $("form#requestForm"),
    url = "https://script.google.com/macros/s/AKfycbwo0JNckKfRpkSUOVGFuWTBH2LjWy4_OMtZXrVWi4VT4ZUcyio/exec";
    
    e.preventDefault();
    var jqxhr = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: $form.serializeObject()
    }).success(alert("your form has been submitted"));
  });

