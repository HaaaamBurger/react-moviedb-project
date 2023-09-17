import React, {useEffect, useState} from 'react';
import {NoFavourites} from "./noFavourites";

const Favourites = () => {
    const [favMovies, setFavMovies] = useState([]);

    useEffect(() => {
        const getFavMovies = JSON.parse(localStorage.getItem('favourites'));
        if (getFavMovies) {
            setFavMovies(getFavMovies);
        }
    }, []);

    return (
        <div>
            {
                favMovies.length ?
                    <div className={css.favouritesWrapper}>
                        {favMovies.map((movie, index) => <FavMovie movie={movie} key={index}/>)}
                        <button className={styles.clearButton} onClick={() => {
                            localStorage.removeItem('favourites');
                            setFavMovies([]);
                        }}>Clear
                        </button>
                    </div> :
                    <NoFavourites/>
            }
        </div>
    );
}
export {
    Favourites,
};