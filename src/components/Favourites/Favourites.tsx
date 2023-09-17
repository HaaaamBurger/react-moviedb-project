import React, {useEffect, useState} from 'react';

import css from '../Movies/movies.module.css'

import {FavMovie} from "./FavMovie";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import {favouriteActions} from "../../redux";

const Favourites = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const [favMovies, setFavMovies] = useState([]);

    useEffect(() => {
        const getFavMovies = JSON.parse(localStorage.getItem('favourites')) || [];
        if (getFavMovies.length) {
            setFavMovies(getFavMovies);
        } else {
            dispatch(favouriteActions.setFavouriteError(true))
            navigate('/movies');
        }
    }, []);

    return (
        <div className={css.moviesWrapper}>
            {
                <div>
                    {favMovies.map((movie, index) => <FavMovie movie={movie} key={index}/>)}
                </div>
            }
        </div>
    );
}
export {
    Favourites,
};