import React, { useMemo, useRef, useState } from 'react'
import './Track.scss'
import { useSelector } from 'react-redux'

function Track({ track, currentTrack, paused, selectTrack, playTrack, pauseTrack }) {
  const [trackDuration, setTrackDuration] = useState('00:00')
  const audio = useRef()

  const playNow = useMemo(
    () => track.title === currentTrack.title && paused === false,
    [track.title, currentTrack.title, paused]
  )

  function onClickPlay() {
    selectTrack(track)
    setTimeout(() => playTrack(), 0)
  }

  function onClickPause() {
    pauseTrack()
  }

  const strPadLeft = (string, pad) => {
    return (new Array(3).join(pad) + string).slice(-2)
  }

  const getTrackDuration = () => {
    const minutes = Math.floor(audio.current.duration / 60)
    const seconds = Math.floor(audio.current.duration - minutes * 60)
    const currentTime =
      strPadLeft(minutes, '0') + ':' + strPadLeft(seconds, '0')
    setTrackDuration(currentTime)
  }

  return (
    <li className={playNow ? 'play' : ''}>
      <audio
        src={track.audio}
        ref={audio}
        onLoadedMetadata={getTrackDuration}
      ></audio>
      <button
        className='play-btn'
        onClick={playNow ? onClickPause : onClickPlay}
      >
        <span className={playNow ? 'pause-img' : 'play-img'}></span>
      </button>
      <img src={`${track.image}`} alt='preview' width={50} />
      <div className='track-info'>
        <div className='title'>
          <span>{track.title}</span>
          <b>{track.authors}</b>
        </div>
        <div className='duration'>
          <b>{trackDuration}</b>
        </div>
      </div>
      <button className='like-btn' onClick={() => console.log(currentTrack)}>
        <svg
          width='32'
          height='32'
          viewBox='-6 -6 36 36'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z'
            stroke='#d2d2d2'
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
