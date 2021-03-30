import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";

import {SET_SEARCH_MOVIE_LIST} from '../../redux'
import {genresService, moviesService} from "../../services";
import {mergeMoviesWithGenres} from "../../utils";
import styles from './Header.module.css'


export const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const fetchMovies = async (params) => {
        try {
            return await moviesService.searchMovie(params);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchGenres = async () => {
        try {
            const {genres} = await genresService.getGenres();

            return genres;
        } catch (e) {
            console.error(e);
        }
    }

    const search = async (e) => {
        const request = [fetchMovies({query: e.target[0].value}), fetchGenres()];

        try {
            e.preventDefault();

            if (!e.target[0].value) {
                history.push('/');
            }

            const [{results, ...rest}, genres] = await Promise.all(request);

            history.push('/search/movie');
            e.target[0].value = '';

            dispatch({type: SET_SEARCH_MOVIE_LIST, payload: mergeMoviesWithGenres(results, genres)});
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div className={styles.title}>The Movie DataBase</div>
            <Link to='/'>
                home
            </Link>
            <form onSubmit={search}>
                <input type="text" placeholder="Search.." name="search"/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
