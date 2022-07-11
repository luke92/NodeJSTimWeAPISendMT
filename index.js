require('dotenv').config();
const channelType = require('./channel')
var request = require('request');
const crypto = require("crypto");

var partnerRole = process.env.PARTNER_ROLE;
var apiKey = process.env.API_KEY;
var productId =  parseInt(process.env.PRODUCT_ID)
var pricepointId =  parseInt(process.env.PRICEPOINT_ID)
var secretKey = process.env.PRE_SHARED_KEY;
var phoneNumber = process.env.PHONE_NUMBER;

var currentMiliseconds = Date.now()
var strToEncrypt = process.env.SERVICE_ID + '#' + currentMiliseconds;
let encryptedMsg = encrypt(strToEncrypt, secretKey);

var options = {
  'method': 'POST',
  'url': 'http://entel.timwe.com/pe/ma/api/external/v1/' + channelType.SMS + '/mt/' + partnerRole,
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

function encrypt(input, key) { 
    const algorithm = 'aes-128-cbc';   
    key = crypto.scryptSync(key, 'salt', 16);       
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.setAutoPadding(true);
    let encrypted = cipher.update(input, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted.replace('+','-');
}