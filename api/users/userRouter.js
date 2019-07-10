import express from 'express';
import User from './userDb';

const userRoutes = express.Router();

  userRoutes.get('/users/:id/posts', async (req, res) => {
    const post = await User.getUserPosts(Number(req.params.id));
    try {
        if(post.length) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: `The post with the specified id ${req.params.id} does not exist.` })
        }
    } catch(error) {
        res.status(500).json({ error: "The user's posts information could not be retrieved." })
    }
})


userRoutes.get('/users', (req, res) => {
    User.get()
     .then(data => {
        if(data.length === 0 ) {
            res.status(404).json({ message: 'users not found' })
        }
         res.status(200).json(data);
     })
     .catch(error => {
         res.status(500).json({ error: "The users information could not be retrieved." });
     })
})

userRoutes.get('/users/:id', (req, res) => {
    const { id } =req.params;
    User.getById(Number(id))
    .then(data => {
       if(typeof data === 'undefined' ) {
           return res.status(404).json({ message: `user with ${id} not found` })
       }
        res.status(200).json(data);
    })
    .catch(error => {
        return res.status(500).json({ error: "The users information could not be retrieved." });
    })
})

userRoutes.post('/users', (req, res) => {
    const {name, bio } =req.body;
    const user = {
        name, bio
    }
    if(typeof user.name === 'undefined' || typeof user.bio === 'undefined' ) {
        return res.status(404).json({ errorMessage: "Please provide name and bio for the new user." })
    }
    User.insert(user)

    .then(data => {
         return res.status(201).json({ message: 'user  created successfully', data: user } );
     })
     .catch(error => {
         return res.status(500).json({ error: "The users information could not be created." });
     })
})


userRoutes.put('/users/:id', (req, res) => {
    const { id } =req.params;
    const {name, bio } =req.body;
    const user = {
        name, bio
    }
    User.update(Number(id), user )
    .then(data => {
        res.status(200).json({ message: 'user updated successfully', data: user });
    })
    .catch(error => {
        return res.status(500).json({ error: "The users information could not be retrieved." });
    })
})

userRoutes.delete('/users/:id', (req, res) => {
    const { id } =req.params;
    User.remove(Number(id))
    .then(data => {
        if(!data) {
            return res.status(404).json({ message: `The user with the ${id} does not exist.`});
        }
        res.status(200).json({ message: `The user with the ${id} has been removed`});
    })
    .catch(error => {
        return res.status(500).json({ error: "The user could not be removed" });
    })
})


module.exports = userRoutes;
