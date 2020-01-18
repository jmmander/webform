$(document).ready(function() {
  //sets min date to today
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
      var imEmail = $("input:email[name='requestersEmail']").val();
      $("input:email[name='imEmail']").val(imEmail);
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
  $("input[name='AdminTraining']").change(function() {
    if (this.id == "yes") {
      $(".adminconditional").hide();
      $("input:radio[name='Automation/API']").prop("checked", true);
      $("input:radio[name='SSH']").prop("checked", true);
      $("input:radio[name='Hadoop']").prop("checked", true);
    } else {
      $(".adminconditional").show();
    }
  });

  //hides kubernetes and sets response to false
  $("input:radio[name='Kubernetes']").prop("checked", false);
  $("#kubernetes").hide();
});
