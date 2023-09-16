import React, {useEffect} from 'react';

import css from './movieByGenre.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions, movieActions} from "../../redux";
import {Box, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const MovieByGenre = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {genreMovies} = useAppSelector(state => state.genreReducer)
    const {genres,movieForSearch} = useAppSelector(state => state.movieReducer)

    useEffect(() => {
        dispatch(movieActions.allGenres());
    }, []);

    const genreHandler = (id: string) => {
        dispatch(genreActions.setGenreId(id))
        navigate('/movies?page=1');
    }

    const error = () => {
        console.log('error');
    }
    return (
        <div className={css.movieByGenreWrapper}>
            {genres.map((genre, index) =>
                <div key={index} className={css.movieGenreBox}>
                    <Box sx={{minWidth: 275}}>
                        <Card variant="outlined">{
                            <React.Fragment>

                                <CardContent style={{backgroundColor: '#cbcbcb'}}>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Genre:
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {genre.name}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{backgroundColor: '#1e1d1d', color: 'white'}}>
                                    <Button size="small" color={'inherit'}
                                            onClick={!movieForSearch ?() => genreHandler(genre.id.toString()) : error}>Open</Button>
                                </CardActions>
                            </React.Fragment>
                        }</Card>
                    </Box>
                </div>
            )}
        </div>
    );
};

export {
    MovieByGenre,
};