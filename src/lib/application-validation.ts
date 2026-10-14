import { z } from "zod";

export const applicationInputSchema = z.object({
  property_id: z.number().int().positive(),
  guest_first_name: z.string().trim().min(1, "First name is required."),
  guest_last_name: z.string().trim().min(1, "Last name is required."),
  guest_email: z.string().trim().email("A valid email is required."),
  guest_phone_number: z.string().trim().min(6, "Phone number is required."),
  guest_current_address: z.string().trim().min(5, "Current address is required."),
  message_from_applicant: z.string().trim().optional().nullable(),
  guest_document_upload_urls: z.array(z.string().trim().url()).optional().nullable(),
});

export type ApplicationInput = z.infer<typeof applicationInputSchema>;
