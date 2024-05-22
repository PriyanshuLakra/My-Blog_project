

import { Hono } from "hono";

// this import doest work .. dont no why 
// import { PrismaClient } from "@prisma/client/extension";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
// import withAccelerate from 'prisma-with-accelerate';

import { sign , verify } from "hono/jwt";
import { signinInput, signupInput } from "@priyanshulakra/medium-common";


export  const userRouter = new Hono<{

    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    }
}>();

userRouter.post('/signup', async (c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
   
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"inputs are not correct"
        })
    }
    // the user has specific id .. which is used to create jwt token for it when signed up
    const user = await prisma.user.create({
      data:{
        email:body.email,
        password:body.password
      }
    })
    const token = await sign({ id: user.id },"Lakra@123");
        return c.json({ jwt:token });
})


userRouter.post('/signin', async (c) => {

const prisma = new PrismaClient({
datasourceUrl:c.env.DATABASE_URL,
}).$extends(withAccelerate())

const  body = await c.req.json();
const {success} = signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"inputs are not correct"
        })
    }
const user = await prisma.user.findUnique({
where:{
  email:body.email,
  password:body.password
}
})


if(!user){
c.status(403);
    return c.json({ error: "user not found" });
}

const jwt = await sign({id:user.id} , c.env.JWT_SECRET);
return c.json({jwt});


})