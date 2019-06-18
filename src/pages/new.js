import React, { useState } from 'react';
import api from '../services/api';

const New = ({ history }) => {
  const [state, setState] = useState({
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const data = new FormData();
    
    data.append('image', state.image);
    data.append('author', state.author);
    data.append('place', state.place);
    data.append('description', state.description);
    data.append('hashtags', state.hashtags);
    
    await api.post('/posts', data)
    .then(_ => history.push('/'))
  };

  const handleImageChange = event => {
    setState({ ...state, image: event.target.files[0] })
  };

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='file' onChange={handleImageChange} />
      <input 
        type='text'
        name='author'
        placeholder='Author'
        onChange={handleChange}
        value={state.author}
      />

      <input 
        type='text'
        name='place'
        placeholder='Place'
        onChange={handleChange}
        value={state.place}
      />

      <input 
        type='text'
        name='description'
        placeholder='Description'
        onChange={handleChange}
        value={state.description}
      />

      <input 
        type='text'
        name='hashtags'
        placeholder='Hashtags'
        onChange={handleChange}
        value={state.hashtags}
      />

      <button type='submit'>
        Publicar
      </button>
    </form>
  )
};

export default New;