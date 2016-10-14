var mongoose = require('mongoose');

var TopicSchema = new mongoose.Schema({
	name: {type: String, required: [true, 'You must enter a topic name.']},
	description: {type: String},
	category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: [true, 'You must select a category.']},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
}, {timestamps: true});

mongoose.model('Topic', TopicSchema);