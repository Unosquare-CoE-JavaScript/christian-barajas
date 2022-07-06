import axios from 'axios';
import { FETCH_USER, FETCH_BLOGS, FETCH_BLOG } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBlog = (values, file, history) => async dispatch => {
  try {
    /* 
    const uploadConfig = await axios.get('/api/uploads');
  
    const upload = await axios.put(uploadConfig.data.signedURI, file, {
      headers: {
        'Content-Type': file.type
      }
    })
    const res = await axios.post('/api/blogs', {...values, imageUrl: upload.data.key});
     */
    const res = await axios.post('/api/blogs', values);
  
    history.push('/blogs');
    dispatch({ type: FETCH_BLOG, payload: res.data });
  } catch(error) {
    console.log(error)
  }
};

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get('/api/blogs');

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async dispatch => {
  const res = await axios.get(`/api/blogs/${id}`);

  dispatch({ type: FETCH_BLOG, payload: res.data });
};
