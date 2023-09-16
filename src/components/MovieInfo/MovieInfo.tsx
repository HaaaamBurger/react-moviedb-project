import React, {useEffect, useState} from 'react';

import css from './movieInfo.module.css';
import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";

import {movieActions} from "../../redux";

import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import StarIcon from '@mui/icons-material/Star';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Divider,
    Grid,
    Rating, Stack,
    Typography
} from "@mui/material";
import {IGenre, IMovie} from "../../interfaces";
import {movieServices} from "../../services/movieServices";

const MovieInfo = () => {
    const dispatch = useAppDispatch();
    const {genres, movieDetail, actors} = useAppSelector(state => state.movieReducer)
    const {state: movie} = useAppLocation<IMovie>();
    const [actorsInfo, setActorsInfo] = useState<number>(3)

    useEffect(() => {
        dispatch(movieActions.allGenres());
    }, []);

    const currentMovieGenres: IGenre[] = [];

    genres.filter(genre => {
        movie.genre_ids.map(currentMovie => genre.id === currentMovie ? currentMovieGenres.push(genre) : null)
    })

    console.log(movieDetail)

    useEffect(() => {
        dispatch(movieActions.allMovieDetails({id: movie.id.toString()}))
        dispatch(movieActions.allActors({id: movie.id.toString()}));
    }, []);

    return (
        <div>
            <div className={css.movieInfoWrapper}>
                <div className={css.movieHeader}
                     style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}}>
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt=""/>
                    </div>
                    <div className={css.movieInfo}>
                        <h2>{movie.title}</h2>
                        <div className={css.genreBar}>
                            {movie.release_date}・
                            {currentMovieGenres.map((movieGenre) => {
                                    return <a key={movieGenre.id}>
                                        {currentMovieGenres[currentMovieGenres.length - 1].id === movieGenre.id ? movieGenre.name : `${movieGenre.name},`}
                                    </a>
                                }
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
                                        '& > legend': {mt: 2},
                                    }}
                                >
                                    <Typography component="legend"></Typography>
                                    <Rating name="customized-10" readOnly defaultValue={movie.vote_average} max={10}/>
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
            <div className={css.additionalInfoWrapper}>
                <div style={{display: 'flex', overflow: 'hidden' ,flexWrap: 'wrap', justifyContent: 'center'}}>
                    {actors?.cast.map((actor, index) => (
                        index <= actorsInfo ?
                            <div style={{width: '20%', margin: '5px'}} key={index}>

                                <Card sx={{maxWidth: 200}} style={{backgroundColor: '#efeaea'}}>
                                    <CardMedia
                                        sx={{height: 240}}
                                        image={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                                        title="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {actor.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div> : null
                    ))}
                </div>
                <div style={{padding: '10px', overflow: 'hidden', marginTop: '50px'}}>
                    <Box
                        sx={{width: '100%', bgcolor: '#333333', color: 'white', borderRadius: '10px', padding: '10px', boxSizing: 'border-box', boxShadow: '0px 1px 2px 0px rgba(110,110,110,1)'}}>
                        <Box sx={{my: 3, mx: 2}}>
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography gutterBottom variant="h4" component="div">
                                        {movieDetail?.title}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {movieDetail?.status}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography color="white" variant="body2">
                                Runtime: {`${Math.floor(movieDetail?.runtime / 60)}hr ${movieDetail?.runtime % 60}min`}
                            </Typography>
                        </Box>
                        <Divider variant="middle" color='white'/>
                        <Box sx={{m: 2}}>
                            <Typography gutterBottom variant="body1">
                                Genres
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                {movieDetail?.genres.map((genre, index) => (
                                    <Chip label={genre.name} key={index} color={'warning'}/>
                                ))}
                            </Stack>
                        </Box>
                        <Divider variant="middle" color='white'/>
                        <Box sx={{m: 2}}>
                            <Typography gutterBottom variant="body1">
                               Something
                            </Typography>
                            <Stack direction="row" spacing={1}>

                            </Stack>
                        </Box>
                        <Divider variant="middle" color='white'/>
                        <Box sx={{m: 2}}>
                            <Typography gutterBottom variant="body1">
                                Something
                            </Typography>
                            <Stack direction="row" spacing={1}>

                            </Stack>
                        </Box>
                    </Box>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export {
    MovieInfo,
};