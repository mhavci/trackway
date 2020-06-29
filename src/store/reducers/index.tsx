import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import movieReducer from './movieReducer'


const allReducers= combineReducers({
  movie: movieReducer
})


export default function configureStore(){
  return createStore(
    allReducers,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
