const express = require('express');
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

//1.create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try{
        const savePost = await newPost.save();
        return res.status(200).json(savePost);
    }catch(err){
        return res.status(500).json(err);
    }
});

//2.update a post
router.put("/:id", async(req, res) => { //id = post id
    try{
        const post = await Post.findById(req.params.id);
        console.log(post)
        console.log(req.params)
        if(post.userId === req.params.id){
            await post.updateOne( {$set: req.body} );
            return res.status(200).json("The post has been updated")
        }else{
            return res.status(403).json("You can update only your post")
        }
    }catch(err){
        return res.status(500).json(err)
    }
})

//3.delete a post
router.delete("/:id", async(req, res) => { //id = post id
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne( {$set: req.body} );
            return res.status(200).json("The post has been deleted")
        }else{
            return res.status(403).json("You can delete only your post")
        }
    }catch(err){
        return res.status(500).json(err)
    }
});

//4.like or dislike a post
router.put("/:id/like", async(req, res) => { //id = post id
    try{
        const post = await Post.findById(req.params.id);
        //like
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push: { likes: req.body.userId } });
            return res.status(200).json("The post has been liked")
        }else{ //dislike
            await post.updateOne({ $pull: { likes: req.body.userId } });
            return res.status(200).json("The post has been disliked")
        }
    }catch(err){
        res.status(500).json(err);
    }
})

// //5.get all post
router.get("/all", async(req, res) => {
    try{
        const allPosts = await Post.find({});
        res.send(allPosts)
    }catch(err){
        return res.status(500).json(err);
    }
})

//6.get all of posts in friends's profile page
router.get("/friends/:userId", async (req, res) => {
    try{
        const friend = await User.findById(req.params.userId);
        const posts = await Post.find({ userId: friend._id });
        return res.status(200).json(posts);
    }catch(err){
        return res.status(500).json(err);
    }
})

//7.get all of following people's posts and my posts
router.get("/article/:userId", async (req, res) => {
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        //get all of the friend's posts
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
            return Post.find({ userId: friendId });
            })
        );
        return res.json(userPosts.concat(...friendPosts)); // combine my posts and friend's posts
    }catch(err){
        return res.status(500).json(err);
    }
})


//8.get all of favorite posts
router.get("/favorite/:userId", async (req, res) => {
    try{
        const currentUser = await User.findById(req.params.userId);
        // const userPosts = await Post.find({ userId: currentUser._id });
        //get all of the friend's posts
        const likedPosts = await Post.find({likes : {"$in":[req.params.userId]}});
        return res.json(likedPosts);
    }catch(err){
        return res.status(500).json(err);
    }
})



module.exports = router;