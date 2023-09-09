import {createBrowserRouter, Navigate} from 'react-router-dom';
import {MovieMainLayout} from "../layouts";
import {MoviesPage} from "../pages";

const router = createBrowserRouter([
    {
        path: '',
        element: <MovieMainLayout/>,
        children: [
            {
                index: true,
                element: <Navigate to={'movies'}/>
            },
            {
                path: 'movies',
                element: <MoviesPage/>
            }
        ]
    }
])

export {
    router
}