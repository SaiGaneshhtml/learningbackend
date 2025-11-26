import express from 'express';

const app = express(); 

app.use(express.json());

//routes import
import userRoutes from './routes/user.routes.js';

//router declaration
app.use('/api/v1/users', userRoutes);

//examole route  :http://localhost:4000/api/v1/users/register


export default app;