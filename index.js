require('dotenv').config();
var request = require('request');
const AesEncryption = require('aes-encryption');

var partnerRole = process.env.PARTNER_ROLE;
var apiKey = process.env.API_KEY;
var productId =  parseInt(process.env.PRODUCT_ID)
var pricepointId =  parseInt(process.env.PRICEPOINT_ID)
var secretKey = process.env.PRE_SHARED_KEY;
var phoneNumber = process.env.PHONE_NUMBER;

const aes = new AesEncryption();
aes.setSecretKey(secretKey)

var currentMiliseconds = Date.now()
var strToEncrypt = process.env.SERVICE_ID + '#' + currentMiliseconds;
const encrypted = aes.encrypt(strToEncrypt)


var options = {
  'method': 'POST',
  'url': 'http://entel.timwe.com/pe/ma/api/external/v1/' + ChannelType.SMS + '/mt/' + partnerRole,
  'headers': {
    'apikey': apiKey,
    'authentication': encrypted,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "productId": productId,
    "pricepointId": pricepointId,
    "msisdn": phoneNumber,
    "mcc": "716",
    "mnc": "17",
    "text": "Prueba de SendMT",
    "priority": "HIGH",
    "timezone": "America/Lima",
    "context": "STATELESS"
  })
};

request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});