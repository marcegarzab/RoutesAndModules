// Array used for the blog-post as “dummy database”
// Handles all access to the blog-post array

const uuid = require('uuid'); //universal unique identifier = standard for generating ids

let blogPostDB = [
    {
        id: uuid.v4(),
        title: "First Post",
        content: "This is Marce's first post",
        author: "Marcela",
        publishDate: '24-Mar-19'
    },
    {
        id: uuid.v4(),
        title: "Second Post",
        content: "This is Pau's first post",
        author: "Paulina",
        publishDate: '25-Mar-19'
    },
    {
        id: uuid.v4(),
        title: "Third Post",
        content: "This is Carlos's first post",
        author: "Carlos",
        publishDate: '26-Mar-19'
    },
    {
        id: uuid.v4(),
        title: "Fourth Post",
        content: "This is Alejandro's first post",
        author: "Alejandro",
        publishDate: '27-Mar-19'
    }
];

const PostActions = {
    getAllPosts : function(){
        return blogPostDB;
    }
    
    getAuthorPosts : function(author){
        const authorPostsArray = [];
        blogPostDB.forEach(item => {
            if(author == item.author){
                authorPostsArray.push(item);
            }
        });
        return authorPosts;
    },

    newPost : function(postTitle, postContent, postAuthor, postPublishDate){
        let newPost = {
            id: uuid.v4(),
            title: postTitle,
            content: postContent,
            author: postAuthor,
            publishDate: postPublishDate
        };
        blogPostDB.push(newPost);
        return newPost;
    },

    deletePost : function(postId){
        let post = null;
        blogPostDB.forEach((item, index) => {
            if(postId == item.id){
                post = blogPostDB[index];
                delete blogPostDB[index];
            }
        });
        return post;
    },

    putPost : function(postId, postTitle, postcontent, postAuthor, postPublishDate){
        let post = null;
        blogPostDB.forEach(item => {
            if(postId == item.id){
                if(postTitle) {item.title = postTitle;}
                if(postcontent) {item.content = postcontent;}
                if(postAuthor) {item.author = postAuthor;}
                if(postPublishDate) {item.publishDate = postPublishDate;}
                post = item;
            }
        });
        return post;   
    }
};

module.exports = {PostActions};
