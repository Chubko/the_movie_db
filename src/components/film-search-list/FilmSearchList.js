import React from "react";
import { FilmItem } from '../film-item';

export const FilmSearchList = ({ items, onFilmClick }) => {
    return (
        <div>
            {items.map(item =>
                <div onClick={() => onFilmClick(item)}>
                    <FilmItem key={item.id} {...item}/>
                </div>
            )}
        </div>
    );
}
