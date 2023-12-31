import React, {useEffect, useMemo, useState} from 'react'
import {useSelector} from "react-redux";
import './TrackController.scss'
import ArtistList from "../ArtistsList/ArtistList";

function TrackController({
                           trackControllerProps: {
                             audioRef,
                             toPrevTrack,
                             toNextTrack,
                             playTrack,
                             pauseTrack
                           }
                         }) {
  const currentTrack = useSelector(store => store.currentTrack)
  const [trackTime, setTrackTime] = useState(0)
  const [currentTime, setCurrentTime] = useState('00:00')
  const [durationTime, setDurationTime] = useState('00:00')
  const [volume, setVolume] = useState(localStorage.getItem('volume'))

  useEffect(() => {
    audioRef.current.volume = (volume / 100).toFixed(2)
  }, [volume, audioRef])

  const artistText = useMemo(() => {
    if (!currentTrack.artists) return ''
    const text = currentTrack.artists.reduce((acc, artist) => acc + artist.name + ', ', '')
    return text.substring(0, text.length - 2)
  }, [currentTrack.artists])

  const updateTrackTime = () => {
    const percent =
      audioRef.current.currentTime / (audioRef.current.duration / 100)
    setTrackTime(prev => isNaN(percent) ? 0 : percent)
    getCurrentTime()
  }

  const onChangeTrackTime = e => {
    const percent = e.target.value
    audioRef.current.currentTime = (percent * audioRef.current.duration) / 100
    setTrackTime(percent)
  }

  const onChangeVolume = e => {
    setVolume(e.target.value)
    localStorage.setItem('volume', e.target.value)
  }

  const strPadLeft = (string, pad) => {
    return (new Array(3).join(pad) + string).slice(-2)
  }

  const getDurationTime = () => {
    const minutes = Math.floor(audioRef.current.duration / 60)
    const seconds = Math.floor(audioRef.current.duration - minutes * 60)
    const time = strPadLeft(minutes, '0') + ':' + strPadLeft(seconds, '0')
    setDurationTime(time)
  }

  const getCurrentTime = () => {
    const minutes = Math.floor(audioRef.current.currentTime / 60)
    const seconds = Math.floor(audioRef.current.currentTime - minutes * 60)
    const time = strPadLeft(minutes, '0') + ':' + strPadLeft(seconds, '0')
    setCurrentTime(time)
  }

  return (
    <nav className='track-controller'>
      <audio
        src={currentTrack.audio_url ? `http://localhost:5000/${currentTrack.audio_url}` : ''}
        onEnded={toNextTrack}
        onLoadedMetadata={getDurationTime}
        ref={audioRef}
        onTimeUpdate={updateTrackTime}
      ></audio>

      <div className='controls'>
        <button onClick={toPrevTrack} className='left-next'>
          <span></span>
        </button>
        <button
          className='play-btn'
          onClick={currentTrack.paused ? playTrack : pauseTrack}
        >
          <span className={currentTrack.paused ? 'play-img' : 'pause-img'}></span>
        </button>
        <button onClick={toNextTrack} className='right-next'>
          <span></span>
        </button>
      </div>

      <div className='track-info'>
        <img src={currentTrack.image_url ? `http://localhost:5000/${currentTrack.image_url}` : ''} alt=''
             width={70} height={70}/>
        <div className='track-description'>
          <h2>{currentTrack.name}</h2>
          <ArtistList artists={currentTrack.artists}/>
        </div>
      </div>

      <div className='audio-time-controller'>
        <input type='range' value={trackTime} onChange={onChangeTrackTime}/>
        <div className='times'>
          <b>{currentTime}</b>
          <b>{durationTime}</b>
        </div>
      </div>

      <div className='controls'>
        <input
          className='volume-range'
          type='range'
          defaultValue={volume}
          onChangeCapture={onChangeVolume}
        />
        <span className='volume-value' style={{left: `${volume - -4}px`}}>
            {volume}%
          </span>

        <button className='three-dot-btn'>
          <div className='three-dot'></div>
        </button>
      </div>
    </nav>
  );
}

export default TrackController;