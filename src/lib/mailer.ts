import nodemailer from "nodemailer";

export function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  // Fails silently in local dev if SMTP env vars are not set — the message is
  // still stored in Postgres via the API route regardless of email success.
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn("SMTP not configured — skipping email notification.");
    return;
  }

  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
    replyTo: data.email,
    subject: `[Portfolio] ${data.subject}`,
    text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
    html: `<p><strong>From:</strong> ${data.name} (${data.email})</p><p>${data.message}</p>`,
  });
}
