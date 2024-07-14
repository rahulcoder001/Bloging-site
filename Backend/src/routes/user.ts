import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Signupscema , Signinscema } from '@rahulcoder001/mideam-common'
import { sign } from 'hono/jwt'

const userrouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_KEY: string,
  }
}>();

userrouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		const {success} = Signupscema.safeParse(body);
		if(!success) {
		c.status(403);
		return c.json({ error: "invalid input" });
		}
		const user = await prisma.user.create({
			data: {
				email: body.email,
				name: body.name,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_KEY);
		return c.json({ jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

userrouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		const {success} = Signinscema.safeParse(body);
		if(!success) {
		c.status(403);
		return c.json({ error: "in valid input" });
		}
		const user = await prisma.user.findUnique({
			where:{
				email: body.email
			}
		});
		if(!user){
			c.status(403);
            return c.json({ error: "user not found" });
		}
		if(user.password===body.password){
			const jwt = await sign({ id: user.id }, c.env.JWT_KEY);
			return c.json({ jwt });
		}
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
});

export default userrouter;