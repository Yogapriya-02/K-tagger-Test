const fs = require('fs');
const path = require('path');
const libxmljs = require('libxmljs2');
const stringSimilarity = require('string-similarity');
const Excel = require('exceljs');
const{xml_paths,html_paths} =  require("../Basic_Test/config.js")
require('dotenv').config();
const filepath = process.env.FILE_PATH;


async function main(filepath) {
  const filesAndDirs = fs.readdirSync(filepath);

  for (let [index, item] of filesAndDirs.entries()) {
    let html_path = '';
    let xml_path = '';
    const itemPath = path.join(filepath, item);

    if (fs.statSync(itemPath).isDirectory()) {
      const filesDirs = fs.readdirSync(itemPath);

      for (const item of filesDirs) {
        if (item.endsWith('.htm')) {
          html_path = path.join(itemPath, item);
        }

        if (item.endsWith('.xml')) {
          xml_path = path.join(itemPath, item);
        }

      }
    } 
    else {
      console.log('Expected a directory');
    }

    if(html_path == ''){
      continue;
    }
    const file_name = item;
    const html_data = fs.readFileSync(html_path, 'utf-8').toString();
    const xml_data = fs.readFileSync(xml_path, 'utf-8').toString();
    const htmlDoc = libxmljs.parseHtml(html_data);
    const xmlDoc = libxmljs.parseXml(xml_data);
    const array = [];
    let avg =0 ;

    if (xml_paths.length === html_paths.length) {
      for (let i = 0; i < xml_paths.length; i++) {
        let xml_obj = xml_paths[i];
        let html_obj = html_paths[i];

        let data_name = Object.keys(xml_obj)[0];

        let comparison = Object.keys(html_obj)[1];
        let isCompare = html_obj[comparison];

        let xml_xpaths = xml_obj[data_name];
        let xml_arr = [];

        for (let xpath in xml_xpaths) {
          xml_arr = getElementTextArray(xmlDoc, xml_xpaths[xpath]);
          if (xml_arr.length !== 0) {
            break;
          }
        }

        let html_xpaths = html_obj[data_name];
        let html_arr = [];

        for (let xpath in html_xpaths) {
          html_arr = getElementTextArray(htmlDoc, html_xpaths[xpath]);
          if (html_arr.length !== 0) {
            break;
          }
        }

        const html_length = html_arr.length;
        const xml_length = xml_arr.length;


        if (xml_length != 0) {
          const res = html_length === xml_length;
          if (isCompare) {
            let count = 0;
            for (const htmlElement of html_arr) {
              for (const xmlElement of xml_arr) {
                if (isStringSimilar(htmlElement, xmlElement, data_name)) {
                  count++;
                  break;
                }
              }
            }
            const percent = Math.round((count / xml_length) * 100);
            const r = percent + "%";
            avg += percent;
            array.push({
              Index: index,
              Value: data_name,
              HtmlLength: html_length,
              XmlLength: xml_length,
              Res: r,
              xml: xml_arr,
              html: html_arr,
              avg_data: avg,
            });
          } else {
            let r = '';
            if (res) {
              r = 100;
            } else {
              r = 0;
            }

            avg += r;
            array.push({
              Index: index,
              Value: data_name,
              HtmlLength: html_length,
              XmlLength: xml_length,
              Res: r + "%",
              xml: " ",
              html: "html_result",
              avg_data: avg,
            });
          }
        } else {
          if(html_length==0){
            array.push({
            Index: index,
            Value: data_name,
            HtmlLength: html_length,
            XmlLength: xml_length,
            Res: 100 + "%",
            xml: " ",
            html: "html_result",
            avg_data: avg,
          });
          }
          else{
            array.push({
            Index: index,
            Value: data_name,
            HtmlLength: html_length,
            XmlLength: xml_length,
            Res: 0 + "%",
            xml: " ",
            html: "html_result",
            avg_data: avg,
          });
          }
          
        }
      }
    }
    //console.log(array);
    await writeToExcel(array,index,file_name);
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
      //console.log(element.text())
      let str = "";
      for(const subPath of path.slice(1)){
        //console.log('subpat: ',subPath)
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




async function writeToExcel(data,ind,file_name) {
    let workbook;
    let sheet;

    if(ind==0 && fs.existsSync('output_comp.xlsx')){
      fs.unlinkSync('output_comp.xlsx');
    }
    if (fs.existsSync('output_comp.xlsx')) {
        // If the file exists, read it
        workbook = new Excel.Workbook();
        await workbook.xlsx.readFile('output_comp.xlsx');
        sheet = workbook.getWorksheet("My Sheet");
    } else {
        workbook = new Excel.Workbook();
        sheet = workbook.addWorksheet("My Sheet");
    }

    const len = data.length;


    let columnNumber = 3;
    if(ind == 0){
        sheet.getCell("A1").value = "Article ID";
        sheet.getCell("B1").value = "Article Type";
        sheet.mergeCells("A1:A2");
        sheet.mergeCells("B1:B2");
        sheet.getCell("A3").value = file_name;
        sheet.getCell("AS1").value = "Net Average";
        sheet.mergeCells("AS1:AS2");

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
    sheet.getCell(ind+3,1).value = file_name;
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


