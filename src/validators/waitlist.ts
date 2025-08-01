import z from "zod";

export const waitlistSchema = z.object({
   email: z.string().email({ message: "Enter a valid email!" }),
});

export type TWaitlistSchema = z.infer<typeof waitlistSchema>;
