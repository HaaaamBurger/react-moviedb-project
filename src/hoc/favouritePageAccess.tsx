import React, {FC, PropsWithChildren, ReactNode} from 'react';

import {useAppDispatch, useAppSelector} from "../hooks";
import {useNavigate} from "react-router-dom";
import {favouriteActions} from "../redux";
import {IMovieDetails} from "../interfaces";

interface IState extends PropsWithChildren {
    children: ReactNode
}

const FavouritePageAccess: FC<IState> = ({children}) => {
    const dispatch = useAppDispatch();
    const {favouriteError} = useAppSelector(state => state.favouriteReducer);
    const navigate = useNavigate();

    const getFavMovies: IMovieDetails[] = JSON.parse(localStorage.getItem('favourites')) || [];

    if (!getFavMovies.length) {
        dispatch(favouriteActions.setFavouriteError(true))
        navigate('/movies');
    }

    return (
        <div>
            {
               children
            }
        </div>
    );
};

export {
    FavouritePageAccess,
};