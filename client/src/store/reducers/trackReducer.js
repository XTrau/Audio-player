const initialState = {
  id: -1,
  title:
    'Loading...',
  authors:
    'Loading...',
  image:
    '',
  audio:
    '',
  paused:
    true,
}

export const currentTrackReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TRACK':
      return {
        ...action.payload,
        paused: state.paused
      }
    case 'PLAY_TRACK':
      return {
        ...state,
        paused: false
      }
    case 'PAUSE_TRACK':
      return {
        ...state,
        paused: true
      }

    default:
      return state
  }
}
