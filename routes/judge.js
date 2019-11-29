// const express = require('express');
// const router = express.Router();
const axios = require('axios');
const judgeUrl = 'https://api.judge0.com/submissions'

module.exports.compileCode = async (data) => {
	try {
		let response = await axios.post(judgeUrl + '?base64_encoded=false', data);
		let codeOutputRes;
		if(response.data.token) {
			do {
				codeOutputRes = await axios.get(`${judgeUrl}/${response.data.token}`);
			} while(codeOutputRes.data.status.id < 3)
		}
		return codeOutputRes.data;
	}
	catch(ex) {
		return ex.message;
	}
}


