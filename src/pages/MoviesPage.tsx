import {Movies} from "../components";
import {AppPagination} from "../components/Pagination";

const MoviesPage = () => {
    return (
        <div>
            <Movies/>
            <AppPagination/>
        </div>
    );
};

export {
    MoviesPage,
};