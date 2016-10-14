var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	text: {type: String, required: [true, 'You must enter comment content.']},
	post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

mongoose.model('Comment', CommentSchema);