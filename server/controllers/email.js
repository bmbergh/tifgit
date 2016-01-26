var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('lXCinkIlhJ1bCbj5_bP4EQ');
var debug = require('debug')('tifgif:server:controllers:email');


exports.send = function(req, res){

    var message = {
        "html": null,
        "text": null,
        "subject": "TifGif",
        "from_email": "tifgif@tifgif.com",
        "from_name": null,
        "to": [],
        "headers": {
            "Reply-To": null,
        },
        "important": false,
        "track_opens": null,
        "track_clicks": null,
        "auto_text": null,
        "auto_html": null,
        "inline_css": null,
        "url_strip_qs": null,
        "preserve_recipients": null,
        "view_content_link": null,
        "bcc_address": "message.bcc_address@example.com",
        "tracking_domain": null,
        "signing_domain": null,
        "return_path_domain": null,
        "merge": true,
        "merge_language": "mailchimp",
        "tags": [],
        "subaccount": null,
        "google_analytics_domains": [],
        "google_analytics_campaign": null,
        "metadata": {},
        "recipient_metadata": [],
        "attachments": [],
        "images": []
    };


	console.log("send:" , req.body);


	message.html = emailTemplate(req.body.url, req.body.message);
	message.from_name = req.body.from_name;
	message.to.push({
            "email": req.body.recipient,
            "name": null,
            "type": "to"
        });
    
    console.log("message:" , message);

	mandrill_client.messages.send({"message": message}, function(result) {
    	console.log('mandrill response: ', result);
	}, function(e) {
    	// Mandrill returns the error as an object with name and message keys
    	console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    	// A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
	});

}

function emailTemplate (url, message) {

	return '<h1>' + message + '</h1>'+
		'<img src="' + url + '" alt="TifGifImage"/>';

}






