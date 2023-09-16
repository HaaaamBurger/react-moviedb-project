import React, {useEffect, useState} from 'react';

import {Alert, Box, Grow, Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate} from "react-router-dom";
import {movieActions} from "../../redux";

const requestIcon = (
    <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert variant="outlined" severity="error" style={{color: 'white'}}>
                Somehting went wrong!
        </Alert>
    </Stack>
);

const ErrorField = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [pageError, setPageError] = useState<boolean>(false);

    const {errRespond} = useAppSelector(state => state.movieReducer)
    const {genreError} = useAppSelector(state => state.genreReducer)

    useEffect(() => {
        if (errRespond?.errors || genreError?.errors) {
            setPageError(true)
            setTimeout(() => {
                navigate('/movies?page=1');
                setPageError(false);
            }, 2000)
            dispatch(movieActions.setError(null))
        }
    }, [errRespond]);

    return (
        <div>
            {
                <Box sx={{display: 'flex'}}>
                    <Grow in={pageError}>{requestIcon}</Grow>
                </Box>
            }
        </div>
    );
};

export {
    ErrorField,
};