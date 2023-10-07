const XLSX = require('xlsx');
const fs = require('fs/promises');
const Excel = require('exceljs');


const{html_parser,xml_parsing,xml_ref,html_ref,xml_ref_corres} = require("../Basic Test/current_test.js");
const{xml_path,html_path} =  require("../Basic Test/config.js")

/*async function writeToExcel(data) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  
  //XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //const workbook = new Excel.Workbook();
  //const sheet = workbook.addWorksheet("My Sheet");
  const header = [data.Value];
  const subheader = [];
  subheader[5] = "html_length";
  subheader[6] = "xml_length";
  subheader[7] = "res";
  const cellData = subheader.map((subHeader) => [subheader]);
   const mergeRange = {
    s: { r: 0, c: 0 },
    e: { r: 1, c: 3 },
  };

  //XLSX.utils.sheet_add_aoa(ws, cellData);
  ws['!merges'] = [mergeRange];-
  XLSX.utils.sheet_add_aoa(ws, [header]);
  XLSX.utils.sheet_add_aoa(ws, [subheader]);
  

  // Add the data
  const res = [data.HtmlLength, data.XmlLength, data.Res];
  XLSX.utils.sheet_add_aoa(ws, [res]);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'My Sheet');

  // Define the Excel file name
  const excelFileName = 'test.xlsx';

  try {
    // Write the workbook to a file
    XLSX.writeFile(wb, excelFileName);
    console.log(`Data written to ${excelFileName}`);
  } catch (error) {
    console.error('Error writing to Excel:', error);
  }
}*/

async function writeToExcel(data) {
	const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    const header = ["Value"];
    sheet.addRow("Article ID","Article",header)
    
    //sheet.addRow(header);
    const subHeader = [];
    subHeader[2] = "html_length";
    subHeader[3] = "xml_length";
    subHeader[4] = "res";
    sheet.addRow(subHeader);
    sheet.mergeCells("A1:C1");
    sheet.addRow([1,1,0]);
    
    workbook.xlsx.writeBuffer()
        .then((buffer) => {
            // Save the Excel file to a file on the local filesystem
            const fs = require('fs');
            fs.writeFileSync('output.xlsx', buffer, 'binary');
            console.log('Excel file saved as output.xlsx');
        })
        .catch((error) => {
            console.error('Error writing Excel file:', error);
        });
}
writeToExcel();

async function execution(){
	let a = Object.keys(xml_path);
	let b = Object.keys(html_path);
	const  array = [];
	if(a.length == b.length){
    	for(let currentValue of a){
        	//console.log(i+"");
    		if(currentValue != "References" && currentValue != "Corresponding_Author"){
        	let value = currentValue;
        	if(html_path.hasOwnProperty(value)){
        		//const html_result = await myAsyncFunction_html(html_path[index]);
		        //const xml_result = await myAsyncFunction_xml(xml_path[index]);
            //myAsyncFunction_xml(xml_path[index]);
            //myAsyncFunction_html(html_path[index]);
            //console.log(value.toUpperCase() + ":");
       
				const html_result = await myAsyncFunction_html_ref(html_path[value]);
				const xml_result = await myAsyncFunction_xml_ref(xml_path[value]);
				const html_length = html_result.length;
          		const xml_length = xml_result.length;
          		const res = html_length === xml_length;
          		array.push({
          			Value: value,
            		HtmlLength: html_length,
            		XmlLength: xml_length,
            		Res: res ? 'True' : 'False'
          		});
				/*if(html_result.length == xml_result.length){
					console.log("LengthPassed");
					if (JSON.stringify(html_result) === JSON.stringify(xml_result)) {
            			console.log("Content is equal");
          			}
				}
				else{
					console.log("LengthFailed");
					if (JSON.stringify(html_result) != JSON.stringify(xml_result)) {
            			console.log("Content is not equal");
          			}
				}*/
				//console.log(value
        	}
            }
        }
        await writeToExcel(array);
    } 
        
}

execution();
async function myAsyncFunction_html(path) {
  try {
    const result = await html_parser(path);
    return result;
  } catch (error) {
    console.error('Error in myAsyncFunction_html:', error);
    throw error;
  }
}

async function myAsyncFunction_xml(path) {
  try {
    const res = await xml_parsing(path);
    return res;
  } catch (error) {
    console.error('Error in myAsyncFunction_xml:', error);
    throw error;
  }
}

async function myAsyncFunction_xml_ref(path) {
  try {
    const res = await xml_ref(path);
    return res;
  } catch (error) {
    console.error('Error in myAsyncFunction_xml_ref:', error);
    throw error;
  }
}

async function myAsyncFunction_html_ref(path) {
  try {
    const res = await html_ref(path);
    return res;
  } catch (error) {
    console.error('Error in myAsyncFunction_html_ref:', error);
    throw error;
  }
}

async function myAsyncFunction_xml_ref_corres_aut(path) {
  try {
    const res = await xml_ref_corres(path);
    return res;
  } catch (error) {
    console.error('Error in myAsyncFunction_html_ref:', error);
    throw error;
  }
}
