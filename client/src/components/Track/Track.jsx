import React, {useMemo} from 'react'
import './Track.scss'
import {useSelector} from "react-redux";

function Track({
                 track,
                 selectTrack,
                 currentList,
                 playTrack,
                 pauseTrack,
                 addToFavorite,
                 removeFromFavorite,
                 liked
               }) {
  const currentTrack = useSelector(store => store.currentTrack)
  const playNow = useMemo(
    () => track.title === currentTrack.title && currentTrack.paused === false,
    [track.title, currentTrack.title, currentTrack.paused]
  )

  function onClickPlay() {
    selectTrack(track, currentList)
    setTimeout(() => playTrack(), 0)
  }

  function onClickPause() {
    pauseTrack()
  }

  return (
    <li className={playNow ? 'play' : ''}>
      <audio
        src={track.audio}
      ></audio>
      <button
        className='play-btn'
        onClick={playNow ? onClickPause : onClickPlay}
      >
        <span className={playNow ? 'pause-img' : 'play-img'}></span>
      </button>
      <img src={`${track.image}`} alt='preview' width={50}/>
      <div className='track-info'>
        <div className='title'>
          <span>{track.title}</span>
          <b>{track.authorName}</b>
        </div>
      </div>
      <button className='like-btn' onClick={liked ? () => removeFromFavorite(track) : () => addToFavorite(track)}>
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
      <button className='three-dot-btn'>
        <div className='three-dot'></div>
      </button>
    </li>
  )
}

export default Track
