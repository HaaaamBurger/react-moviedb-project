import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {useSearchParams} from "react-router-dom";

const Movies = () => {
    const dispatch = useAppDispatch()
    const {movies} = useAppSelector(state => state.movieReducer);

    const [query, setQuery] = useSearchParams({page: '1'})

    useEffect(() => {
        dispatch(movieActions.all({id: query.get('page')}));
        setQuery(prev => ({...prev, page: prev.get('page')}))
    }, [query]);


    console.log(movies)

    return (
        <div>
            Movies
        </div>
    );
};

export {
    Movies,
};