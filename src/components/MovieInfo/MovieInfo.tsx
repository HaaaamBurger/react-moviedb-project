import React, {useEffect} from 'react';

import css from './movieInfo.module.css';
import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";

import {movieActions} from "../../redux";

import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import StarIcon from '@mui/icons-material/Star';
import {Box, Rating, Typography} from "@mui/material";
import {IGenre, IMovie} from "../../interfaces";

const MovieInfo = () => {
    //Виведення данних зі стейті в хеддер для того, щоб користувач зразу мав доступ до інформації

    const dispatch = useAppDispatch();
    const {genres,movieDetail} = useAppSelector(state => state.movieReducer)
    const {state: movie} = useAppLocation<IMovie>();

    useEffect(() => {
        dispatch(movieActions.allGenres());
    }, []);

    const currentMovieGenres: IGenre[] = [];

    genres.filter(genre => {
        movie.genre_ids.map(currentMovie => genre.id === currentMovie ? currentMovieGenres.push(genre) : null)
    })

    //Запит на додаткову інформації про фільм, яка вже буде підгружатись

    // useEffect(() => {
    //     dispatch(movieActions.allMovieDetails({id: movie.id.toString()}))
    // }, []);

    // console.log(movie,movieDetail)

    return (
        <div className={css.movieInfoWrapper}>
            <div className={css.movieHeader} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}}>
                <div>
                    <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt=""/>
                </div>
                <div className={css.movieInfo}>
                    <h2>{movie.title}</h2>
                    <div className={css.genreBar}>
                        {movie.release_date}・
                        {currentMovieGenres.map((movieGenre )=> {
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
                            <Box
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                            >
                                <Typography component="legend"></Typography>
                                <Rating name="customized-10" readOnly defaultValue={movie.vote_average} max={10} />
                            </Box>
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