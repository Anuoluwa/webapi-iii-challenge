import express from "express";
import User from "./userDb";
import validateId from "../../middlewares/validateId";
import validateUser from '../../middlewares/validateUser.js'

const userRoutes = express.Router();

userRoutes.post("/", validateUser, (req, res) => {
    const { name } = req.body;
    const user = {
        name
    }
    User.insert(user)
      .then(data => {
        return res
          .status(201)
          .json({ message: "user  created successfully", data: user });
      })
      .catch((error) => {
        if (error.code.includes('SQLITE_CONSTRAINT')) {
            return res.status(409).json({
              status: 409,
              error: 'user cannot be registered twice',
            });
          } else {
            return res
            .status(500)
            .json({ error: "The users information could not be created." });
          }
      });
  });
userRoutes.get("/:id/posts", validateId, async (req, res) => {
  const post = await User.getUserPosts(Number(req.params.id));
  try {
    if (post.length) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: `The post with the specified id ${
          req.params.id
        } does not exist.`
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The user's posts information could not be retrieved." });
  }
});
userRoutes.get("/", (req, res) => {
  User.get()
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({ message: "users not found" });
      }
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
userRoutes.get("/:id", validateId, (req, res) => {
  const { id } = req.params;
  User.getById(id)
    .then(data => {
      if (typeof data === "undefined") {
        return res.status(404).json({ message: `user with ${id} not found` });
      }
      res.status(200).json(data);
    })
    .catch(error => {
      return res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
userRoutes.put("/:id", validateId, validateUser, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = {
    id,
    name
  };
  User.getById(id)
    .then(data => {
      if (typeof data === "undefined") {
        return res
          .status(404)
          .json({ message: `user with ID:${id} not found` });
      } else {
        User.update(id, user)
        .then(data => {
          return res
            .status(200)
            .json({ message: "user updated successfully", data: user });
        })
        .catch((error) => {
            if (error.code.includes('SQLITE_CONSTRAINT')) {
                return res.status(409).json({
                  status: 409,
                  error: 'The user name exists, please update with a new name',
                });
              } else {
                return res
                .status(500)
                .json({ error: "The users information could not be created." });
              }
        });
      }
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
userRoutes.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;
  User.remove(Number(id))
    .then(data => {
      if (!data) {
        return res
          .status(404)
          .json({ message: `The user with the ${id} does not exist.` });
      }
      res
        .status(200)
        .json({ message: `The user with the ${id} has been removed` });
    })
    .catch(error => {
      return res.status(500).json({ error: "The user could not be removed" });
    });
});

export default userRoutes;
