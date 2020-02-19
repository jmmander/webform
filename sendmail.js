
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
  var workbook= SpreadsheetApp.getActiveSpreadsheet();
  var worksheet= workbook.getSheetByName("All");
  var templ = HtmlService
      .createTemplateFromFile('emailtemp');
  
  templ.instance = instance;
  
  var message = templ.evaluate().getContent();
  Logger.log(message)
  
  MailApp.sendEmail({
    to: instance.your_email,
    subject: "Your new platform request for " + instance.org_name,
    htmlBody: message
    
      });
    
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
  var searchRange = worksheet.getRange(2,22, lastRow-1, 23);
  var data = searchRange.getValues()
  Logger.log("data")
  Logger.log(data)
  var rows = []
  for (var row = 0; row < data.length; row++)
    if(data[row][0] == "yes" && data[row][1] == "undefined") {
      var row_no = row + 2;
      rows.push(row_no);
    } 
  Logger.log("rows = ")
  Logger.log(rows);
  worksheet.getRange(row, 15).setNumberFormat('dd-mm-yyyy')
  worksheet.getRange(row, 16).setNumberFormat('dd-mm-yyyy')

  rows.forEach(function(row){
    instance = get_instance_details(row)
    sendEmail(row, instance)
    
  })
}

