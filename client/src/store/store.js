import { createStore } from 'redux'

const initialState = {
  currentTrack: {
    title: 'Stan',
    authors: 'Eminem',
    img: '/artists/Eminem/audio/Stan/Stan.jpg',
    audio: '/artists/Eminem/audio/Stan/Stan.mp3',
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PAUSE':
      state = {
        ...state,
        paused: true,
      }
      break
    case 'PLAY':
      state = {
        ...state,
        paused: false,
      }
      break
    case 'CHANGE_TRACK':
      state = {
        ...state,
        currentTrack: action.payload,
      }
      break
    default:
      return {
        ...state
      }
  }
}

export const store = createStore(reducer)
