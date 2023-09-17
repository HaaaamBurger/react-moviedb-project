import React, {useEffect, useState} from 'react';

import css from './movieInfo.module.css';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import StarIcon from '@mui/icons-material/Star';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {genreActions, movieActions} from "../../redux";
import {Box, Button, Card, CardContent, CardMedia, Chip, Divider, Grid, Rating, Stack, Typography} from "@mui/material";
import {IGenre, IMovie} from "../../interfaces";
import {useNavigate} from "react-router-dom";

const MovieInfo = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {genres, movieDetail, actors, movieForSearch} = useAppSelector(state => state.movieReducer)
    const {state: movie} = useAppLocation<IMovie>();
    const [actorsInfo, setActorsInfo] = useState<number>(3);
    const [movieForFavourite, setMovieForFavourite] = useState<IMovie>(null);

    useEffect(() => {
        dispatch(movieActions.allGenres());
        dispatch(movieActions.allMovieDetails({id: movie.id.toString()}))
        dispatch(movieActions.allActors({id: movie.id.toString()}));
    }, []);

    useEffect(() => {
        favourites.map(favMovie => favMovie.id === movie.id ? setMovieForFavourite(favMovie) : null);

    }, []);

    const favourites: IMovie[] = JSON.parse(localStorage.getItem('favourites')) || [];
    const currentMovieGenres: IGenre[] = [];

    genres.filter(genre => {
        movie.genre_ids.map(currentMovie => genre.id === currentMovie ? currentMovieGenres.push(genre) : null)
    })

    const genreHandler = (id: string) => {
        dispatch(genreActions.setGenreId(id))
        navigate('/movies?page=1');
    }

    const error = () => {
        dispatch(genreActions.setFilterError(true));
    }

    const addToFav = (movieData: IMovie): void => {
        favourites.push(movieData);
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }

    const removeFromFav = () => {
        const newFavourites = favourites.filter(favMovie => favMovie.id !== movie.id);
        localStorage.setItem('favourites', JSON.stringify(newFavourites))
    }

    return (
        <div>
            <div className={css.movieInfoWrapper}>
                <div className={css.movieHeader}
                     style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}}>
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt=""/>
                    </div>
                    <div className={css.movieInfo}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h2>{movie.title}</h2>

                            {
                                !movieForFavourite ?
                                    <BookmarkBorderIcon style={{fontSize: '34px'}} onClick={() => addToFav(movie)}/> :
                                        <BookmarkIcon style={{fontSize: '34px'}} onClick={() => removeFromFav()}/>
                            }
                        </div>
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
                <div>
                    <div style={{display: 'flex', overflow: 'hidden', flexWrap: 'wrap', justifyContent: 'center'}}>
                        {actors?.cast.map((actor, index) => (
                            index <= actorsInfo ?
                                <div style={{width: '20%', margin: '15px 5px'}} key={index}>
                                    {!actor.profile_path ?
                                        <Card sx={{maxWidth: 200}} style={{backgroundColor: '#efeaea'}}>
                                            <div
                                                style={{
                                                    height: '240px',
                                                    backgroundColor: '#696868',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                <ImageNotSupportedOutlinedIcon fontSize={"large"}/>
                                            </div>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {actor.name}
                                                </Typography>
                                            </CardContent>
                                        </Card> :
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
                                    }
                                </div> : null
                        ))}
                    </div>
                    {actors?.cast?.length > 3 ?
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined" color="warning"
                                        onClick={actorsInfo === 3 ? () => setActorsInfo(actors.cast.length) : () => setActorsInfo(3)}>
                                    {
                                        actorsInfo === 3 ?
                                            'SHOW MORE' :
                                            'SHOW LESS'
                                    }
                                </Button>
                            </Stack>
                        </div> : null
                    }
                </div>
                <div style={{padding: '10px', overflow: 'hidden', marginTop: '30px'}}>
                    <Box
                        sx={{
                            width: '100%',
                            bgcolor: '#333333',
                            color: 'white',
                            borderRadius: '10px',
                            padding: '10px',
                            boxSizing: 'border-box',
                            boxShadow: '0px 1px 2px 0px rgba(110,110,110,1)'
                        }}>
                        <Box sx={{my: 3, mx: 2}}>
                            <Grid container alignItems="center">
                                <Grid item xs>
                                    <Typography gutterBottom variant="h4" component="div">
                                        {movieDetail?.title || '-'}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {movieDetail?.status || '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography color="white" variant="body2">
                                Runtime: {`${Math.floor(movieDetail?.runtime / 60)}hr ${movieDetail?.runtime % 60}min` || '-'}
                            </Typography>
                        </Box>
                        <Divider variant="middle" color='white'/>
                        <Box sx={{m: 2}}>
                            <Typography gutterBottom variant="body1">
                                Genres
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                {movieDetail?.genres.map((genre, index) => (
                                    <Chip label={genre.name} key={index} color={'warning'}
                                          onClick={!movieForSearch ? () => genreHandler(genre.id.toString()) : error}/>
                                ))}
                            </Stack>
                        </Box>
                        <Divider variant="middle" color='white'/>
                        <Box sx={{m: 2}}>
                            <Typography gutterBottom variant="body1"
                                        style={{display: 'flex', justifyContent: 'space-between'}}>
                                <a>
                                    Budget
                                </a>
                                <a>
                                    Spoken Languages
                                </a>
                            </Typography>
                            <Stack direction="row" spacing={1}
                                   style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                <a>
                                    {movieDetail?.budget ?
                                        `${movieDetail?.budget} $` :
                                        '-'
                                    }
                                </a>
                                <div>

                                    {movieDetail?.spoken_languages.map((lang, index) => (
                                        <a key={index}
                                           style={{
                                               backgroundColor: '#212121',
                                               padding: '2px 5px 2px 5px',
                                               borderRadius: '5px',
                                               margin: '0 3px'
                                           }}>
                                            {lang?.name || '-'}
                                        </a>
                                    ))}
                                </div>
                            </Stack>
                        </Box>
                        <Divider variant="middle" color='white'/>
                        <Box sx={{m: 2}}>
                            <Typography gutterBottom variant="body1">
                                Production Companies
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                {movieDetail?.production_companies.map((company, index) => (
                                    <a key={index}
                                       style={{
                                           backgroundColor: '#212121',
                                           padding: '5px 7px 5px 7px',
                                           borderRadius: '5px'
                                       }}>{company.name || '-'}</a>
                                ))}
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