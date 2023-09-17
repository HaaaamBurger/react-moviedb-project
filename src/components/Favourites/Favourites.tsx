import React, {useEffect, useState} from 'react';

import css from '../Movies/movies.module.css'

import {FavMovie} from "./FavMovie";
import {useNavigate} from "react-router-dom";

const Favourites = () => {
    const [favMovies, setFavMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getFavMovies = JSON.parse(localStorage.getItem('favourites')) || [];
        if (getFavMovies.length) {
            setFavMovies(getFavMovies);
        } else {
            navigate('/movies')
        }
    }, []);

    return (
        <div className={css.moviesWrapper}>
            {
                <div>
                    {favMovies.map((movie, index) => <FavMovie movie={movie} key={index}/>)}
                    {/*<button  onClick={() => {*/}
                    {/*    localStorage.removeItem('favourites');*/}
                    {/*    setFavMovies([]);*/}
                    {/*}}>Clear*/}
                    {/*</button>*/}
                </div>
            }
        </div>
    );
}
export {
    Favourites,
};