import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, business, phone, zip, employees, overhead, title, industry, website } = body;

    // Email to founders
    await resend.emails.send({
      from: "olo ai <noreply@meetolo.ai>",
      to: ["matt@meetolo.ai", "josh@meetolo.ai"],
      subject: `New Pilot Application: ${name} - ${business}`,
      text: `New pilot application received:\n\nName: ${name}\nBusiness: ${business}\nEmail: ${email}\nPhone: ${phone}\nTitle: ${title}\nIndustry: ${industry}\nWebsite: ${website || "N/A"}\nZip: ${zip}\nEmployees: ${employees}\nMonthly Overhead: ${overhead}`,
    });

    // Confirmation email to applicant
    if (email) {
      await resend.emails.send({
        from: "olo ai <hello@meetolo.ai>",
        to: [email],
        subject: "Thank you for applying for the olo pilot!",
        text: `Hi ${name},

Thank you for applying to the olo pilot!

We'll review your submission personally and reach out if it looks like olo could be a fit for your business. We built olo to help small and medium-sized businesses run more efficiently by reducing the admin work that costs time, money, and energy.

The next step would be a short discovery call to better understand your business, the tools you already use, and where administrative overhead is creating the biggest headaches.

Talk soon,
Josh & Matt
Founders of olo ai`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Apply email error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
