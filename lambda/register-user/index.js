const createsend = require('createsend-node')
const api = new createsend({ apiKey: '24ac1f042328aa50a62773ef97706162d7eed8afd2dcb6b3' })

const headers = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': 'http://localhost:3000',
	'Access-Control-Allow-Methods': 'OPTIONS,POST'
}

exports.handler = async function (event, context) {
	const params = event.body ? JSON.parse(event.body) : {}
	if (params.name && params.email && params.referral) {
		const promise = new Promise(function (resolve, reject) {
			api.subscribers.addSubscriber('1c5f57650c1eae5639bf20bc0c47a1d8', {
				EmailAddress: params.email,
				Name: params.name,
				CustomFields: [
					{ Key: 'invitation', Value: params.invitation ? 'yes' : 'no' },
					{ Key: 'locale', Value: params.locale },
					{ Key: 'referral', Value: params.referral }
				]
			}, (err, res) => {
				if (err) {
					resolve({
						statusCode: 400,
						headers,
						body: JSON.stringify(err)
					})
				} else {
					resolve({
						statusCode: 200,
						headers,
						body: JSON.stringify({success: true, message: `${params.email} subscribed`})
					})
				}
			})
		})

		return promise
	} else {
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({error: 'missing params'})
		}
	}
}

// local debug
// exports.handler({name: 'bonjour', email: 'qsd@qsdqsd.com'})