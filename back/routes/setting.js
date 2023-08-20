const express = require('express');
const router = express.Router();
const multer = require("multer")// to upload file
const User = require("../models/User");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {//destination = save location
        cb(null, "public/images"); //store posted image in "public/images"
    },
    filename: (req, file, cb)=> {  //file name
        cb(null, req.body.name ); //req.body.name = fileName in setting.jsx
        //cb(null, file.originalname); //this is for checking in postman
    },
});

//1, setting profile pic
const uploadPic =  multer({ storage: storage });
router.put("/profilePic/:userId", uploadPic.single("file"), async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        await user.updateOne({ $set: { profilePicture:req.file.filename }});
        // console.log(req.file)
        await user.save();
        return res.status(200).json("Profile picture is set successfully");
    }catch(err){
        console.log(err)
    }
})

//2, setting cover pic
const uploadCover =  multer({ storage: storage });
router.put("/coverPic/:userId", uploadCover.single("file"), async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        await user.updateOne({ $set: { coverPicture:req.file.filename }});
        // console.log(req.file)
        await user.save();
        return res.status(200).json("Cover picture is set successfully");
    }catch(err){
        console.log(err)
    }
})

//3, setting user information
router.put("/information/:id", async (req, res) => { // :id = params.id
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            console.log(user)
            return res.status(200).json("Account has been updated");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403)
        .json("You can update only your account");
    }
});


module.exports = router;