import { createSlice } from '@reduxjs/toolkit';
import movies from '../data/movies';

const initialState = {
    movies,
    currentPage: 1,
    perPage: 4,
    searchQuery: ''
}

    const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setPage: (state, action) => {
        state.currentPage = action.payload;
        },
        addComment: (state, action) => {
    const { movieId, comment } = action.payload;
    const movie = state.movies.find((m) => m.id === movieId);
    if (movie) movie.comments.push(comment);
    },
    setSearchQuery: (state, action) => {
    state.searchQuery = action.payload;
    state.currentPage = 1;
    },
},
});

export const { setPage, addComment, setSearchQuery } = movieSlice.actions;
export default movieSlice.reducer;
