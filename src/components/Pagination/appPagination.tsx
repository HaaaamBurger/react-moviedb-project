import React from 'react';

import css from './appPagination.module.css';

import {Pagination, Stack} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../hooks";

const AppPagination = () => {
    const {movies} = useAppSelector(state => state.movieReducer)
    const [query,setQuery] = useSearchParams();

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
       setQuery(prev => ({...prev, page: value}));
    };

    return (
        <div className={css.appPaginationWrapper}>
            <div>
                <Stack spacing={2}>
                    <Pagination className={css.Pagionation} count={+movies?.total_pages > 500 ? 500 : +movies?.total_pages} variant="outlined" shape="rounded" color={"standard"} onChange={handlePagination} page={+query.get('page')} />
                </Stack>
            </div>
        </div>
    );
};

export {
    AppPagination,
};