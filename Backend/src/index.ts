import { Hono } from 'hono';
import userrouter from './routes/user';
import blogrouter from './routes/blog';


const app = new Hono();


app.route('/api/v1/user',userrouter);
app.route('/api/v1/blog',blogrouter);

export default app;
