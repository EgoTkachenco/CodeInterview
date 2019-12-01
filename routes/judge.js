// const express = require('express');
// const router = express.Router();
const axios = require('axios');
const judgeUrl = 'https://api.judge0.com/submissions'

module.exports.compileCode = async (data) => {
	try {
		let requestData = [];
		if(data.tests) {
			for(let key in data.tests) {
				requestData[key] = Object.assign({}, data.data, {
					stdin: data.tests[key].input.value,
					expected_output: data.tests[key].output.value
				});	
			}
		}else {
			requestData.push(data.data);
		}

		let compileResult = [];

		for(key in requestData) {
			console.log(requestData[key]);
			let response = await axios.post(judgeUrl + '?base64_encoded=false', requestData[key]);
			let codeOutputRes;
			if(response.data.token) {
				do {
					codeOutputRes = await axios.get(`${judgeUrl}/${response.data.token}`);
				} while(codeOutputRes.data.status.id < 3)
				compileResult.push(codeOutputRes.data);
			}
		}
		if(data.tests) {
			let resultOutput = { shortDescription: [], fullDescription: null, passed: 0, failed: 0};
			for(let key in compileResult) {
				if(compileResult[key].status.id === 3) {
					resultOutput.shortDescription.push({
						type: 'success', 
						output: 'Test passed'
					});
					resultOutput.passed++;
				}
				else if(compileResult[key].status.id > 3) {
						resultOutput.shortDescription.push({
							type: 'error', 
							output: 'Test failed'
					});
					resultOutput.failed++;
				}
			}
			compileResult.map((item, index) => {
				item.input = data.tests[index].input.value;
				item.expected_output = data.tests[index].output.value;
			});
			resultOutput.fullDescription = compileResult;

			return resultOutput;
		} else {
			resultOutput = { shortDescription: compileResult, fullDescription: compileResult};
			return resultOutput;
		}
		
	}
	catch(ex) {
		return ex.message;
	}
}


