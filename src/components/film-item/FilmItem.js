import React from "react";
import styles from './FilmItem.module.css';

const imgBuilder = (posterPath, width = 200) => `https://image.tmdb.org/t/p/w${width}${posterPath}`
export const FilmItem = (props) => {
    const {movieGenresList, original_title, overview, poster_path, release_date, vote_average, vote_count} = props;
    return (
        <div className={styles.filmItem}>
            <div>
                <img src={imgBuilder(poster_path)} alt={`${original_title} poster`}/>
            </div>
            <div>
                <h2>{original_title}</h2>
                <h3>
                    {movieGenresList.map(({name, id}, i) => (
                        <span key={id}> {name} {i < movieGenresList.length - 1 && '-'} </span>
                    ))}
                </h3>
                <span>Rating: {vote_average} (total votes: {vote_count})</span>
                <p>{overview}</p>
                <span>Release date: {release_date}</span>
            </div>
        </div>
    );
}


