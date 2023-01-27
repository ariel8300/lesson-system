const crypto = require('crypto');

// RUN ONCE TO GENERATE NEW KEYS
const newAccessTokenSecret = crypto.randomBytes(32).toString('hex');
const newRefreshTokenSecret = crypto.randomBytes(32).toString('hex');

console.table({ newAccessTokenSecret, newRefreshTokenSecret });
