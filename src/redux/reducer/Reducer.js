import { SET_SEARCH_MOVIE_LIST } from "../action-types";

const initialState = {
    searchMovieList: []
}

export const reducer = (state = initialState, action)=>{
    switch (action.type){
        case SET_SEARCH_MOVIE_LIST:{
            return {...state, searchMovieList: action.payload};
        }
        default:{
            return state;
        }
    }
}
