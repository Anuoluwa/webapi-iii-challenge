import express from 'express';
import Posts from './postDb';
import User from '../users/userDb';
import validateId from '../../middlewares/validateId';
import validatePost from '../../middlewares/validatePost';

const postsRoutes = express.Router();

  postsRoutes.post('/:id', validateId, validatePost, async (req, res) => {
    const user = await User.getById(req.params.id);
    const { text } = req.body;
    const post = {
        user_id: req.params.id,
        text
    }
    try { 
        if(user) {
            if(post) {
                const newPost = await Posts.insert(post);
               return res.status(201).json({ message: "new post is posted successfully", data: post });
            }
        }  else {
            return res.status(404).json({ message: `The post with the specified ID ${req.params.id} does not exist.` });
        }
    } catch(error) {
        res.status(500).json({ error: "There was an error while saving the comment to the database" });
    }
  })

  postsRoutes.get('/', async (req, res) => {
      try {
        const posts = await Posts.get(req.query);
        res.status(200).json(posts);
      } catch(error) {
        res.status(500).json({ error: "The posts information could not be retrieved." });
      }
  })

  postsRoutes.get('/:id', validateId,  async (req, res) => {
      const post = await Posts.getById(req.params.id);

      try {
          if(post) {
              res.status(200).json(post)
          } else {
              res.status(404).json({ message: `The post with the specified id:${req.params.id} does not exist.` })
          }
      } catch(error) {
          res.status(500).json({ error: "The post information could not be retrieved." })
      }
  })


postsRoutes.delete('/:id', validateId, async (req, res) => {
    const item = await Posts.getById(req.params.id);
    try {
        if(item) {
            const post = await Posts.remove(Number(req.params.id));
            res.status(200).json({message: "This post has been deleted successfully",  post: item,})
        } else {
            res.status(404).json({ message: `The post with the specified ID ${req.params.id} does not exist.` })
        }
    } catch(error) {
        res.status(500).json({ error: "The post could not be removed" })
    }

})

postsRoutes.put('/:id', validateId, validatePost, async (req,res) => {
    const { id } =req.params;
    const { text } = req.body;
    const post = {
        user_id: req.params.id,
        text
    }
    const posts = await Posts.getById(id);
 
    try {

        if(posts) {
            const updatedPost = await Posts.update(id, post);
            res.status(201).json({ message: "new post created successfully", updatedPost: { ...post} });
        } else {
            res.status(404).json({ message: `The post with the specified ID ${req.params.id} does not exist.` })

        }
    } catch (error) {
        res.status(500).json({ errorMessage: "Please provide title and contents for the post."  });
      }
})

export default postsRoutes;