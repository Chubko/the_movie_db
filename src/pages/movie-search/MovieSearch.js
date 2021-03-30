import React from 'react';
import {useHistory} from "react-router-dom";
import {FilmList} from "../../components";
import {useSelector} from "react-redux";

export const MovieSearch = () => {
    const searchMovieList = useSelector(({searchMovieList}) => searchMovieList);
    const history = useHistory();

    const onFilmClick = (film) => history.push(`/movie/${film.id}`);

    return (
        <div>
            <FilmList
                onFilmClick={onFilmClick}
                items={searchMovieList}
            />
        </div>
    );
}
