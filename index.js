var http = require('follow-redirects').http;
var fs = require('fs');

var partnerRole = process.env.PARTNER_ROLE;
var apiKey = process.env.API_KEY;
var productId =  parseInt(process.env.PRODUCT_ID)
var pricepointId =  parseInt(process.env.PRICEPOINT_ID)
var currentMiliseconds = Date.now()
var strToEncrypt = process.env.SERVICE_ID + '#' + currentMiliseconds;


var options = {
  'method': 'POST',
  'hostname': 'entel.timwe.com',
  'path': '/pe/ma/api/external/v1/' + ChannelType.SMS + '/mt/' + partnerRole,
  'headers': {
    'apikey': apiKey,
    'authentication': '5p9Iy5sf7B6bat1dRynZ3ise/YruRhnYYts7EYFDCWiye89MtOUA2J1KG9lQnX7E6+LNlzltsZKzNCf3ni84ZQ',
    'Content-Type': 'application/json'
  },
  'maxRedirects': 20
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  "productId": productId,
  "pricepointId": pricepointId,
  "msisdn": "541158882866",
  "mcc": "716",
  "mnc": "17",
  "text": "Prueba de SendMT",
  "priority": "HIGH",
  "timezone": "America/Lima",
  "context": "STATELESS"
});

req.write(postData);

req.end();