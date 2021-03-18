import React from "react";
import styles from './FilmItem.module.css';

const imgBuilder = (posterPath, width = 200) => `https://image.tmdb.org/t/p/w${width}${posterPath}`
export const FilmItem = (props) => {
    const { original_title, overview, poster_path, release_date, vote_average, vote_count } = props;
    return (
        <div className={styles.filmItem}>
            <div>
                <img src={imgBuilder(poster_path)} alt={`${original_title} poster`}/>
            </div>
            <div>
                <h2>{original_title}</h2>
                <span>Rating: {vote_average} (total votes: {vote_count})</span>
                <p>{overview}</p>
                <span>Release date: {release_date}</span>
            </div>
        </div>
    );
}

// adult: false
// backdrop_path: "/gzJnMEMkHowkUndn9gCr8ghQPzN.jpg"
// genre_ids: (3) [53, 28, 18]
// id: 793723
// original_language: "fr"
// original_title: "Sentinelle"
// overview: "Transferred home after a traumatizing combat mission, a highly trained French soldier uses her lethal skills to hunt down the man who hurt her sister."
// popularity: 2336.237
// poster_path: "/fFRq98cW9lTo6di2o4lK1qUAWaN.jpg"
// release_date: "2021-03-05"
// title: "Sentinelle"
// video: false
// vote_average: 6.2
// vote_count: 202
