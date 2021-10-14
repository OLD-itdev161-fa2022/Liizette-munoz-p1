const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas.js');

router.get('/comments', async (req, res) => {
    const comments = Schemas.Comments;

    const userComments = await comments.find({}).populate("user").exec((err, commentData) => {
        if (err) throw err;
        if (commentData) {
            res.end(JSON.stringify(commentData));
        } else {
            res.end();
        }
    });
});

router.post('/addcomment', async (req, res) => {
    const userComment = req.body.commentInput;
    const user = Schemas.Users;
    const userId = await user.findOne({username:'Lizette M'}).exec();

    const newComment = new Schemas.Comments({
        comment: userComment,
        user: userId._id
    });
  

    try {
        await newComment.save( (err, newCommentResults) => {
            if (err) res.end('Error Saving.');
            res.redirect('/comments');
            res.end();
        });
    } catch(err) {
        console.log(err);
        res.redirect('/comments');
        res.end();
    }
});




module.exports = router;