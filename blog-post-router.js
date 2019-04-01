// Holds all endpoints: URLs that represent an object(s)

const express = require('express');
const router = express.Router();
const {PostActions} = require('./blog-post-model');

// GET to check its working
router.get('/', (request, response) => {
    response.status(200).json({
        message: "Working!",
        status: 200
    });
});

// GET all posts
router.get('/blog-posts', (request, response, next) => {
    let allPosts = PostActions.getAllPosts();

    if(allPosts){
        response.status(200).json({
            message: "Successfully sent all blog posts",
            status: 200,
            posts: allPosts
        });
    }
    else{
        response.status(500).json({
            message: "Internal server error",
            status: 500
        });
        next();
    }
});


// GET all posts by author
router.get('/blog-posts/:author', (request, response) => {
	let postAuthor = request.params.author;

	if(!postAuthor){
		response.status(406).json({
			message: "missing author",
			status: 406
		});
	}

	let allPosts = PostActions.getAuthorPosts(postAuthor);

	if(allPosts.length > 0){
		response.status(200).json({
			message: "Successfully sent the list of author posts",
			status: 200,
			post: allPosts
		});
	}
	else{
		response.status(404).json({
			message: "No author posts found",
			status: 404
		});
		next()
	}
});

// POST a new blog post
router.post('/blog-posts', (request, response, next) => {
	let postTitle = request.body.title;
    let postContent = request.body.content;
    let postAuthor = request.body.author;
    let postPublishDate = request.body.publishDate;
    let fields = ['title', 'content', 'author', 'publishDate'];

    for (let x = 0; x < fields.length; x++){
    	let currentField = fields[x];
    	if(!(currentField in request.body)){
    		response.status(406).json({
    			message: `${currentField} is missing`,
    			status: 406
    		});
    		return next()
    	}
    }

    let newPost = PostActions.newPost(postTitle, postContent, postAuthor, postPublishDate);

    response.status(201).json({
    	message: "Successfully added post",
    	status: 201,
    	post: newPost
    });
});

//Delete post
router.delete('/blog-posts/:id', (request, response, next) => {
	let bodyId = request.body.id;
	let paramId = request.params.id;

	if(!bodyId || !paramId || bodyId != paramId){
		response.status(406).json({
			message: "Mmissing id",
			status: 406
		});
		return next();
	}

	if(PostActions.delete(paramId)){
		response.status(200).json({
			message: "Successfully deleted post",
			status: 200
		});
	}
	else{
		response.status(404).json({
			message: "Post not found",
			status: 404
		});
		next();
	}
});

// PUT
router.put('/blog-posts/:id', (request, response) => {
	let postId = request.params.id;
	let updatedPost = request.body;

	if(!postId){
		response.status(406).json({
			message: "Missing id",
			status: 404
		});
	}

	if(!updatedPost.title && !updatedPost.content && !updatedPost.author && !updatedPost.publishDate){
		response.status(404).json({
			message: "No data in body",
			status: 404
		});
	}

	let newPost = PostActions.putPost(postId, updatedPost.title, updatedPost.content, updatedPost.author. updatedPost.publishDate);

	if(newPost){
		response.status(200).json({
			message: "Successfully updated post",
			status: 200,
			post: newPost			
		});
	}
	else{
		response.status(404).json({
			message: "Id does not exist",
			status: 404
		});
		next();
	}
});

module.exports = router;
