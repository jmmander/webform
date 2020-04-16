
function get_instance_details(row) {  
  
  var values = SpreadsheetApp.getActiveSheet().getRange(row, 1,row,21).getValues();
  var rec = values[0];
  
  var instance = 
      {
        your_email: rec[1],
        im_email : rec[3],
        trainer_email: rec[4],
        customer_email: rec[5],
        org_name : rec[6],
        platform_type: rec[7],
        partner_email: rec[8],
        office : rec[9],
        training_location: rec[10],
        admin_training: rec[11],
        no_studios : rec[12],
        no_users_per_studio: rec[13],
        creation_date : rec[14],
        expiration_date : rec[15],
        API: rec[16],
        SSH: rec[17],
        CDH : rec[18],
        autodeploy: rec[20],
      };
  
  Logger.log(instance)
  
   return instance;
}
 


function sendEmail(row, instance)
{
  var subject = "Your new platform request for " + instance.org_name
  var myAliases = GmailApp.getAliases();
  var workbook= SpreadsheetApp.getActiveSpreadsheet();
  var worksheet= workbook.getSheetByName("All");
  var templ = HtmlService.createTemplateFromFile('emailtemp');

  templ.instance = instance;
  Logger.log("instance")
  Logger.log(instance)
  var subject = "Your new platform request for " + instance.org_name;
  var mess = templ.evaluate()
  Logger.log('mess')
  Logger.log(mess)
  var message = mess.getContent();
  Logger.log('message')
  Logger.log(message)
  
  
  GmailApp.sendEmail(
    instance.your_email,         // recipient
    subject,                 // subject 
    'test', {                        // body
      from: myAliases[0],
      replyTo: myAliases[0],
      htmlBody: message                 // advanced options
    }
  ); 

    cell = "W" + row.toString()
    Logger.log(cell)
    worksheet.getRange(cell).setValue('sent'); 
}



function lastRow(){
  var workbook= SpreadsheetApp.getActiveSpreadsheet();
  var worksheet= workbook.getSheetByName("All");
  var rangeData = worksheet.getDataRange();
  var lastCol = rangeData.getLastColumn();
  var lastRow = rangeData.getLastRow();
  var searchRange = worksheet.getRange(3,22, lastRow-1, 23);
  var data = searchRange.getValues()
  Logger.log("data")
  Logger.log(data)
  var rows = []
  for (var row = 0; row < data.length; row++)
    if(data[row][0] == "yes" && data[row][1] != "sent") {
      var row_no = row + 2;
      rows.push(row_no);
    } 
  Logger.log("rows = ")
  Logger.log(rows);
  worksheet.getRange(row, 14).setNumberFormat('mm-dd-yyyy')
  worksheet.getRange(row, 15).setNumberFormat('mm-dd-yyyy')

  rows.forEach(function(row){
    instance = get_instance_details(row)
    sendEmail(row, instance)
    
  })
}
