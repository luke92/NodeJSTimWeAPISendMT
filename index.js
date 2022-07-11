require('dotenv').config();
const channelType = require('./channel')
var request = require('request');
const CipherAesEcb = require('./cipherAesEcb');

var partnerRole = process.env.PARTNER_ROLE;
var apiKey = process.env.API_KEY;
var productId =  parseInt(process.env.PRODUCT_ID);
var pricepointId =  parseInt(process.env.PRICEPOINT_ID);
var secretKey = process.env.PRE_SHARED_KEY;
var phoneNumber = process.env.PHONE_NUMBER;
var url = 'http://entel.timwe.com/pe/ma/api/external/v1/' + channelType.SMS + '/mt/' + partnerRole;

console.log("URL : " + url)
console.log("Product Id : " + productId)
console.log("PricePoint Id : " + pricepointId)
console.log("Phone number : " + phoneNumber)

let cipher = new CipherAesEcb("aes-128-ecb",secretKey);
var currentMiliseconds = Date.now()
var strToEncrypt = process.env.SERVICE_ID + '#' + currentMiliseconds;
let encryptedMsg = cipher.encrypt(strToEncrypt);

var options = {
  'method': 'POST',
  'url': url,
  'headers': {
    'apikey': apiKey,
    'authentication': encryptedMsg,
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