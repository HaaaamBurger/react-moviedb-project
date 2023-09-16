import React, {useEffect, useState} from 'react';
import {Alert, Box, Grow, Stack} from "@mui/material";
import {useAppSelector} from "../../hooks";




const icon = (
    <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert variant="outlined" severity="error">
            Somehting went wrong!
        </Alert>
    </Stack>
);
const ErrorField = () => {
    const [pageError, setPageError] = useState<boolean>(false);
    const {errRespond} = useAppSelector(state => state.movieReducer)

    useEffect(() => {
        if (errRespond?.errors) {
            setPageError(true)
            setTimeout(() => {
                setPageError(false);
            }, 2000)
        }
    }, [errRespond]);


    return (
        <Box sx={{display: 'flex'}}>
            <Grow in={pageError}>{icon}</Grow>
        </Box>
    );
};

export {
    ErrorField,
};