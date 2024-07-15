
import zod from 'zod';

export const Signupscema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8).max(20),
    name: zod.string().min(2).max(50),
})

export const Signinscema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8).max(20),
})

export const blogscema = zod.object({
    title: zod.string(),
    content: zod.string(),
})

export const updateblogscema = zod.object({
    title: zod.string().min(5).max(50).optional(),
    content: zod.string().min(10).optional(),
})

export type signupinput = zod.infer<typeof Signupscema>

export type signininput = zod.infer<typeof Signinscema>

export type bloginput = zod.infer<typeof blogscema>

export type updatebloginput = zod.infer<typeof updateblogscema>
