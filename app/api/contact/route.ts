import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Email to founders
    await resend.emails.send({
      from: "olo ai <noreply@meetolo.ai>",
      to: ["matt@meetolo.ai", "josh@meetolo.ai"],
      subject: `Contact Form: ${name}`,
      replyTo: email,
      text: `New contact form message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    // Confirmation email to sender
    if (email) {
      await resend.emails.send({
        from: "olo ai <hello@meetolo.ai>",
        to: [email],
        subject: `Hi ${name},`,
        text: `Hi ${name},

Thanks for reaching out — we got your message.

We'll review it and get back to you soon. If your message is about partnerships, investment or media inquiries, or for more information on how olo could help your business reduce administrative overhead, we'll make sure it is responded to promptly.

Talk soon,
Josh & Matt
Founders of olo ai`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
