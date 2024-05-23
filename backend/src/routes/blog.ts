// import { PrismaClient } from "@prisma/client/extension";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput, updatePostInput } from "@priyanshulakra/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();


// using middleware to verify the jwt token .. that the user uho is reading or making blogs is a valid user or not 
blogRouter.use("/*", async (c, next) => {


    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);

    if (user) {
        c.set("userId", user.id);
        await next();
    } else {
        c.status(403);
        return c.json({
            message: "you are not allowed"
        })
    }
})

// making a new blog
blogRouter.post('/', async (c) => {

    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "inputs are not correct"
        })
    }
    const authodid = c.get("userId");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authodid)
        }
    })

    return c.json({
        id: blog.id
    })

})


// updating the existing blog
blogRouter.put('/', async (c) => {

    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "inputs are not correct"
        })
    } 

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content

        }

    })


})

// returning all the blogs ,, but not all the contect .. just the title 
blogRouter.get('/bulk', async (c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const blogs = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });
    
    
    return c.json({
        blogs
    })
    
})

// getting a particular blog
blogRouter.get('/:id', async (c) => {

    const id = c.req.param("id");
    

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {

        const blog = await prisma.post.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        
        return c.json({
            blog
        })
    } catch (e) {
        c.status(411);
        return c.json({
            message: "Error while fetching the "
        })
    }
})
