import React, {useEffect, useState} from 'react';

import css from './header.module.css';
import UndoIcon from '@mui/icons-material/Undo';

import {NavLink, useNavigate} from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Chip,
    FormControlLabel,
    FormGroup,
    Stack,
    styled,
    Switch
} from "@mui/material";
import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {genreActions, movieActions, themeActions} from "../../redux";
import {SearchField} from "./searchField";
import {ErrorField} from "./errorField";
import {UsedFilter} from "./usedFilter";

const MaterialUISwitch = styled(Switch)(({theme}) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#3a3a3a' : '#7c7c7c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useAppLocation();

    // const {status} = useAppSelector(state => state.themeReducer);
    const {movieForSearch, genres,errRespond} = useAppSelector(state => state.movieReducer);
    const {genreId,filterError} = useAppSelector(state => state.genreReducer);
    const [genreName, setGenreName] = useState<string>(null)

    useEffect(() => {
        if (genreId) {
            dispatch(movieActions.allGenres());
            const {name} = genres.find(genre => genre.id === +genreId);
            setGenreName(name);
        }
    }, [genreId]);

    const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(themeActions.setThemeStatus(event.target.checked))
    };

    const handleDeleteId = () => {
        dispatch(genreActions.setGenreId(null))
        navigate('/movies?page=1');
    }

    const handleDeleteSearch = () => {
        dispatch(movieActions.setMovieForSearch(null));
        navigate('/movies?page=1');
    };

    return (
        <div className={css.headerWrapper}>
            <div className={css.header}>
                <div style={{display: 'flex'}}>
                    <NavLink to={'movies?page=1'} style={{textDecoration: 'none'}}>Movie DB</NavLink>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <SearchField/>
                        {
                            movieForSearch ?
                                <Stack direction="row" spacing={1}>
                                    <Chip label={movieForSearch} variant="outlined" color={'default'}
                                          onDelete={handleDeleteSearch} style={{color: 'white', fontSize: '17px'}}/>
                                </Stack> :
                                genreId ?
                                    <Stack direction="row" spacing={1}>
                                        <Chip label={genreName} variant="outlined" color={'default'}
                                              onDelete={handleDeleteId}
                                              style={{color: 'white', fontSize: '17px'}}/>
                                    </Stack> : null
                        }
                        {
                            location.pathname !== '/movies' ?
                                <Box sx={{'& button': {m: 1}}} style={{marginLeft: '15px'}}>
                                    <Button variant="contained" style={{backgroundColor: '#938f8f'}} size="medium"
                                            onClick={() => navigate(-1)}>
                                        <UndoIcon/>
                                    </Button>
                                </Box> : null
                        }
                    </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div className={css.header_nav}>
                        <div className={css.errorPos}>
                            <div style={{position: 'fixed'}}>
                                <ErrorField/>
                            </div>
                            <div>
                                <UsedFilter/>
                            </div>
                        </div>
                        <NavLink to={'movies?page=1'}>Movies</NavLink>
                        <NavLink to={'genres'}>Genres</NavLink>
                        <NavLink to={'favourites'}>Favourites</NavLink>
                    </div>
                    <div>
                        <FormGroup onChange={handleChangeSwitch}>
                            <FormControlLabel
                                control={<MaterialUISwitch sx={{m: 1}} defaultChecked/>}
                                label={''}/>
                        </FormGroup>
                    </div>
                    <div>
                        <Avatar>OM</Avatar>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {
    Header,
};