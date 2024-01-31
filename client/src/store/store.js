import {configureStore} from '@reduxjs/toolkit'
import currentTrackReducer from "./slices/currentTrackSlice";

const store = configureStore({
  reducer: {
    currentTrack: currentTrackReducer,
  }
})

export default store;