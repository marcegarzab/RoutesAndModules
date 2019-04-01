// Connects the route and model files

const express = require('express'); //library to envoque router methods
const app = express(); //instance of express (big obj)
const postsRouter = require('./blog-post-router');
const bodyParser = require('body-parser'); //to extract POST attributes
const jsonParser = bodyParser.json();

app.use('/posts/api', jsonParser, postsRouter);

app.listen(8080, () => {
    console.log("App running in port 8080");
});