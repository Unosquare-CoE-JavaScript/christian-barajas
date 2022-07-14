// import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import * as rp from 'request-promise';

// Example ONE
/* 
    import * as uuid from 'uuid';
    console.log(uuid); 
*/

// Example TWO
/* 
// A simple function with an config parameter of type AxiosRequestConfig
// Such type has all parameters optional (?:)
const callGET =  () => {
    const config: AxiosRequestConfig = {
        baseURL:'Hello'
    };
    
    const response: AxiosPromise = axios.get('/lessons',  config)
}
 */

// EXAMPLE THREE
/* 
interface Lesson {
    id: number;
    description: string;
}

const getLesson = (lessonId: number) : AxiosPromise<Lesson> => {
    return axios.get(`%lesson/${lessonId}`)
}

const promise = getLesson(1)
promise .then((response) => {const lesson: Lesson = response.data})
 */

// Example FOUR
/* 
interface Lesson {
    id: number;
    description: string;
}

function getLesson(lessonId: number): Promise<Lesson> {
    return rp.get(`lessons/${lessonId}`);
}

const promise = getLesson(1);

promise.then(lesson => {
    // HELLO
})
 */