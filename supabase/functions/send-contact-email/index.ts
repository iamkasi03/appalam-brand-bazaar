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
      from: "Contact Form <onboarding@resend.dev>",
      to: ["ramtraders87@gmail.com"],
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Send confirmation email to the customer
    const confirmationEmailResponse = await resend.emails.send({
      from: "Bhaskaran Appalam <onboarding@resend.dev>",
      to: [email],
      subject: "We received your message!",
      html: `
        <h1>Thank you for contacting us, ${firstName}!</h1>
        <p>We have received your message and will get back to you within 24 hours during business days.</p>
        <br>
        <p><strong>Your message details:</strong></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message.replace(/\n/g, '<br>')}</p>
        <br>
        <p>Best regards,<br>Bhaskaran Appalam Team</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Ram Traders<br>
          1485 T.N.H.B Colony, Villapuram<br>
          Madurai, Tamil Nadu 625012<br>
          Email: ramtraders87@gmail.com
        </p>
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