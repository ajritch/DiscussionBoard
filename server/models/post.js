var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	text: {type: String, required: [true, 'You must enter post content.']},
	upvotes: {type: Number, default: 0},
	downvotes: {type: Number, default: 0},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	topic: {type: mongoose.Schema.Types.ObjectId, ref: 'Topic'},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

mongoose.model('Post', PostSchema);