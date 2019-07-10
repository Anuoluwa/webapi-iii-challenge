import express from 'express';
import Posts from './postDb.js';
import User from '../users/userDb';


const postsRoutes = express.Router();


  postsRoutes.post('/posts/:id/', async (req, res) => {
    const user = await User.getById(req.params.id);
    const { text } = req.body;
    const post = {
        user_id: req.params.id,
        text
    }
    try { 
        if(user.length) {
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

  postsRoutes.get('/posts', async (req, res) => {
      try {
        const posts = await Posts.get(req.query);
        res.status(200).json(posts);
      } catch(error) {
        res.status(500).json({ error: "The posts information could not be retrieved." });
      }
  })

  postsRoutes.get('/posts/:id', async (req, res) => {
      const post = await Posts.getById(req.params.id);

      try {
          if(post.length) {
              res.status(200).json(post)
          } else {
              res.status(404).json({ message: `The post with the specified id ${req.params.id} does not exist.` })
          }
      } catch(error) {
          res.status(500).json({ error: "The post information could not be retrieved." })
      }
  })


postsRoutes.delete('/posts/:id', async (req, res) => {
    const item = await Posts.getById(Number(req.params.id));
    try {
        if(item.length) {
            const post = await Posts.remove(Number(req.params.id));
            res.status(200).json({message: "This post has been deleted successfully",  post: item,})
        } else {
            res.status(404).json({ message: `The post with the specified ID ${req.params.id} does not exist.` })
        }
    } catch(error) {
        res.status(500).json({ error: "The post could not be removed" })
    }

})

postsRoutes.put('/posts/:id', async (req,res) => {
    const { id } =req.params;
    const { title, contents } = req.body;
    const posts = await Posts.getById(Number(req.params.id));
    const post = {
        title, contents
    }
    try {

        if(posts.length) {
            const updatedPost = await Posts.update(id, post);
            res.status(201).json({ message: "new post created successfully", updatedPost: { ...post} });
        } else {
            res.status(404).json({ message: `The post with the specified ID ${req.params.id} does not exist.` })

        }
    } catch (error) {
        res.status(500).json({ errorMessage: "Please provide title and contents for the post."  });
      }
})


  module.exports = postsRoutes;

// const express = 'express';

// const router = express.Router();

// router.get('/', (req, res) => {

// });

// router.get('/:id', (req, res) => {

// });

// router.delete('/:id', (req, res) => {

// });

// router.put('/:id', (req, res) => {

// });

// // custom middleware

// function validatePostId(req, res, next) {

// };

// module.exports = router;