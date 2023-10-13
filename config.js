const xml_paths =[
	{
		Article_Title : {
			path1 : [`//title-group//article-title`],
			path2 : [`//*[@class-name="AbsTitle"]`]
		}
	},
	{
		Author : {
			path1 : [`//contrib-group[1]//contrib`]
		}
	},
	{
		Affiliation : {
			path1 : [`//contrib-group[1]//aff`]
		}
	},
	{
		Corres_Author : {
			path1 : [`//author-notes//corresp//name`]
		}
	},
	{
		Abstract_Para : {
			path1 : [`//abstract//p`],
			path2 : [`//*[@class="jrnlAbsPara"]`]
		}
	},
	{
		Acknowledgement : {
			path1 : [`//ack//p`]
		}
	},
	{
		References : {
			path1 : [`//ref[@data-class="jrnlRefText"]`],
			path2 : [`//p[@class="jrnlRefText"]`],
		}
	},
	{
		Ethics : {
			path1 : [`//fn[@fn-type="ethics"]`]
		}
	},
	{
		Patient_Consent : {
			path1 : [`//fn[@fn-type="consent"]`]
		}
	},
	{
		Conflict_of_interest : {
			path1 : [`//fn[@fn-type="conflict"]`]
		}
	},
	{
		Data_Availability : {
			path1 : [`//fn[@fn-type="data-availability-free-text"]`]
		}
	},
	{
		Funding : {
			path1 : [`//*[@fn-type="funding"]`]
		}
	},
	{
		AuthorContribution : {
			path1 : [`//fn[@fn-type="con"]`]
		}
	},
	{
		Keywords :{
			path1 : [`//kwd-group`]
		}
	}
	
	
];

const html_paths =[
	{
		Article_Title : {
			path1 : [`//*[@data-class="jrnlArtTitle"]`]
		},
		Comparison : true
	},
	{
		Author : {
			path1 : [`//*[@data-class="jrnlAuthors"]`]
		},
		Comparison : true
	},
	{
		Affiliation : {
			path1 : [`//*[@data-class='jrnlAff']`]
		},
		Comparison : true
	},
	{
		Corres_Author: {
			path1 : [`//p[@data-class='jrnlCorrAuth']`],
			path2 : [`//p[@data-class='jrnlCorresp']`]
		},
		Comparison : true
	},
	{
		Abstract_Para : {
			path1 : [`//*[@data-name='Abstract']`]
		},
		Comparison : true
	},
	{
		Acknowledgement : {
			path1 : [`//*[@data-class='jrnlAcknowledgement']`]
		},
		Comparison : false
	},
	{
		References : {
			path1 : [`//*[@class="RefText jrnlRefText"]`]
		},
		Comparison : true
	},
	{
		Ethics : {
			path1 : [`//*[@data-class='jrnlEthics']`]
		},
		Comparison : false
	},
	{
		Patient_Consent : {
			path1 : [`//*[@data-class='jrnlPatientConsent']`]
		},
		Comparison : true
	},
	{
		Conflict_of_interest : {
			path1 : [`//*[@data-class='jrnlConflict']`]
		},
		Comparison : false
	},
	{
		Data_Availability : {
			path1 : [`//*[@data-class='jrnlDataAvailability']`]
		},
		Comparison : false
	},
	{
		Funding : {
			path1 : [`//*[@data-class='jrnlFunding']`]
		},
		Comparison : false
	},
	{
		AuthorContribution : {
			path1 : [`//*[@data-class='jrnlContributors']`]
		},
		Comparison : false
	},
	{
		Keywords : {
			path1 : [`//p[@data-tag='keywords']`],
			path2 : [`//p[@data-name='keywords']`]
		},
		Comparison : true
	}

	
];
module.exports = {xml_paths,html_paths}; 