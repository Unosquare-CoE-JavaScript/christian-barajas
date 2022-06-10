//    Create a function that will retrieve the posts from the 
//    jsonplaceholder site (https://jsonplaceholder.typicode.com/posts). 
//    Set up the function so you can pass in the userID and the function will 
//    assign only the posts for that user to a variable. The data should be stored in an array.
const BaseUrl = "https://jsonplaceholder.typicode.com/posts";

const GetPostsByUserId = async (userId) => {
    let postByUser = [];
    try { 
        if (!userId) {
            throw "NO USER ID DETECTED";
        }
        const posts = await fetch(`${BaseUrl}`).then(res => res.json())
        postByUser =  posts.filter(post => post.userId === userId);
        return postByUser;
    } catch(error) {
        console.error(error);
        return error;
    }
}

GetPostsByUserId(3)
    .then(response => console.log(response))
    .catch(error => console.error(error));

console.log("Remaining Code");