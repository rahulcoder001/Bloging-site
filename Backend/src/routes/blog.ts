import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { blogscema, updateblogscema } from "@rahulcoder001/mideam-common";


const blogrouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_KEY: string,
  },
  Variables:{
    userId: string,
  }
}>();


blogrouter.use('/*',async(c,next)=>{
    const head = c.req.header("Authorization")||"";
    if(!head) {
        c.status(404);
        return c.json({error: "Login first"})
    }
    const response = await verify(head,c.env.JWT_KEY);
    if(response) {
        //@ts-ignore
        c.set("userId",response.id);
        await next();
    }
    else{
        c.status(404);
        return c.json({error: "Login first"})
    }
})

blogrouter.get('/bulk',async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const blogs = await prisma.post.findMany()
    return c.json({
        blogs:blogs
    })
})

blogrouter.get('/:id', async (c) => {
    const body = c.req.param("id");
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where:{
                id:body
            }
        })
        return c.json({
            blog:blog
        })
    } catch (error) {
        c.status(411)
        return c.json({
            error: "error in finding"
        })
    }
    
});
  
blogrouter.post('/', async(c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
       const {success} = blogscema.safeParse(body);
       if(!success){
        c.status(403);
        return c.json({ error: "error while creating blog" });
       }
    const userId = c.get("userId");
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })

    return c.json({
        id:blog.id
    })
});
  
blogrouter.put('/', async(c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const {success} = updateblogscema.safeParse(body);
       if(!success){
        c.status(403);
        return c.json({ error: "error while creating blog" });
       }
    try {
        const blog = await prisma.post.update({
            where:{
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
    
        return c.json({
            id:blog.id
        })
    } catch (error) {
        c.status(411)
        return c.json({
            error: "error in updating"
        })
    }
   
});


export default blogrouter;