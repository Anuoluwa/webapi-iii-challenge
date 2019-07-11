import server from './server'

const port = process.env.PORT || 7000
server.listen(port, () => {
  console.log(`\n*** Server Running on localhost:${port}***\n`);
});
