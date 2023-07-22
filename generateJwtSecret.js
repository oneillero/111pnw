const fs = require('fs');
const crypto = require('crypto');

// Generate a random JWT secret key
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Write the secret key to a file named jwtSecret.key
fs.writeFileSync('jwtSecret.key', jwtSecret);

console.log('JWT Secret Key generated and saved to jwtSecret.key');
