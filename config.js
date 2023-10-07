const xml_path ={
	Article_Title : `//*[@class-name="ArtTitle"]`,
	//Abstract_Head : `//*[@class-name = "AbsHead"]`,
	//Abstract_Title : `//*[@class-name="AbsTitle"]`,
	//Abstract_Para : `//*[@class-name="AbsPara"]`,
	//References : `//*[@class-name = "RefText"]`,
	//Corresponding_Author : [`//contrib/name/prefix`, `//contrib/name/given-names`,`//contrib/name/surname`],
};

const html_path ={
	Article_Title : `//*[@data-class="jrnlArtTitle"]`,
	//Abstract_Head : `//*[@data-class="jrnlAbsHead"]`,
	//Abstract_Title : `//*[@data-class="jrnlAbsPara"]/b`,
	//Abstract_Para : `//*[@data-class='jrnlAbsPara']/text()`,
	//References : `//*[@data-class="jrnlRefText"]`,
	//Corresponding_Author : `//*[@data-class='jrnlAuthors']/text()`,
};


/*function execution(){
	let a = Object.keys(xml_path);
	let b = Object.keys(html_path);
	if(a.length == b.length){
    	for(var i=0;i<a.length;i++){
        	console.log(i+"");
        	let index = a[i];
        	if(html_path.hasOwnProperty(index)){
            	print(xml_path[index]);
            	//print(html_path[index]);
        	}
        }
  
    }
}
function print(str){
    console.log(str);
}

execution();*/

module.exports = {xml_path,html_path};