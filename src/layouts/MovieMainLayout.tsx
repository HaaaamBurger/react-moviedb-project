import React from 'react';

import css from './mainLayout.module.css';

import {Header} from "../components";
import {Outlet} from "react-router-dom";
import {useAppSelector} from "../hooks";

const MovieMainLayout = () => {
    const {status} = useAppSelector(state => state.themeReducer);
    const body = document.getElementsByTagName('body')[0];

    if (!status) {
        body.classList.add(css.themeSwitcher);
    }
    else {
        body.classList.remove(css.themeSwitcher);
    }

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