$(document).ready(function() {
  

  //gets today's date and formats it 
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
  $('input[name="Creation"]').prop("min", minDate);
  $('input[name="LastDay"]').prop("min", minDate);

  //hides IM email if I am the IM is checked and sets IM email
  $("#implementationManager").change(function() {
    if (this.checked) {
      $("#IMconditional").hide(300);
      $('#imEmail').val($('#requestersEmail').val());
    } else {
      $("#IMconditional").show(300);
	  $("#IMconditional").css("display", "inline-block");
    }
  });
  
  
  //Shows partner training if partner training checked
  $("input[name='Kind']").change(function() {
    if (this.id == "PartnerTraining") {
      $("#partnerconditional").show(300);
	  $("#partnerconditional").css("display", "block");
      $("input[name='Partner']").prop("required", true);
    } else {
      $("#partnerconditional").hide(300);
      $("input[name='Partner']").removeAttr("required");
      $("input[name='Partner']").val("");}
    });
  

  //hides and sets SSH, automation and hadoop if admin training selected
  $("input[name='Admin']").change(function() {
    if (this.id == "yes") {
      $(".adminconditional").hide(300);
      $('input[name="API"]')[0].checked = true;
      $('input[name="SSH"]')[0].checked = true;
      $('input[name="CDH"]')[0].checked = true;
    } else {
      $(".adminconditional").show(300);
	  $("#adminconditional").css("display", "block");
    }
  });

  //hides kubernetes and sets response to false
  $("#kubernetes").hide();
  $('input[name="k8s"]')[1].checked = true;
 
 
  function validEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  } 
  
$("input[name='Trainer']").change(function() {
  if ($(this) != ""){
    var email = ($(this).val());
    if (validEmail(email))
      {$(this).css('border', '2px solid #28b1ab');}
  }});
    
  function epochDate(date){
      var listDate = date.split('-');
      console.log(listDate)
      var typeDate = new Date(listDate[0], (listDate[1] - 1), [listDate[2]]);
      timestamp = typeDate.getTime() /1000
      console.log("here")
      console.log(timestamp)
      return timestamp
 
  }
    
//reads dataset and checks training names over period
   
    $("#checkName").on("click", function(e) {
       var trainingName = $('#customerOrgName').val().toLowerCase();
       var start = $('input[name="Creation"]').val();
       var end = $('input[name="LastDay"]').val(); //not needed
       var now = Math.round((new Date()).getTime() / 1000);

       if (!trainingName)
           {alert("Please enter a name and try again")}
       else if (!start || !end)
           {alert("Please enter a start and end date for the training and try again")}
       else
       {
        var epochStart = epochDate(start)
        var epochEnd = epochDate(end) 
        //creates a string that is then ingested by DSS and used to return training names during the requested period + 1week
        var filtering = "endPlusWeek > " + String(epochStart); 
        console.log(filtering);
        dataiku.fetch('test_with_dates_prepared', {filter : filtering },
        function(dataFrame) {
        console.log(dataFrame)
        column_values = dataFrame.getColumnValues("Organization");
        console.log(column_values);
        if (column_values.includes(trainingName)){
            $("#submit").css('background-color', 'rgb(255, 141, 141)');
            alert("The orgainzation name you have selected is already in use for the selected period. Please choose another name and try again");
        }
       else
       {alert("The organization is unique and may be used!");
           $("#submit").css('background-color','c0f1ef');
           $("#checkName").css('background-color','c0f1ef');
           $("#checkName").html('Re-check name');}
        
           
    })
       }});
      
    




//when submit is pressed...
  $("#submit").on("click", function(e) {
    console.log($("#submit").css('background-color'))
    if ($("#submit").css('background-color') != 'rgb(192, 241, 239)')
      {alert("Please check the org name and try again");
      return false;}
      
    //disables  submit button
    $("#submit").attr("disabled", true);
    
    //sets cursor to waiting
    $('body').addClass('waiting');

    //sets dateTime to submitted datetime for timestamp
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    $('input[name="X"]').val(dateTime);
    //server side data validation
    
//sets IM to requesterEmail if not already set
  if ($("#implementationManager").is(':checked')) {
      $('#imEmail').val($('#requestersEmail').val()); 
    };
//overwrites values for admin training
  if (($("input[name='Admin']:checked").val() == 'Yes')) {
    $('input[name="API"]')[0].checked = true;
    $('input[name="SSH"]')[0].checked = true;
    $('input[name="CDH"]')[0].checked = true;
    $('#usersPerStudio').val('1');
  };
  //sets partner email to empty if not a partner training
  if ($("input[name='Kind']:checked").val() != "PartnerTraining") {
    $("input[name='Partner']").val("");
  }

  //changes orgname to lowercase
  var lc = $('#customerOrgName').val().toLowerCase();
  $('#customerOrgName').val(lc)

    
   //Validates required fields and shows error message
  let valid = true;
  $('[required]').each(function() {
    if ($(this).is(':invalid') || !$(this).val()) 
    {valid = false;
    var element = $(this).attr('name');
     if (element == "Email") 
        {$('#reqEmailError').show();}
     if (element == 'IM')
       {$('#imEmailError').show();}
     if (element == 'Customer')
       {$('#custEmailError').show();}
     if (element == 'Org')
       {$('#orgNameError').show();}
     if (element == 'Kind') 
      {$("#platformError").show();}
     if (element == 'Partner') 
      {$("#partnerEmailError").show();}
     if (element == 'Office')
       {$("#officeError").show();}
     if (element == 'Location')
       {$("#trainingLocationError").show();}
     if (element == 'Admin')
       {$("#adminError").show();}
     if (element == 'noDSS')
       {$("#noStudiosError").show();}
     if (element == 'Creation')
       {$("#startDateError").show();}
     if (element == 'LastDay')
       {$("#EndDateError").show();}
     };}
  );
  
        
      //date validation
      var start = $('input[name="Creation"]').val();
      var end = $('input[name="LastDay"]').val();
      var startDate = moment(start);
      var endDate = moment(end);
      var todayDate = moment(date);
      var validDate = startDate.diff(todayDate, 'days');
      var validdate1 = startDate.diff(endDate, 'days');
      var duration = endDate.diff(startDate, 'days');
      if (validDate < 0 || validdate1 > 0) 
          {$("#startDateError").show();
          valid = false}
      else if (duration < 2 || duration > 14)
          {$('body').removeClass('waiting');
          if (!window.confirm("You have selected a duration of " + duration + " days. Please confirm this is correct."))
          {valid=false}
        }
          
      
     
        
        if (!valid) 
        {alert("Please check all fields are filled in correctly and try again");
        $("#submit").attr("disabled", false);
        $('body').removeClass('waiting');
        return false;}   
             



     
        //sends data to google spreadsheet. mostly copypasta
     var $form = $("form#requestForm"),
          url = "https://script.google.com/macros/s/AKfycbzpE_tR6y0aAfWOMhBDAuYa8IdaYqYkhhm8gbU49D1Rvejd97Tc/exec";
          
          e.preventDefault();
          var data = $form.serializeObject()
          var jqxhr = $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: data
          }).done(function()
          {alert("Your request has been successfully submitted!");
           console.log($form.serializeObject());
           $('body').removeClass('waiting');
           location.reload();
           
        });    
    });
});






