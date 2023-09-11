import React from 'react';

import {Pagination, Stack} from "@mui/material";
import css from './appPagination.module.css';
import {useSearchParams} from "react-router-dom";

const AppPagination = () => {
    const [query,setQuery] = useSearchParams();

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
       setQuery(prev => ({...prev, page: value}))
    };

    return (
        <div className={css.appPaginationWrapper}>
            <div>
                <Stack spacing={2}>
                    <Pagination count={500} variant="outlined" shape="rounded" color={"standard"} onChange={handlePagination} page={+query.get('page')}/>
                </Stack>
            </div>
        </div>
    );
};

export {
    AppPagination,
};