import * as z from 'zod';

export const SignupFormSchema = z.object({
    login: z
        .string()
        .min(2, { message: 'Login should has at least 2 characters' })
        .regex(/^[a-zA-Z0-9_]+$/, { message: 'Логин может содержать только латинские буквы, цифры и знак подчеркивания.' })
        .trim(),
    email: z.email('Invalid email address format'),
    password: z
        .string()
        .min(8, { message: 'Password should be at least 8 symbols' })
        .regex(/[a-zA-Z]/, { message: 'Password should has at lest 1 character' })
        .regex(/[0-9]/, { message: 'Password should has at least 1 digit' })
        .trim(),
    name: z.string().min(2, { message: 'Name should has at least 2 characters' }).trim().optional(),
});

export type SignupFormValues = z.infer<typeof SignupFormSchema>;