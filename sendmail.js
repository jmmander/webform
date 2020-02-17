function sendMail(row){
  
  var workbook= SpreadsheetApp.getActiveSpreadsheet();
  var worksheet= workbook.getSheetByName("All");
  
  var values = worksheet.getRange(row, 1, row,20).getValues();
  var rec = values[0];
  
  var details = {
    req_email: rec[1],
        im_email : rec[3],
        trainer_eamil: rec[4],
    cust_email: rec[5],
  }
  var emailInput = worksheet.getRange("B" + row).getValue() 
  var IMinput = worksheet.getRange("D" + row).getValue();
  var trainerInput = worksheet.getRange("E" + row).getValue();
  var customerEmailInput = worksheet.getRange("F" + row).getValue();
  var orgInput = worksheet.getRange("G" + row).getValue();
  var kindInput = worksheet.getRange("H" + row).getValue();
  var partnerInput = worksheet.getRange("I" + row).getValue();
  var officeInput = worksheet.getRange("J" + row).getValue();
  var locationInput = worksheet.getRange("K" + row).getValue();
  var adminInput = worksheet.getRange("L" + row).getValue();
  var noDSSInput = worksheet.getRange("M" + row).getValue();
  var noUserInput = worksheet.getRange("N" + row).getValue();
  var creationInput = worksheet.getRange("O" + row).getValue();
  var lastDayInput = worksheet.getRange("P" + row).getValue();
  var APIinput = worksheet.getRange("Q" + row).getValue();
  var SSHinput = worksheet.getRange("R" + row).getValue();
  var CDHinput = worksheet.getRange("S" + row).getValue();
  var k8sinput = worksheet.getRange("T" + row).getValue();
  
  
  
 
 var message = 
  
  MailApp.sendEmail(emailInput, "Your platform request for " + orgInput, {htmlBody: message})
  Logger.log("sent email")
}

function lastRow(){
  var workbook= SpreadsheetApp.getActiveSpreadsheet();
  var worksheet= workbook.getSheetByName("All");
  var rangeData = worksheet.getDataRange();
  var lastCol = rangeData.getLastColumn();
  var lastRow = rangeData.getLastRow();
  var searchRange = worksheet.getRange(2,21, lastRow-1, 22);
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

  rows.forEach(function(row){
    sendMail(row);
    cell = "V" + row.toString()
    Logger.log(cell)
    worksheet.getRange(cell).setValue('sent');
  })
               }

