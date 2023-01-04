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
	if (params.recipients && params.products && params.collection && params.locale) {
		const api = new createsend({ apiKey: params.collection === 'octobre' ? 'f5b9969fde857945b1297d3c59e7798fafb4759da3a30534' : '24ac1f042328aa50a62773ef97706162d7eed8afd2dcb6b3'})

		const emailIds = {
			sezane: {
				fr_fr: '94760e74-9d83-4e7a-bd88-894d59927e39',
				en_us: '8ac5d18c-02c4-4a6c-9cb3-f0035b15f1d2',
				en_uk: '8ac5d18c-02c4-4a6c-9cb3-f0035b15f1d2',
				en_eu: '8ac5d18c-02c4-4a6c-9cb3-f0035b15f1d2',
			},
			octobre: {
				fr_fr: '2dda81ce-3260-4e18-864a-994dcb4e4db1',
				en_us: 'd37b83e8-ecd0-42a6-99d4-243342cace7f',
				en_uk: 'd37b83e8-ecd0-42a6-99d4-243342cace7f',
				en_eu: 'd37b83e8-ecd0-42a6-99d4-243342cace7f',
			}
		}

		const promises = []
		params.recipients.forEach(recipient => {
			if(recipient.name && recipient.email) {
				const details = {
					smartEmailID: emailIds[params.collection][params.locale] || emailIds[params.collection]['en_eu'],
					to: `${recipient.name} <${recipient.email}>`,
					Data: {
						recipient_name: recipient.name,
						currency: params.locale === 'en_us' ? '$' : '€',
						sender_name: params.senderName,
						locale: params.locale === 'en_uk' ? 'en' : params.locale === 'en_da' ? 'eu' : params.locale.split('_')[1],
						products: params.products.map(p => ({...p, image: cloudinary.url(p.image.replace(cloudinaryBase, ''), { width: 400, height: 600, crop: "fill" })})),
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
		});

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
			statusCode: 405,
			headers,
			body: JSON.stringify({error: 'Not allowed'})
		}
	}
}

// DEBUG
// exports.handler({body:JSON.stringify(
// 	{
// 		"locale": "fr_fr",
// 		"senderName": "qsd",
// 		"recipients": [
// 			{
// 				"email": "leo@cheron.works",
// 				"name": "destinaire 1"
// 			},
// 			{
// 				"email": "",
// 				"name": ""
// 			},
// 			{
// 				"email": "",
// 				"name": ""
// 			}
// 		],
// 		"products": [
// 			{
// 				"image": "https://media.sezane.com/image/upload/v1635814358/website/la-liste/Image.jpg",
// 				"title": "Blouse gaby",
// 				"variant": "large",
// 				"price": "90€",
// 				"size": "",
// 				"url": "https://www.sezane.com/us/product/antoine-jumper/multico-gold#size-XS"
// 			},
// 			{
// 				"image": "https://media.sezane.com/image/upload/v1635814358/website/la-liste/Image.jpg",
// 				"title": "Blouse gaby",
// 				"variant": "large",
// 				"price": "90€",
// 				"size": "",
// 				"url": "https://www.sezane.com/us/product/antoine-jumper/multico-gold#size-XS"
// 			},
// 			{
// 				"image": "https://media.sezane.com/image/upload/v1635814358/website/la-liste/Image.jpg",
// 				"title": "Blouse gaby",
// 				"variant": "large",
// 				"price": "90€",
// 				"size": "",
// 				"url": "https://www.sezane.com/us/product/antoine-jumper/multico-gold#size-XS"
// 			}
// 		]
// 	}
// 	)})