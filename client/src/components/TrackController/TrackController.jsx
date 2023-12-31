import React, {useEffect, useMemo, useState} from 'react'
import {useSelector} from "react-redux";
import './TrackController.scss'
import ArtistList from "../ArtistsList/ArtistList";
import environment from "../../environment";

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
        src={currentTrack.audio_url ? `${environment.API_URL}/${currentTrack.audio_url}` : ''}
        onEnded={toNextTrack}
        onLoadedMetadata={getDurationTime}
        ref={audioRef}
        onTimeUpdate={updateTrackTime}
      ></audio>

      <div className='controls'>
        <button onClick={toPrevTrack} className='left-next hide-text'>
          <span>previous track</span>
        </button>
        <button
          className='play-btn hide-text'
          onClick={currentTrack.paused ? playTrack : pauseTrack}
        >
          <span className={currentTrack.paused ? 'play-img' : 'pause-img'}>play</span>
        </button>
        <button onClick={toNextTrack} className='right-next hide-text'>
          <span>next track</span>
        </button>
      </div>

      <div className='track-info'>
        <img src={currentTrack.image_url ? `${environment.API_URL}/${currentTrack.image_url}` : ''} alt=''
             width={70} height={70}/>
        <div className='track-description'>
          <h2>{currentTrack.name}</h2>
          <ArtistList artists={currentTrack.artists}/>
        </div>
      </div>

      <div className='audio-time-controller'>
        <label htmlFor='timeline-range' className='hide-text'>Ползунок времени трека</label>
        <input type='range' id='timeline-range' value={trackTime} onChange={onChangeTrackTime}/>
        <div className='times'>
          <b>{currentTime}</b>
          <b>{durationTime}</b>
        </div>
      </div>

      <div className='controls'>
        <label htmlFor='volume-range' className='hide-text'>Ползунок звука</label>
        <input
          id='volume-range'
          type='range'
          defaultValue={volume}
          onChangeCapture={onChangeVolume}
        />
        <span className='volume-value' style={{left: `${volume - -4}px`}}>
            {volume}%
          </span>

        <button className='three-dot-btn hide-text'>
          <div className='three-dot'>settings</div>
        </button>
      </div>
    </nav>
  );
}

export default TrackController;