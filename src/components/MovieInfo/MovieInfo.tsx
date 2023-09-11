import React from 'react';
import {useAppLocation} from "../../hooks";
import {IMovie} from "../../interfaces/movieInterface";

const MovieInfo = () => {
    const {state} = useAppLocation<IMovie>();

    console.log(state)
    return (
        <div>
            MovieInfo
        </div>
    );
};

export {
    MovieInfo,
};