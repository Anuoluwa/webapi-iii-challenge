import express from 'express';
import routes from './api'
import logger from './middlewares/logger'


const server = express();
server.use(express.json());
server.use(logger);

server.use('/api', routes);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


server.all('*', (req, res) => {
  res.json(`
    Sorry, invalid routes, try again!
  `);
});

module.exports = server;
