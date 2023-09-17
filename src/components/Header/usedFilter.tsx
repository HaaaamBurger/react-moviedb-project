import React, {useEffect, useState} from 'react';
import {Alert, Box, Grow, Stack} from "@mui/material";
import {genreActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";

const icon = (
    <Stack sx={{width: '100%'}} spacing={2}>
        <Alert variant="outlined" severity="warning" style={{color: 'white'}}>
           Filter already used!
        </Alert>
    </Stack>
);

const UsedFilter = () => {
    const dispatch = useAppDispatch();

    const [usedFilter, setPageError] = useState<boolean>(false);
    const {filterError} = useAppSelector(state => state.genreReducer)
    useEffect(() => {
        if (filterError) {
            setPageError(true)
            setTimeout(() => {
                setPageError(false);
            }, 2000)
            dispatch(genreActions.setFilterError(false));
        }
    }, [filterError]);

    return (
        <Box sx={{display: 'flex'}}>
            <Grow in={usedFilter}>{icon}</Grow>
        </Box>
    );
};

export {
    UsedFilter,
};