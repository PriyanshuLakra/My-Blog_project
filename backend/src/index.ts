import { Hono } from 'hono'

import { cors } from 'hono/cors'



import { userRouter } from './routes/users';

import {blogRouter} from './routes/blog'



const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET:string;
		
	}
}>();

app.use('/*', cors())

// app.use('/api/v1/blog/*', async (c, next) => {

	// const jwt = c.req.header('Authorization');
	// if (!jwt) {
	// 	c.status(401);
	// 	return c.json({ error: "unauthorized" });
	// }
	// const token = jwt.split(' ')[1];
	// const payload = await verify(token, "Lakra@123");
	// if(payload.id){
  //   next();
  // }
  // else{
  //   c.status(403);
  //   return c.json({error:"unauthorised"})
  // }
// })


// we did define prisma inside the post c function ,, because we cant have access to env fole outside it

app.route('/api/v1/user' , userRouter)
app.route('/api/v1/blog' , blogRouter)


export default app
