import React, {FC, PropsWithChildren} from 'react';
import {IMovie} from "../../interfaces/movieInterface";
import {ImageList, ImageListItem} from "@mui/material";


interface IProps extends PropsWithChildren {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {
    console.log(movie)

    return (
        <div>
            {/*<ImageList sx={{width: 500, height: 450}} cols={3} rowHeight={164}>*/}
            {/*    <ImageListItem key={item.img}>*/}
            {/*        <img*/}
            {/*            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}*/}
            {/*            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}*/}
            {/*            alt={item.title}*/}
            {/*            loading="lazy"*/}
            {/*        />*/}
            {/*    </ImageListItem>*/}
            {/*</ImageList>*/}
        </div>
    );
};

export {
    Movie,
};