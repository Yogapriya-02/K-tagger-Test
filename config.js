const xml_paths =[
	{
		Article_Title : [`//*[@class-name="ArtTitle"]`]
	},
	{
		Abstract_Head : [`//*[@class-name = "AbsHead"]`]
	},
	{
		Abstract_Title : [`//*[@class-name="AbsTitle"]`]
	},
	{
		Abstract_Para : [`//*[@class-name="AbsPara"]`]
	},
	{
		References : [`//*[@class-name = "RefText"]`]
	},
	{
		Author : [`//contrib/name`,`./prefix` ,`./given-names` ,`./surname`]
	},
	{
		Corres_Author : [`//author-notes/corresp/name`]
	},
	{
		Affiliation :[`//aff`]
	},
	{
		Figure_Caption : [`.//p[@class = "jrnlFigCaption"]`]
	},
	{
		Table_Caption : [`.//p[@class = "jrnlTblCaption"]`]
	},
	{
		Figure_Citation : [`.//span[@class="jrnlFigRef"]`]
	},
	{
		Table_Citation : [`.//span[@class="jrnlTblRef"]`]
	},
	/*{
		//Corres_Affiliation : [`//author-notes/corresp/fn[@fn-type="corresp-address"]`]
	},*/
	{
		Keywords : [`.//kwd-group`]
	}
];

const html_paths =[
	{
		Article_Title : [`//*[@data-class="jrnlArtTitle"]`],
		Comparison : true
	},
	{
		Abstract_Head : [`//*[@data-class="jrnlAbsHead"]`],
		Comparison : true
	},
	{
		Abstract_Title : [`//*[@data-class="jrnlAbsPara"]/b`],
		Comparison : true
	},
	{
		Abstract_Para : [`//*[@data-class='jrnlAbsPara']/text()`],
		Comparison : true
	},
	{
		References : [`//*[@data-class="jrnlRefText"]`],
		Comparison : true
	},
	{
		Author : [`//p[@data-class='jrnlAuthors']`],
		Comparison : true
	},
	{
		Corres_Author :[`//p[@data-class="jrnlCorresp"]`],
		Comparison : true
	},
	{
		Affiliation : [`//p[@data-class='jrnlAff']`],
		Comparison : true
	},
	{
		Figure_Caption : [`.//p[@data-class="jrnlFigCaption"]`],
		Comparison : true		
	},
	{
		Table_Caption : [`.//p[@data-class="jrnlTblCaption"]`],
		Comparison : true
	},
	{
		Figure_Citation : [`.//span[@class="jrnlFigRef"]`],
		Comparison : false
	},
	{
		Table_Citation : [`.//span[@class="jrnlTblRef"]`],
		Comparison : false
	},
	{
		Keywords : [`.//p[@data-name="keywords"]`],
		Comparison : true
	}
];

module.exports = {xml_paths,html_paths}; 