import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialInput = {
    title: '',
    director: '',
    metascore: '',
}

const UpdateMovie = props => {

    const { id } = useParams();
    const { push } = useHistory();

    const [movie, setMovie] = useState(initialInput);

    const handleChange = e => {
        e.persist();
        let value = e.target.value;

        if (e.target.name === 'metascore') {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    }

    // useEffect(() => {
    //     const movieToUpdate = props.movies.find
    // }, []);

    return (
        <div className='form-bit'>
            <h2>Update Movie</h2>
            <form className='form-bit'>

                <label htmlFor='title'/>
                <input
                type='text'
                name='title'
                id='title'
                placeholder='title'
                onChange={handleChange}
                value={movie.title}/>

                <label htmlFor='director'/>
                <input
                type='text'
                name='director'
                id='director'
                placeholder='director'
                onChange={handleChange}
                value={movie.director}/>

                <label htmlFor='metascore'/>
                <input
                type='text'
                name='metascore'
                id='metascore'
                placeholder='metascore'
                onChange={handleChange}
                value={movie.metascore}/>

                <button>Submit update</button>

            </form>
        </div>
    )
}

export default UpdateMovie;