import {createBrowserRouter, Navigate} from 'react-router-dom';
import {MovieMainLayout} from "../layouts";
import {ErrorPage, FavouritesPage, GenresPage, MovieInfoPage, MoviesPage} from "../pages";
import {FavouritePageAccess} from "../hoc";

const router = createBrowserRouter([
    {
        path: '',
        element: <MovieMainLayout/>,
        children: [
            {
                index: true,
                element: <Navigate to={'movies'}/>,
                errorElement: <ErrorPage/>
            },
            {
                path: 'movies',
                element: <MoviesPage/>
            },
            {
                path: 'genres',
                element: <GenresPage/>
            },
            {
                path: 'movie/:id',
                element: <MovieInfoPage/>
            },
            {
                path: 'favourites',
                // element: <FavouritesPage/>
                element: <FavouritePageAccess><FavouritesPage/></FavouritePageAccess>
            }
        ]
    }
])

export {
    router
}