
import { FETCHING_MOVIE, FETCHING_MOVIE_FAILURE, FETCHING_MOVIE_SUCCESS } from '../actions/movieActions'

const initialState = {
  movies: [],
  moviesFetched: false,
  isFetching: false,
  error: null,
}

export default function movieReducer(state = initialState, action: any) {
  switch (action.type) {
    case FETCHING_MOVIE:
      return {
        ...state,
        movies: [],
        isFetching: true,
      }
    case FETCHING_MOVIE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        moviesFetched: true,
        movies: action.movies,
      }
    case FETCHING_MOVIE_FAILURE:
      return {
        ...state,
        isFetching: false,
        moviesFetched: false,
        error: action.error,
      }
    default:
      return state
  }
}
