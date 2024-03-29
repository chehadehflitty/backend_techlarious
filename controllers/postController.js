const Post=require("../models/postSchema");
const User=require("../models/userSchema");

exports.createPost =async (req,res) => {
  try{
    const postOwner = await User.findById(req.body["postOwner"]);
    if (!postOwner){
      return res.status(401).json({message:"please login to create a new post"})
    }
    const newPost = await Post.create({
      postOwner: req.body["postOwner"],
      img: req.body["img"],
      caption: req.body["caption"],
      content: req.body["content"],
    });

    return res.status(201).json({data: newPost, message: "post created"});
  }catch(err){
    console.log(err);
    res.status(500).json({message: err.message});
  }
};

exports.deletePost = async (req,res) =>{
  try{
    const user = await User.findById(req.body["postOwner"])
    if (!user){
      return res.status(404).json({message:"user trying to delete is not found"})
    }
    const post = await Post.findById(req.params["postID"]);
    if (!post){
      return res.status(404).json({message:"post is not found"})
    }
    if(userTryinToDelete._id.toString() !== post.postOwner.toString()){
      return res.status(400).json({message: "user is not allowed to delete a post that is not on by them"})
    }

    await post.deleteOne();

    return res.status(200).json({message: "post deleted"})
  }catch(err){
    console.log(err);
    res.status(500).json({message: err.message});
   }
  };

  exports.like = async(req,res) => {
    try{
      // fb.com/chehadeh/..
      const post = await Post.findById(req.params["postID"]);
      if(!post) return res.status(401).json({message:"login to like"});

      if(!post.likes.includes(req.body["userID"])){
        await post.updateOne({$push:{likes: req.body["userID"]}});
        return res.status(200).json({message:"post has been liked"})
      }
      else{
        await post.updateOne({$pull:{likes: req.body["userID"]}});
        return res.status(200).json({message:"post has been disliked"})
      }
    }catch(err){
      console.log(err);
      res.status(500).json({message: err.message});
    }
  };

exports.fetchTimeLinePosts = async(req,res) => {
  try{
    const currentUser =await User.findById(req.body["currentUserID"]);
    if(!currentUser) return res.status(401).json({message: "login to continue"});

    const currentUserPosts = await Post.find({postOwner: req.body["currentUserID"],  
    });
    const friendsPosts = await Promise.all(
      currentUser.friends.map((friendID)=>{
        return Post.find({postOwner: friendID})
      })
    );
    const timeLinePosts=currentUserPosts.concat(...friendsPosts);

    return timeLinePosts.length <=0
    ? res.status(404).json({message:"there is no posts to display"})
    : res.status(200).json(timeLinePosts)
  }catch(err){
    console.log(err);
    res.status(500).json({message: err.message});
  }
}  