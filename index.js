import express from 'express';

import userRoutes from './api/users/userRouter';
import postsRoutes from './api/posts/postRouter';

const server = express();
server.use(express.json());

server.use('/api', userRoutes);
server.use('/api', postsRoutes);


server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda BLOG API</h>
    <p>Welcome to the Lambda BLOG API</p>
  `);
});

server.listen(7000, () => {
  console.log(`\n*** Server Running on 7000 ***\n`);
});
