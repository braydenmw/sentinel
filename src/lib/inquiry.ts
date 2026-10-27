import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inquirySchema = z
  .object({
    type: z.enum(["pre-order", "contact"]),
    name: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .refine((value) => !/[\r\n]/.test(value)),
    email: z.string().trim().pipe(z.email().max(254)),
    phone: z.string().trim().max(40),
    country: z.string().trim().max(80),
    model: z.string().trim().max(100),
    vehicle: z.string().trim().max(120),
    message: z.string().trim().max(2000),
    termsAccepted: z.boolean(),
    website: z.string().max(200),
  })
  .refine((data) => data.termsAccepted, {
    message: "Please confirm the enquiry and privacy terms.",
    path: ["termsAccepted"],
  })
  .refine((data) => data.website.length === 0, {
    message: "The form could not be submitted.",
    path: ["website"],
  });

export type InquiryInput = z.infer<typeof inquirySchema>;
export type InquiryResult = { success: true } | { success: false; message: string };

export const submitInquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => inquirySchema.parse(input))
  .handler(async ({ data }): Promise<InquiryResult> => {
    const { deliverInquiry } = await import("./inquiry.server");
    return deliverInquiry(data);
  });
