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

    useEffect(() => {
        const movieToUpdate = props.movies.find(e => {
            return `${e.id}` === id
        })
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [props.movies, id]);

    const handleSubmit = e => {
        e.preventDefault();

        axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log("Edit put response ", res);
            const newArr = props.movies.map(e => {
                if(`$e.id` === id) {
                    return movie;
                } else {
                    return e;
                }
            })
            props.setMovieList(newArr);
            push(`/movies/${id}`)
        })
        .catch(err => {
            console.log("Edit put error ", err);
        });
    }

    return (
        <div className='form-wrap'>
            <h2>Update Movie</h2>
            <form className='form-bit' onSubmit={handleSubmit}>

                <label htmlFor='title'/>
                <input
                className='submit-input'
                type='text'
                name='title'
                id='title'
                placeholder='title'
                onChange={handleChange}
                value={movie.title}/>

                <label htmlFor='director'/>
                <input
                className='submit-input'
                type='text'
                name='director'
                id='director'
                placeholder='director'
                onChange={handleChange}
                value={movie.director}/>

                <label htmlFor='metascore'/>
                <input
                className='submit-input'
                type='text'
                name='metascore'
                id='metascore'
                placeholder='0'
                onChange={handleChange}
                value={movie.metascore}/>

                <button className='submit-bit'>Submit update</button>

            </form>
        </div>
    )
}

export default UpdateMovie;