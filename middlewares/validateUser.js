const validateUser = (req, res, next) => {
  const { name } = req.body;
  const user = {
    name
  };
  if (typeof user.name === "undefined" ) {
    return res
      .status(404)
      .json({ errorMessage: "Please provide name as key, and value for the new user." });
  } 
  if(user.name.trim() === '') {
    return res
      .status(404)
      .json({ errorMessage: "Please provide value for the new user." });
  }
  next();
};

export default validateUser;
