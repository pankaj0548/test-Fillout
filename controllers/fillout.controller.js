const axios = require('axios');
const { compareFilterClause } = require('../utils/fillout.filter');

const authToken = process.env.AUTH_TOKEN;
const filloutApiUrl = process.env.FILLOUT_API_URL;

const getFilloutFormData = async (req, res)=>{ 
	try {
		const formId = req.params.formId;
		const limit = req.query.limit;
		const offset = req.query.offset;

		const filter_query = req.query;
		let filters;

		if (filter_query && filter_query.filters) {
			filters = JSON.parse(filter_query.filters);
			}

		const apiUrl = `${filloutApiUrl}/${formId}/submissions`;
		const params = {};

		if (limit !== undefined) {
			params.limit = limit;
			}
		if (offset !== undefined) {
			params.offset = offset;
			}

		const resp = await axios.get(apiUrl, {
			headers: {
					'Authorization': `Bearer ${authToken}`,
					},
				params: params  // pass the params to the request
			});

		let arr = []
		resp.data.responses.map((resp) => {
			let counter = 0;
			filters.map((filter) => {
				const question = resp.questions.find(question => question.id === filter.id && compareFilterClause(question.value, filter.condition, filter.value));
				if (question) {
					counter += 1;
				}
			})
			if (counter === filters.length) {
				arr.push(resp)
			}
		})
		const response = {
			'responses': arr,
			'totalResponses': arr.length,
			'pageCount': resp.data.pageCount
		}
		res.status(200).json({'response': response});
	} catch (error) {
		console.log(error);
		res.status(400).json({error: error});
	}
} 

module.exports = { 
	getFilloutFormData, 
}
