const jwt = require('jsonwebtoken');
require('dotenv').config();

//Encrypting text
function encrypt(text) {
  const token = jwt.sign(
    text,
    process.env.SECRET_KEY
  );
  return token;
}

var token = encrypt(process.env.DECODE_TEXT)
console.log(token)