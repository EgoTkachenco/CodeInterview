const express = require('express');
const router = express.Router();
const axios = require('axios');
const judgeUrl = 'https://api.judge0.com/submissions'

router.post('/code', async (req, res) => {
	if(req.body === {}) {
		return res.status(400).send({
				message: "Code Info can not be empty"
		});
	}
	try {
		let response = await axios.post(judgeUrl + '?base64_encoded=false', req.body);
		let codeOutputRes;
		if(response.data.token) {
			do {
				codeOutputRes = await axios.get(`${judgeUrl}/${response.data.token}?fields=stdout,stderr,status_id,language_id`);
			} while(codeOutputRes.data.status_id < 3)
		}
		res.send(codeOutputRes.data);
	}
	catch(ex) {
		return res.status(500).send(ex.message);
	}
});

module.exports = router;