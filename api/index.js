
import express from 'express';
import userRoutes from './users/userRouter';
import postsRoutes from './posts/postRouter';

const route = express.Router();

route.use('/users', userRoutes);
route.use('/posts', postsRoutes);


export default route;


