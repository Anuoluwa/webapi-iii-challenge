const logger = (req, res, next) => {
  let currenttime = Date();
  let timestamp = currenttime.toString();
  console.log(`These are the details of the your requests =>
    X-REQ URL:${req.url},
    X-REQ METHOD:${req.method}, 
    X-TIMESTAMP: ${timestamp}`);
  next();
};

export default logger;
