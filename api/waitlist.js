export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST allowed' });
    return;
  }
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    res.status(400).json({ error: 'Invalid email' });
    return;
  }
  // For now, just log the email
  console.log('Waitlist signup:', email);
  res.status(200).json({ success: true });
}