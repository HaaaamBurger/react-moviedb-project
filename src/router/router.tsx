import {createBrowserRouter, Navigate} from 'react-router-dom';
import {MovieMainLayout} from "../layouts";
import {ErrorPage, GenresPage, MovieInfoPage, MoviesPage} from "../pages";

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
            }

        ]
    }
])

export {
    router
}