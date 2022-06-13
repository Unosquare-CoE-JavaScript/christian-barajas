var MAINAPP = (function(nsp) {
    "use strict";

    let BaseURL = 'https://jsonplaceholder.typicode.com/';

    /*
        Change this code so that it uses Promise.all 
        to respond once all of the promises have returned. 
        Provide a notification to the console when the promises have completed.
    */
    const JSONPlaceholderAPIs = {
        PostsEndpoint: 'posts/',
        CommentsEndpoint: 'posts/',
        TodosEndpoint: 'posts/',
    }
    Promise.all([
        fetch(`${BaseURL}${JSONPlaceholderAPIs.PostsEndpoint}`).then(r => r.json()),
        fetch(`${BaseURL}${JSONPlaceholderAPIs.CommentsEndpoint}`).then(r => r.json()),
        fetch(`${BaseURL}${JSONPlaceholderAPIs.TodosEndpoint}`).then(r => r.json()),
    ])
        .then(function([PostData, CommentsData, TodosData]) {
            nsp.posts = PostData;
            nsp.comments = CommentsData;
            nsp.todos = TodosData;

            console.log('All Data recovered')
        })
        .catch(error => console.error(error))
        .finally(f => console.log('All Done'))

    //public
    return nsp;
})(MAINAPP || {});