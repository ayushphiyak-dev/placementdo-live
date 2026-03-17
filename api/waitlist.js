export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST allowed' });
    return;
  }

  let email = "";
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    email = (body && body.email) || "";
  } catch (_) {}

  if (!email || !email.includes('@')) {
    res.status(400).json({ error: 'Invalid email' });
    return;
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL ||
    "https://script.google.com/a/macros/nsec.ac.in/s/AKfycbygJi9HO-X3Bd5YbtEdRGBLfSYXBicC49Fe2ORLOWfYFmphvBZ-xw6krhBPOn6qqCgX/exec";

  try {
    const r = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email }).toString(),
    });
    if (!r.ok) {
      res.status(500).json({ error: "Apps Script req failed" });
      return;
    }
    res.status(200).json({ success: true });
  } catch (_) {
    res.status(500).json({ error: "Apps Script req failed" });
  }
}