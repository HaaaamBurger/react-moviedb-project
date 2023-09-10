import React from 'react';

import {Header} from "../components";
import {Outlet} from "react-router-dom";
import css from './mainLayout.module.css';

const MovieMainLayout = () => {
    return (
        <div className={css.mainLayoutWrapper}>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {
    MovieMainLayout,
};