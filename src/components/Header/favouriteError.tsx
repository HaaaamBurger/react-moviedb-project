import React, {useEffect, useState} from 'react';
import {Alert, Box, Grow, Stack} from "@mui/material";
import {favouriteActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

const icon = (
    <Stack sx={{width: '100%'}} spacing={2}>
        <Alert variant="outlined" severity="warning" style={{color: 'white'}}>
            No favourite movie!
        </Alert>
    </Stack>
);
const FavouriteError = () => {

    const dispatch = useAppDispatch();

    const [favouriteState, setFavouriteState] = useState<boolean>(false);
    const {favouriteError} = useAppSelector(state => state.favouriteReducer)

    useEffect(() => {
        if (favouriteError) {
            setFavouriteState(true)
            setTimeout(() => {
                setFavouriteState(false);
            }, 2000)
            dispatch(favouriteActions.setFavouriteError(false));
        }
    }, [favouriteError]);

    return (
        <Box sx={{display: 'flex'}}>
            <Grow in={favouriteState}>{icon}</Grow>
        </Box>
    );
};

export {
    FavouriteError,
};