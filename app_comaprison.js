const fs = require('fs');
const path = require('path');
const libxmljs = require('libxmljs2');
const stringSimilarity = require('string-similarity');
const Excel = require('exceljs');
const{xml_paths,html_paths} =  require("../Basic_Test/config.js")
require('dotenv').config();
const filepath = process.env.FILE_PATH;


async function main(filepath) {

  //Each iteration -> html_path,xml_path of files in directories of test
  const filesAndDirs = fs.readdirSync(filepath);    //[ 'test1', 'test2 cp' ]
  for (let [index,item] of filesAndDirs.entries()) {
    let html_path = '';
  let xml_path = '';
    const itemPath = path.join(filepath, item);     //C:\Node\Basic_Test\test\test1,C:\Node\Basic_Test\test\test2 cp
    if (fs.statSync(itemPath).isDirectory()) {
      const filesDirs = fs.readdirSync(itemPath);  
       for (const item of filesDirs) {
        if(item.endsWith('.htm')){
            html_path = path.join(itemPath, item);
            //res.push(html_path);
          }
          if (item.endsWith('.xml')) {
          xml_path = path.join(itemPath, item);
            }
        }
        
    } 
    else {
      console.log('Expected a directory');
    }



    //Parsing html,xml data and getting xml,html doc
    const html_data = fs.readFileSync(html_path, 'utf-8');
    const xml_data = fs.readFileSync(xml_path, 'utf-8');
    const htmlDoc = libxmljs.parseHtml(html_data);
    const xmlDoc = libxmljs.parseXml(xml_data);
    let array = [];
    let avg = 0;
  if(xml_paths.length == html_paths.length){
    for(let [index,currentValue] of html_paths.entries()){
      //currentValue - { Article_Title: [ '//*[@class-name="ArtTitle"]' ], Comparison: true }
      let a = Object.keys(xml_paths[index]);  //[ 'Article_Title' ]
      let b = Object.keys(html_paths[index]); //[ 'Article_Title', 'Comparison' ]
          let col_head = a[0];
          let comp = b[1];
          if(html_paths[index].hasOwnProperty(col_head)){
            
            const html_result = getElementTextArray(htmlDoc,html_paths[index][col_head]);
            const xml_result = getElementTextArray(xmlDoc,xml_paths[index][col_head]);
                const html_length = html_result.length;
                const xml_length = xml_result.length;
                const res = html_length === xml_length;
                if(html_paths[index][comp] == true){
                  let count = 0;
                for (const htmlElement of html_result) {
                    for (const xmlElement of xml_result) {
                        if (isStringSimilar(htmlElement, xmlElement,currentValue)) {
                          count++;
                          break;
                        }
                    }
                }
                const percent = Math.round((count/xml_length)*100);
                const r = percent + "%";

                avg += percent;
                array.push({
                    Index : index,
                    Value: col_head,
                    HtmlLength: html_length,
                    XmlLength: xml_length,
                    Res: r,
                    xml : xml_result,
                    html : html_result,
                    avg_data : avg
                });
                }
                else{
                let r = '';
                if(res){
                  r = 100;
                }
                else{ 
                  if(xml_length > html_length){
                    r = Math.round((html_length/xml_length)*100);
                  }
                  else{
                    r = Math.round((xml_length/html_length)*100);
                  }
                }

                avg += r;
                console.log(avg);
                array.push({
                    Index : index,
                    Value: col_head,
                    HtmlLength: html_length,
                    XmlLength: xml_length,
                    Res: r+"%",
                    xml : " ",
                    html : "html_result",
                    avg_data : avg
                });


                }
                
            }
          //}
        
        }
    }
    console.log(array);
    await writeToExcel(array,index);
    }
    
  }


main(filepath);


function getElementTextArray(Doc,path){
  
  let result = [];
  if(path.length == 1){
    const res = Doc.find(path[0]);
      for(var i=0;i<res.length;i++){
        const str = res[i].text();
        const str_mod = removeSpaces_And_SpecialChars(str);
        result.push(str_mod);
      }
  }
  else{
    let main_element = Doc.find(path[0])
    for (const element of main_element){
      console.log(element.text())
      let str = "";
      for(const subPath of path.slice(1)){
        console.log('subpat: ',subPath)
        text = element.get(subPath);
        
        if(text != null){
          str += text.text();
        }
        
      }
      const str_mod = removeSpaces_And_SpecialChars(str);
      result.push(str_mod);
    }
  }
  return result;
}



function removeSpaces_And_SpecialChars(inputString) {
      let stringWithoutSpaces = inputString.replace(/\s/g, '');
      let stringWithoutSpecialChars = stringWithoutSpaces.replace(/[^\w]/g, '').toLowerCase();
      return stringWithoutSpecialChars;
}


function isStringSimilar(str1, str2,currentValue) { 
    if(currentValue == "Author"){
      const similarityScore = stringSimilarity.compareTwoStrings(str1, str2);
        return similarityScore >= 0.35;
    } 
      const similarityScore = stringSimilarity.compareTwoStrings(str1, str2);
      return similarityScore >= 0.6;
}




async function writeToExcel(data,ind) {
    let workbook;
    let sheet;

    if (fs.existsSync('output_comp.xlsx')) {
        // If the file exists, read it
        workbook = new Excel.Workbook();
        await workbook.xlsx.readFile('output_comp.xlsx');
        sheet = workbook.getWorksheet("My Sheet");
    } else {
        // If the file doesn't exist, create a new workbook and sheet
        workbook = new Excel.Workbook();
        sheet = workbook.addWorksheet("My Sheet");
    }

    const len = data.length; // Use data.length to get the array length


    let columnNumber = 3;
    if(ind == 0){
        sheet.getCell("A1").value = "Article ID";
        sheet.getCell("B1").value = "Article Type";
        sheet.mergeCells("A1:A2");
        sheet.mergeCells("B1:B2");
        sheet.getCell("A3").value = 1;
        sheet.getCell("AP1").value = "Net Average";
        sheet.mergeCells("AP1:AP2");

      for (let i = 0; i <= len-1; i++) {
        sheet.getCell(1, columnNumber).value = data[i].Value;
        sheet.mergeCells(1, columnNumber, 1, columnNumber + 2);
        sheet.getCell(2, columnNumber).value = "html_length";
        sheet.getCell(2, columnNumber+1).value = "xml_length";
        sheet.getCell(2, columnNumber+2).value = "res";

        sheet.getCell(3, columnNumber).value = data[i].HtmlLength;
        sheet.getCell(3, columnNumber+1).value = data[i].XmlLength;
        sheet.getCell(3, columnNumber+2).value = data[i].Res;
        columnNumber += 3;
     }
     sheet.getCell(3,columnNumber).value = (Math.round((data[len-1].avg_data)/len)) + "%";
    }
  else{
    columnNumber = 3;
    sheet.getCell(ind+3,1).value = ind+1;
    for (let i = 0; i <= len-1; i++) {
        sheet.getCell(ind+3, columnNumber).value = data[i].HtmlLength;
        sheet.getCell(ind+3, columnNumber+1).value = data[i].XmlLength;
        sheet.getCell(ind+3, columnNumber+2).value = data[i].Res;
        columnNumber += 3;
    }
    sheet.getCell(ind+3,columnNumber).value = (Math.round((data[len-1].avg_data)/len)) + "%";

  }
    await workbook.xlsx.writeFile('output_comp.xlsx');
    console.log('Excel file updated with new data.');
}