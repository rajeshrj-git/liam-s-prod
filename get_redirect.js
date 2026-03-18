const https = require('https');
https.get('https://maps.app.goo.gl/A53fsbUDjR5M9ubi7', (res) => {
  console.log(res.headers.location);
});
