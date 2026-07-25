import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, budget, service, message } = body;

    // Validate mandatory fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and project brief are required fields." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: "WebCore Leads <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "satishmehtre037@gmail.com",
        subject: `🔥 New Project Brief from ${name} (${service || "General Inquiry"})`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #F7F3EA; color: #111111; border-radius: 8px;">
            <h2 style="color: #7A2E3A; border-bottom: 2px solid #111111; padding-bottom: 10px;">
              New WebCore Project Brief
            </h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone / WhatsApp:</strong> ${phone || "Not provided"}</p>
            <p><strong>Company / Organization:</strong> ${company || "Individual"}</p>
            <p><strong>Budget (INR/USD):</strong> ${budget || "Flexible"}</p>
            <p><strong>Service Requested:</strong> ${service || "Fullstack / AI"}</p>
            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #7A2E3A; margin-top: 15px; border-radius: 4px;">
              <strong>Project Brief Details:</strong>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              Submitted on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (IST)
            </p>
          </div>
        `,
      });
    } else {
      console.log("[Contact Form Submission (Local Log)]:", {
        name,
        email,
        phone,
        company,
        budget,
        service,
        message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Your project brief has been received. We will respond within 2-4 hours!",
    });
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "Failed to send project brief. Please try again or email us directly." },
      { status: 500 }
    );
  }
}
