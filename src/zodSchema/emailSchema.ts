import { z } from "zod";

const emailSchema = z.object({
    email: z.string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
});

export default emailSchema;