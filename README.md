# Webform
Unofficial Platform Request Form

This form is used to submit platform requests. This provides dynamic client-side data validation with angular along with robust server-side data validation and sanitization with jQuery.
Data is currently written to the Google Sheets platform.

# TO USE:
1. Set up the google sheet and wep app as per the following link. This will be under the heading "Configuring the Google Script": https://medium.com/@dmccoy/how-to-submit-an-html-form-to-google-sheets-without-google-forms-b833952cc175

2. When you have the webapp URL, open the webform.js file and replace the "#INSERT URL HERE" comment with the url.

3. Ensure the input names in the webform.html file are the same as the headings in your googlesheet, any changes will have to be reflected in the webform.js and webform.css files too.

4. If using the "send me a copy of my request" checkbox, add two more column headers to the end of the googlesheet, named "sendCopy" and "emailSent" respectively.

5. If the header row of your googlesheet is not row 2, open the google apps script and find the variable declarations for headRow and headers, replace the rowNo with your header row number as follows: 

  > var headRow = e.parameter.header_row || rowNo;
  
  > var headers = sheet.getRange(rowNo, 1, 1, sheet.getLastColumn()).getValues()[0];
  
5. In the google sheets google script editor, create two new files, sendemail.gs and emailtemp.html. Copy and paste the code from these files to your google script files.

6. In the google script editor create a timedriven trigger on lastrow to run every minute.


# LICENCE
Copyright 2019 Jacqueline Mander

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
