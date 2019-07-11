const validatePost = (req, res, next) => {
  const { id } = req.body;
  const { text } = req.body;
  const post = {
    id,
    text
  };
  if (typeof post.text === "undefined") {
    return res
      .status(404)
      .json({
        errorMessage: "Please provide 'text' as key, and value for the new post."
      });
  }
  if (post.text.trim() === "") {
    return res
      .status(404)
      .json({ errorMessage: "Please provide value for the new post." });
  }
  next();
};

export default validatePost;
