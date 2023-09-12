import React, {useEffect, useState} from 'react';

import css from './movieInfo.module.css';
import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {IMovie} from "../../interfaces/movieInterface";
import {movieActions} from "../../redux";
import {IGenre} from "../../interfaces/genresInterface";
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import StarIcon from '@mui/icons-material/Star';
import {StarRating} from "./starRating";

const MovieInfo = () => {
    //Виведення данних зі стейті в хеддер для того, щоб користувач зразу мав доступ до інформації

    const dispatch = useAppDispatch();
    const {genres} = useAppSelector(state => state.movieReducer)

    const {state: movie} = useAppLocation<IMovie>();
    // const [currentMovie, setCurrentMovie] = useState(movie);

    useEffect(() => {
        dispatch(movieActions.allGenres());
    }, []);

    const currentMovieGenres: IGenre[] = [];

    genres.filter(genre => {
        movie.genre_ids.map(currentMovie => genre.id === currentMovie ? currentMovieGenres.push(genre) : null)
    })

    //Запит на додаткову інформації про фільм, яка вже буде підгружатись

    console.log(movie)

    return (
        <div className={css.movieInfoWrapper}>
            <div className={css.movieHeader}>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
                </div>
                <div className={css.movieInfo}>
                    <h2>{movie.title}</h2>
                    <div className={css.genreBar}>
                        {movie.release_date}・
                        {currentMovieGenres.map((movieGenre,index )=> {
                            return <a key={movieGenre.id}>
                                {currentMovieGenres[currentMovieGenres.length - 1].id === movieGenre.id ? movieGenre.name : `${movieGenre.name},`}
                            </a>}
                        )}・
                        <a>
                            {movie.original_language}
                        </a>
                    </div>
                    <div className={css.movieRating}>
                        <div className={css.rateVotes}>
                            <div>
                                <h3>{movie.vote_average}</h3>
                                <StarIcon/>
                            </div>
                            <div>
                                <h3>{movie.vote_count}</h3>
                                <ThumbsUpDownIcon/>
                            </div>
                        </div>
                        <div>
                            <StarRating/>
                        </div>
                    </div>
                    <div className={css.overview}>
                        <h2>
                            Overview:
                        </h2>
                        <h3>{movie.overview}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {
    MovieInfo,
};