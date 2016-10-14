var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: {type: String, required: [true, 'You must enter a username.'], minlength: [2, 'You must enter a username of at least 2 characters.']},
	topics: [{type: mongoose.Schema.Types.ObjectId, ref: 'Topic'}],
	posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

mongoose.model('User', UserSchema);