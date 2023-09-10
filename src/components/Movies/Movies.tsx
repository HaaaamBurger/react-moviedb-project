import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {useSearchParams} from "react-router-dom";
import {Movie} from "../Movie";

const Movies = () => {
    const dispatch = useAppDispatch()
    const {movies} = useAppSelector(state => state.movieReducer);
    const [query, setQuery] = useSearchParams({page: '1'})

    useEffect(() => {
        dispatch(movieActions.all({id: query.get('page')}));
        setQuery(prev => ({...prev, page: prev.get('page')}))
    }, [query, dispatch, setQuery]);


    console.log(movies)

    return (
        <div>
            {movies.results.map(movie => <Movie key={movie.id} movie={movie}/>)}
        </div>
    );
};

export {
    Movies,
};