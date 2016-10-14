var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

module.exports = (function() {
	return {
		//add a new post
		create: function(req, res) {
			// console.log(req.params); // topic id (id)
			// console.log(req.body); //post text (text)
			//define the user!
			User.findOne({name: req.body.user}).exec(function(err, user) {
				if (err) {
					// console.log(err);
					res.json(err);
				} else if (user) { //if there's a user, update!
					//find the topic!!
					Topic.findOne({_id: req.params.id}).exec(function(err, topic) {
						if (err) {
							res.json(err);
						} else {
							//make the post!!!!
							var post = new Post({text: req.body.text, user: user._id, topic: topic._id});
							post.save(function(err) {
								if (err) {
									res.json(err);
								} else {
									//add post to user AND topic
									user.posts.push(post);
									user.save(function(err) {
										if (err) {
											res.json(err);
										} else {
											topic.posts.push(post);
											topic.save(function(err) {
												if (err) {
													res.json(err);
												} else {
													res.json({'saved': true});
												}
											});
										}
									});
								};
							});
						}
					});
				} //goodness those callbacks
				
			});
		}, //end of add post

		//add a new comment to post
		addComment: function(req, res) {
			// console.log(req.params); //topicID, postID
			// console.log(req.body); //post.newComment, commentUser (name)
			//find the user who posted the comment
			User.findOne({name: req.body.commentUser}).exec(function(err, user) {
				if (err) {
					res.json(err);
				} else if (user) {
					//find the post
					Post.findOne({_id: req.params.postID}).exec(function(err, post) {
						if (err) {
							res.json(err);
						} else if (post) {
							//make the comment, save to post and user
							var comment = new Comment({text: req.body.newComment, post: post._id, user: user._id});
							comment.save(function(err)  {
								if (err) {
									res.json(err);
								} else {
									//add to post and user
									user.comments.push(comment);
									user.save(function(err) {
										if (err) {
											res.json(err);
										} else {
											post.comments.push(comment);
											post.save(function(err) {
												if (err) {
													res.json(err);
												} else {
													res.json({'saved': true});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		} //end of add comment


	}
})();