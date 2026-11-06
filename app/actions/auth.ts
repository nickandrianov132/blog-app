'use server'

import { db } from "@/src/prisma/db"
import { SignupFormSchema } from "../lib/definitions"
import { hash } from "bcrypt-ts"
import * as z from 'zod';
import { redirect } from "next/navigation"



export async function signup(formData: FormData) {
    const login = formData.get('login')
    const email = formData.get('email')
    const password = formData.get('password')
    const name = formData.get('name')

    const validatedFields = SignupFormSchema.safeParse({login, name, email, password});

    if (!validatedFields.success) {
        return {
            errors: z.treeifyError(validatedFields.error),
            message: 'Incorrect data'
        }
    }
    const { login: vLogin, name: vName, email: vEmail, password: vPasword } = validatedFields.data;

    try {
        // 1. Проверяем уникальность email
        const existingUser = await db.orm.public.User.where({ email: vEmail }).first();
        if (existingUser) {
            return { message: 'This email already exist' }
        }
        // 2. Проверяем уникальность login
        const existingLogin = await db.orm.public.User.where({ login: vLogin }).first()
        if (existingLogin) {
        return { message: 'This login already taken.' }
        }


        const hashedPassword = await hash(vPasword, 10);

        await db.orm.public.User.create({
            login: vLogin,
            email: vEmail,
            password: hashedPassword,
            name: vName || null,
        })
    } catch (error) {
        console.error('Database error during signup:', error)
        return { message: 'Database error occurred.' }
    }
    
    return { success: true, message: 'Account created successfully!' }
    // redirect('/')
}
