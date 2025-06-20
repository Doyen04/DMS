import { z } from 'zod';

const userSchema = z.object({
    fullname: z.string()
        .min(3, { message: 'Full name must be at least 3 characters long' })
        .max(50, { message: 'Full name must be at most 50 characters long' })
        .regex(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/, { message: 'Full name can only contain letters and spaces between words' })
        .refine(val => val.trim() === val, { message: 'Full name cannot have leading or trailing spaces' }),
    email: z.string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Invalid email address' }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' }),
});

export default userSchema