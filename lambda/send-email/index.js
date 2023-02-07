const createsend = require('createsend-node')
const cloudinary = require('cloudinary').v2
cloudinary.config({ cloud_name: 'dwunpjzlo' })
const cloudinaryBase = 'https://media.sezane.com/image/upload/'

const headers = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST'
}

exports.handler = async function (event, context, callback) {
	const params = event.body ? JSON.parse(event.body) : {}
	if (params.recipient && params.collection && params.locale) {
		const api = new createsend({ apiKey: params.collection === 'octobre' ? 'f5b9969fde857945b1297d3c59e7798fafb4759da3a30534' : '24ac1f042328aa50a62773ef97706162d7eed8afd2dcb6b3'})

		const emailIds = {
			sezane: {
				fr_fr: 'cbe077a4-54ee-41cc-893a-37e9cf5f4160',
				en_us: 'd9a662a8-4aee-49f9-b344-d5e011741ec5',
				en_uk: 'd9a662a8-4aee-49f9-b344-d5e011741ec5',
				en_eu: 'd9a662a8-4aee-49f9-b344-d5e011741ec5',
			},
			octobre: {
				fr_fr: 'cbe077a4-54ee-41cc-893a-37e9cf5f4160',
				en_us: 'd9a662a8-4aee-49f9-b344-d5e011741ec5',
				en_uk: 'd9a662a8-4aee-49f9-b344-d5e011741ec5',
				en_eu: 'd9a662a8-4aee-49f9-b344-d5e011741ec5',
			}
		}

		const promises = []
			if(params.recipient.name && params.recipient.email) {
				const details = {
					smartEmailID: emailIds[params.collection][params.locale] || emailIds[params.collection]['en_eu'],
					to: `${params.recipient.name} <${params.recipient.email}>`,
					Data: {
						recipient_name: params.recipient.name,
						currency: params.locale === 'en_us' ? '$' : '€',
						sender_name: params.senderName,
						locale: params.locale === 'en_uk' ? 'en' : params.locale === 'en_da' ? 'eu' : params.locale.split('_')[1],
					}
				}

				const promise = new Promise(function (resolve, reject) {
					api.transactional.sendSmartEmail(details, function (err, res) {
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
								body: JSON.stringify(`Sent to ${params.recipient_email}`)
							})
						}
					})
				})

				promises.push(promise)
			}

		await Promise.all(promises).then(() => {
			callback(null, {
				statusCode: 200,
				headers,
				body: JSON.stringify(`Emails sent ` + emailIds[params.collection][params.locale])
			})
		}).catch((err) => {
			callback(null, {
				statusCode: 400,
				headers,
				body: JSON.stringify(err)
			})
		})
	} else {
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({error: 'Not allowed'})
		}
	}
}