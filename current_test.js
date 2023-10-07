const libxmljs = require('libxmljs2');
const fs = require('fs');


function removeSpacesAndSpecialChars(inputString) {
  let stringWithoutSpaces = inputString.replace(/\s/g, '');
  let stringWithoutSpecialChars = stringWithoutSpaces.replace(/[^\w]/g, '').toLowerCase();
  return stringWithoutSpecialChars;
}

function html_parser(path){
	return new Promise((resolve, reject)=> {
		try{
			const path_html = 'C:/Node/Basic Test/test1/Attached_standard_file-_Main_document_TA.clean.htm';
			fs.readFile(path_html, 'utf-8', (err, data) => {
				if (err) {
    			console.error('Error:', err);
    			return;
  				} 
  				const xmlDoc = libxmljs.parseHtml(data);
  				//console.log(xmlDoc.toString());
  				const res = xmlDoc.find(path);
  				//console.log(res[0].text());
  				const str = res[0].text();
  				var str_mod = removeSpacesAndSpecialChars(str);
  				//console.log(str_mod); 
  				resolve(str_mod)
  			});
		}
		catch(error){
			console.log("Error is :" + error);
		}
	});
}


function xml_parsing(path){
	return new Promise((resolve, reject)=>{
		try{
			const path_xml = 'C:/Node/Basic Test/test1/resources.kriyadocs.com_resources_bmj_bjsports_bjsports-2023-106870_snapshots_4_preediting_bjsports-2023-106870_2023_09_27_05_09_43_UTC_Vishwanathan_preedited.xml';
			fs.readFile(path_xml, 'utf-8', (err, data) => {
    		if (err) {
    			console.error('Error:', err);
    			return;
  			} 
  			const xmlDoc = libxmljs.parseXml(data);
  			//console.log(xmlDoc.toString());
  			const res = xmlDoc.find(path);
  			//console.log(res[0].text());
  			const str = res[0].text();
  			const str_mod = removeSpacesAndSpecialChars(str);
  			resolve(str_mod); 
  		});
  		}
  		catch(error){
  			console.log(error);
  		}
  	});
}


function xml_ref(path){
	return new Promise((resolve, reject)=>{
		try{
			const path_xml = 'C:/Node/Basic Test/test1/resources.kriyadocs.com_resources_bmj_bjsports_bjsports-2023-106870_snapshots_4_preediting_bjsports-2023-106870_2023_09_27_05_09_43_UTC_Vishwanathan_preedited.xml';
			fs.readFile(path_xml, 'utf-8', (err, data) => {
    		if (err) {
    			console.error('Error:', err);
    			return;
  			} 
  			const xmlDoc = libxmljs.parseXml(data);
  			//console.log(xmlDoc.toString());
  			const res = xmlDoc.find(path);
  			//console.log(res[0].text());
  			//console.log(res.length);
  			const result_array = [];
  			for(var i=0;i<res.length;i++){
  				//console.log(res[i].text());
  				const str = res[i].text();
  				const str_mod = removeSpacesAndSpecialChars(str);
  			  result_array.push(str_mod);
  			}
  			resolve(result_array); 
  			//const str = res[0].text();
  			
  		});
  		}
  		catch(error){
  			console.log(error);
  		}
  	});
}

function html_ref(path){
	return new Promise((resolve, reject)=>{
		try{
			const path_html = 'C:/Node/Basic Test/test1/Attached_standard_file-_Main_document_TA.clean.htm';
			fs.readFile(path_html, 'utf-8', (err, data) => {
    		if (err) {
    			console.error('Error:', err);
    			return;
  			} 
  			const htmlDoc = libxmljs.parseHtml(data);
  			//console.log(xmlDoc.toString());
  			const res = htmlDoc.find(path);
  			//console.log(res[0].text());
  			//console.log(res.length);
  			const result_array = [];
  			for(var i=0;i<res.length;i++){
  				//console.log(res[i].text());
  				const str = res[i].text();
  				const str_mod = removeSpacesAndSpecialChars(str);
  			  result_array.push(str_mod);
  			}
  			resolve(result_array); 
  			//const str = res[0].text();
  			
  		});
  		}
  		catch(error){
  			console.log(error);
  		}
  	});
}

function xml_ref_corres(path){
	return new Promise((resolve, reject)=>{
		try{
			const path_xml = 'C:/Node/Basic Test/test1/resources.kriyadocs.com_resources_bmj_bjsports_bjsports-2023-106870_snapshots_4_preediting_bjsports-2023-106870_2023_09_27_05_09_43_UTC_Vishwanathan_preedited.xml';
			fs.readFile(path_xml, 'utf-8', (err, data) => {
    		if (err) {
    			console.error('Error:', err);
    			return;
  			} 
  			const xmlDoc = libxmljs.parseXml(data);
  			//console.log(xmlDoc.toString());
  			const res_path1 = xmlDoc.find(path[0]);
  			const res_path2 = xmlDoc.find(path[1]);
  			const res_path3 = xmlDoc.find(path[2]);
  			//console.log(res[0].text());
  			//console.log(res.length);
  			const result_array = [];
  			for(var i=0;i<res_path1.length;i++){
  				//console.log(res[i].text());
  				const str = res_path1[i].text().concat(" ",res_path2[i].text()," ",res_path3[i].text());
  				const str_mod = removeSpacesAndSpecialChars(str);
  			  result_array.push(str_mod);
  			}
  			resolve(result_array); 
  			//const str = res[0].text();
  			
  		});
  		}
  		catch(error){
  			console.log(error);
  		}
  	});
}


module.exports = {html_parser,xml_parsing,xml_ref,html_ref,xml_ref_corres};

/*async function myAsyncFunction_xml_corres() {
  const result = await xml_ref_corres([`//contrib/name/prefix`, `//contrib/name/given-names`,`//contrib/name/surname`]); // Using await when calling a function
  console.log(result) ;
}
myAsyncFunction_xml_corres();*/

/*async function myAsyncFunction_html() {
  const resu = await html_ref(`//*[@data-class='jrnlAuthors']/text()`); // Using await when calling a function
  console.log(resu) ;
}
myAsyncFunction_html();*/
//console.log(res);

/*const res = await myAsyncFunction_html();
console.log(res);*/
