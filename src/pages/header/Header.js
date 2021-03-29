import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import {FilmSearchList} from "../../components";
import {genresService, moviesService} from "../../services";
import {mergeMoviesWithGenres} from "../../utils";


export const Header = () => {
    const history = useHistory();
    const [genresList, setGenresList] = useState([]);
    const [moviesData, setMoviesData] = useState(null);

    const fetchMovies = async (params) => {
        try {
            return await moviesService.searchMovie(params);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchGenres = async () => {
        try {
            const { genres } = await genresService.getGenres();

            return genres;
        } catch (e) {
            console.error(e);
        }
    }

    const search = async (e) => {
        const request = [ fetchMovies({ query: e.target[0].value}), fetchGenres() ];

        try{
            e.preventDefault();

            if (!e.target[0].value) {
                history.push('/');
                setMoviesData(null);
            }

            const [{ results, ...rest }, genres ] = await Promise.all(request);
            setMoviesData({ movies: mergeMoviesWithGenres(results, genres), ...rest });
            setGenresList(genres);
            history.push('/search/movie');
            e.target[0].value = '';
        } catch (e) {
            console.error(e);
        }
    }

    const onFilmClick = (film) => history.push(`/movie/${film.id}`);

    const onHomeClick = () => setMoviesData(null);

    return (
        <div>
            <Link to='/' onClick={onHomeClick}>
                home
            </Link>
            <form  onSubmit={search}>
                <input type="text" placeholder="Search.." name="search"/>
                <button type="submit">Submit</button>
            </form>

            {moviesData && <FilmSearchList
                    onFilmClick={onFilmClick}
                    items={moviesData.movies}
                />
            }
        </div>
    );
}
