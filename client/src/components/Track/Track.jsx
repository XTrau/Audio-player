import React, {useState} from 'react'
import './Track.scss'
import {useDispatch, useSelector} from "react-redux";
import ArtistList from "../ArtistsList/ArtistList";
import environment from "../../environment";
import {playTrack, pauseTrack} from "../../store/slices/currentTrackSlice";
import {Link} from 'react-router-dom'

function Track({
                 track, index, selectTrack, currentList, addToFavorite, removeFromFavorite, liked
               }) {
  const currentTrack = useSelector(store => store.currentTrack.track)
  const paused = useSelector(store => store.currentTrack.paused)
  const playNow = track.id === currentTrack.id && !paused
  const dispatch = useDispatch()
  const [onSettings, setOnSettings] = useState(false)
  const [settingPosition, setSettingPosition] = useState({x: 0, y: 0})

  function onClickPlay() {
    selectTrack(index, currentList)
    dispatch(playTrack())
  }

  function onClickPause() {
    dispatch(pauseTrack())
  }

  return (<>
    <li className={(playNow ? 'play' : '') + ' track-wrapper shadow'}>
      <button
        className='play-btn hide-text'
        onClick={playNow ? onClickPause : onClickPlay}
      >
        <span className={playNow ? 'pause-img' : 'play-img'}>play</span>
      </button>
      <img src={`${environment.API_URL}/${track.image_url}`} alt='preview' height={50}/>
      <div className='track-info'>
        <div className='title'>
          <span>{track.name}</span>
          {track.artists && <ArtistList artists={track.artists}/>}
        </div>
      </div>
      <button className='like-btn hide-text'
              onClick={liked ? () => removeFromFavorite(track) : () => addToFavorite(track)}>
        {liked ? 'like' : 'unlike'}
        <svg
          width='32'
          height='32'
          viewBox='-6 -6 36 36'
          fill={liked ? 'red' : 'none'}
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z'
            stroke={liked ? 'red' : '#d2d2d2'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <button className='three-dot-btn' onClick={(e) => {
        setOnSettings(prev => !prev)
        setSettingPosition(prev => {
          return {
            x: e.pageX + 10,
            y: e.pageY + 10
          }
        })
      }}>
        <div className='three-dot hide-text'>settings</div>
      </button>
    </li>

    <div className={`position-absolute ${onSettings ? 'd-flex' : 'hidden'} bg-white rounded-2 px-2 flex-column`}
         style={{left: `${settingPosition.x}px`, top: `${settingPosition.y}px`}}>
      <Link to={`track/${track.id}/edit`}>Edit</Link>
    </div>
  </>)
}

export default Track
