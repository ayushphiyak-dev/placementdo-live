const https = require('https');
const querystring = require('querystring');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST allowed' });
    return;
  }
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    let email = "";
    try {
      email = JSON.parse(body).email || "";
    } catch (_) {}
    if (!email || !email.includes('@')) {
      res.status(400).json({ error: 'Invalid email' });
      return;
    }

    // REPLACE THIS with YOUR Apps Script URL!
    const scriptUrl = "https://script.google.com/a/macros/nsec.ac.in/s/AKfycbygJi9HO-X3Bd5YbtEdRGBLfSYXBicC49Fe2ORLOWfYFmphvBZ-xw6krhBPOn6qqCgX/exec";
    const data = querystring.stringify({ email });

    // Forward email to Apps Script as POST
    const url = new URL(scriptUrl);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const request = https.request(options, r => {
      r.on('data', () => {});
      r.on('end', () => {
        res.status(200).json({ success: true });
      });
    });
    request.on('error', () => res.status(500).json({ error: "Apps Script req failed" }));
    request.write(data);
    request.end();
  });
};