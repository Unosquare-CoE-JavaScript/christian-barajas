var MAINAPP = (function(nsp) {
    "use strict";

    let url = 'https://jsonplaceholder.typicode.com/';
    let posts = [];
    /*
        The following promise code is inside a module pattern. 
        Change the promise code so that it uses async await instead. 
        You will want to use an IIFE for this.
         Make sure to catch any errors.
    */

    (async function () {
        try {
            const response = await fetch(url + 'posts/')
                .then(response1 => response1.json())

            posts = response;

            nsp.posts = posts;

            console.log('DATA Loaded')
        } catch(error) {
            console.error(`Problem retrieving posts: ${error}`);
        }
    })()

    // fetch(url + 'posts/')
    // .then(response1 => response1.json())
    // .then(posts => nsp.posts = posts)
    // .catch(err => console.log(`Problem retrieving posts: ${err}`));

    //public
    return nsp;
})(MAINAPP || {});


