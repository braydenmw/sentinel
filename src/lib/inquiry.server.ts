import { getRequest } from "@tanstack/react-start/server";
import { env } from "@/lib/env.server";
import { assertSameSiteRequest } from "@/lib/auth/isolation.server";
import type { InquiryInput, InquiryResult } from "./inquiry";

const DEFAULT_RECIPIENT = "brayden@adversiq.xyz";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });
}

function formatInquiry(input: InquiryInput) {
  const subjectPrefix = input.type === "pre-order" ? "Pre-order" : "Contact";
  const lines = [
    `SENTINEL-1 ${subjectPrefix} enquiry`,
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || "Not provided"}`,
    `Country: ${input.country || "Not provided"}`,
    `Model: ${input.model || "Not specified"}`,
    `Vehicle: ${input.vehicle || "Not specified"}`,
    "",
    "Message:",
    input.message || "No additional message.",
  ];
  const text = lines.join("\n");
  const html = `<h2>SENTINEL-1 ${subjectPrefix} enquiry</h2><dl><dt>Name</dt><dd>${escapeHtml(input.name)}</dd><dt>Email</dt><dd>${escapeHtml(input.email)}</dd><dt>Phone</dt><dd>${escapeHtml(input.phone || "Not provided")}</dd><dt>Country</dt><dd>${escapeHtml(input.country || "Not provided")}</dd><dt>Model</dt><dd>${escapeHtml(input.model || "Not specified")}</dd><dt>Vehicle</dt><dd>${escapeHtml(input.vehicle || "Not specified")}</dd></dl><p><strong>Message</strong></p><p>${escapeHtml(input.message || "No additional message.").replace(/\n/g, "<br>")}</p>`;
  return { subject: `SENTINEL-1 ${subjectPrefix} enquiry`, text, html };
}

export async function deliverInquiry(input: InquiryInput): Promise<InquiryResult> {
  assertSameSiteRequest();

  const apiKey = env("RESEND_API_KEY");
  const from = env("RESEND_FROM_EMAIL");
  const to = env("SENTINEL_CONTACT_EMAIL") ?? DEFAULT_RECIPIENT;
  if (!apiKey || !from) {
    console.error(
      "[sentinel] Inquiry email is not configured; set RESEND_API_KEY and RESEND_FROM_EMAIL.",
    );
    return {
      success: false,
      message:
        "Online email delivery is not configured yet. Please contact us directly by email or WhatsApp.",
    };
  }

  const inquiry = formatInquiry(input);
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: inquiry.subject,
        text: inquiry.text,
        html: inquiry.html,
      }),
    });
  } catch (error) {
    console.error("[sentinel] Inquiry email request failed.", error);
    return {
      success: false,
      message: "We couldn't send your enquiry right now. Please try again or contact us directly.",
    };
  }

  if (!response.ok) {
    console.error(`[sentinel] Inquiry email provider returned HTTP ${response.status}.`);
    return {
      success: false,
      message: "We couldn't send your enquiry right now. Please try again or contact us directly.",
    };
  }

  const request = getRequest();
  console.info(
    `[sentinel] ${input.type} enquiry email accepted for delivery (${request?.method ?? "server"}).`,
  );
  return { success: true };
}
