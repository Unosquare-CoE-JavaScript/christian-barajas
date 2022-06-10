var MAINAPP = (function(nsp) {
    "use strict";

    let posts = [],
        comments = [],
        todos = [];

    /*
    This IIFE is the start of an application. 
    The first thing we want to do is download all the posts, 
    comments and todos so that we can work with them. 
    Add the code in order to do that. 
    
    Also, make sure that you add the posts, 
    comments and todos to the MAINAPP variable so they are accessible outside 
    this function (e.g. nsp.posts = posts & return nsp). 
    
    Because the code is asynchronous, you will need to consider the best way to do that.
    */
    const JSONPlaceholderURL = 'https://jsonplaceholder.typicode.com';
    const JSONPlaceholderPaths = {
        PostUrl: '/posts',
        CommentUrl: '/comments',
        TodosUrl: '/todos'
    }

    Promise.all([
        fetch(`${JSONPlaceholderURL}${JSONPlaceholderPaths.PostUrl}`).then(res => res.json()),
        fetch(`${JSONPlaceholderURL}${JSONPlaceholderPaths.CommentUrl}`).then(res => res.json()),
        fetch(`${JSONPlaceholderURL}${JSONPlaceholderPaths.TodosUrl}`).then(res => res.json()),
    ])

    .then( ([PostData, CommentData, TodosData]) => {
        posts = PostData,
        comments = CommentData,
        todos = TodosData;

        nsp.posts = posts;
        nsp.comments = comments;
        nsp.todos = todos;
        
        console.log('Data Filled');
    })
    .catch(errors => console.error(errors))

    //public
    nsp.posts = posts;
    nsp.comments = comments;
    nsp.todos = todos;
    return nsp;

})(MAINAPP || {});