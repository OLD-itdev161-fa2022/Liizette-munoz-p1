const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type:String, required:true},
    fullname: {type:String, required:true},
    entryDate: {type:Date, default:Date.now}
});

const CommentSchema = new Schema({
    comment: {type:String, required:true},
    user: {type:Schema.Types.ObjectId, ref:'users'}
});

const Users = mongoose.model('users', userSchema, 'users');
const Comments = mongoose.model('comments', CommentSchema, 'comments');
const mySchemas = {'Users':Users, 'Comments':Comments};

module.exports = mySchemas;