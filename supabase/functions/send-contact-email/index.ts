import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, subject, message }: ContactEmailRequest = await req.json();

    // Send email to the business
    const businessEmailResponse = await resend.emails.send({
      from: "Baskaran Appalam Contact <onboarding@resend.dev>",
      to: ["ramtraders87@gmail.com"],
      subject: `🔔 New Contact Message: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f39c12; padding-bottom: 10px;">
            🔔 New Contact Message Received
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Customer Details:</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #f39c12; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d5a2d; margin-top: 0;">📞 Action Required:</h3>
            <p style="margin-bottom: 10px;"><strong>Call the customer back at:</strong></p>
            <p style="font-size: 18px; color: #2d5a2d; font-weight: bold;">
              ${phone || 'No phone provided - use email: ' + email}
            </p>
            <p style="color: #666; font-size: 14px;">
              Your business number for reference: <strong>9994683731</strong>
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px; text-align: center;">
            This notification was sent from your Baskaran Appalam website contact form.<br>
            Reply to this email to respond directly to the customer.
          </p>
        </div>
      `,
    });

    // Send confirmation email to the customer
    const confirmationEmailResponse = await resend.emails.send({
      from: "Baskaran Appalam <onboarding@resend.dev>",
      to: [email],
      subject: "We received your message - Baskaran Appalam",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f39c12; padding-bottom: 10px;">
            🙏 Thank you for contacting Baskaran Appalam!
          </h2>
          
          <p style="font-size: 16px; line-height: 1.6;">Dear ${firstName},</p>
          
          <p style="line-height: 1.6;">
            Thank you for reaching out to us! We have received your message and will get back to you within 24 hours during business days.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Message Details:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="font-style: italic; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="background-color: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #e65100; margin-top: 0;">📞 Need immediate assistance?</h3>
            <p>Call us directly at: <strong style="color: #e65100; font-size: 18px;">9994683731</strong></p>
            <p style="color: #666; font-size: 14px;">
              We're here to help with all your appalam needs!
            </p>
          </div>
          
          <p style="line-height: 1.6;">
            Best regards,<br>
            <strong>Baskaran Appalam Team</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Ram Traders<br>
            1485 T.N.H.B Colony, Villapuram<br>
            Madurai, Tamil Nadu 625012<br>
            Phone: <strong>9994683731</strong> | Email: ramtraders87@gmail.com
          </p>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { businessEmailResponse, confirmationEmailResponse });

    return new Response(JSON.stringify({ 
      success: true, 
      businessEmailResponse, 
      confirmationEmailResponse 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);