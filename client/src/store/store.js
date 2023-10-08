import {combineReducers, createStore} from "redux";
import {currentTrackReducer} from './reducers/trackReducer'

const rootReducer = combineReducers({
  currentTrack: currentTrackReducer,
})

const store = createStore(rootReducer)

export default store