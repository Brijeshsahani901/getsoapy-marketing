import fetch from 'node-fetch'
import nodemailer from 'nodemailer'

export const config = { api: { bodyParser: true } }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { name, company, email, phone, address, service, message, recaptchaToken } = req.body || {}

  // Basic recaptcha check (if provided)
  if (process.env.RECAPTCHA_SECRET_KEY && recaptchaToken) {
    try {
      const rc = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret: process.env.RECAPTCHA_SECRET_KEY, response: recaptchaToken })
      })
      const rcJson = await rc.json()
      if (!rcJson.success || rcJson.score < 0.4) {
        return res.status(400).json({ error: 'recaptcha failed' })
      }
    } catch (err) {
      console.warn('recaptcha verify failed', err)
    }
  }

  // Forward to GetSoapy webhook if configured
  try {
    if (process.env.GETSOAPY_WEBHOOK_URL) {
      await fetch(process.env.GETSOAPY_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.GETSOAPY_API_KEY || ''}` },
        body: JSON.stringify({ name, company, email, phone, address, service, message })
      })
    }
  } catch (err) {
    console.warn('GetSoapy forward failed', err)
  }

  // Send ops email
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    })
    await transporter.sendMail({
      from: 'no-reply@yourdomain.com',
      to: 'ops@yourdomain.com',
      subject: `New Quote: ${service || 'General'} — ${name || 'Unknown'}`,
      text: `${name} (${company}) ${email} ${phone}\n\n${message}\nAddress: ${address}`
    })
  } catch (err) {
    console.warn('mail fail', err)
  }

  return res.status(200).json({ ok: true })
}
