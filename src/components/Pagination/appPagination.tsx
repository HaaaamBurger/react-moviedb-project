import React, {useState} from 'react';

import {Pagination, Stack} from "@mui/material";
import css from './appPagination.module.css';
const AppPagination = () => {
    const [pageCount, setPageCount] = useState(1)


    return (
        <div className={css.appPaginationWrapper}>
            <div>
                <Stack spacing={2}>
                    <Pagination count={500} variant="outlined" shape="rounded" color={"standard"} page={pageCount}/>
                </Stack>
            </div>
        </div>
    );
};

export {
    AppPagination,
};