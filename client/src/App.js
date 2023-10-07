import { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout/Layout'

import Music from './pages/Music'
import Favorite from './pages/Favorite'
import About from './pages/About'
import { useDispatch } from 'react-redux'

function App() {
  const [trackList, setTrackList] = useState([
    {
      title: 'Stan',
      authors: 'Eminem',
      img: '/artists/Eminem/audio/Stan/Stan.jpg',
      audio: '/artists/Eminem/audio/Stan/Stan.mp3',
    },
    {
      title: 'IF I EVER',
      authors: 'Onative, Rich The Kid, MORGENSTERN',
      img: '/artists/MORGENSTERN/audio/IF I EVER/IF I EVER.jpg',
      audio: '/artists/MORGENSTERN/audio/IF I EVER/IF I EVER.mp3',
    },
    {
      title: 'Dance Monkey',
      authors: 'Tones and I',
      img: '/artists/Tones and I/audio/Dance Monkey/Dance Monkey.jpg',
      audio: '/artists/Tones and I/audio/Dance Monkey/Dance Monkey.mp3',
    },
    {
      title: 'NOMINALO',
      authors: 'MORGENSTERN',
      img: '/artists/MORGENSTERN/audio/NOMINALO/MILLION DOLLAR BUSINESS.jpg',
      audio: '/artists/MORGENSTERN/audio/NOMINALO/NOMINALO.mp3',
    },
    {
      title: 'ARISTOCRAT',
      authors: 'MORGENSTERN',
      img: '/artists/MORGENSTERN/audio/ARISTOCRAT/MILLION DOLLAR BUSINESS.jpg',
      audio: '/artists/MORGENSTERN/audio/ARISTOCRAT/ARISTOCRAT.mp3',
    },
    {
      title: 'GTA',
      authors: 'MORGENSTERN',
      img: '/artists/MORGENSTERN/audio/GTA/MILLION DOLLAR BUSINESS.jpg',
      audio: '/artists/MORGENSTERN/audio/GTA/GTA.mp3',
    },
    {
      title: 'ASPHALT 8',
      authors: 'MACAN',
      img: '/artists/MACAN/audio/ASPHALT 8/ASPHALT 8.jpg',
      audio: '/artists/MACAN/audio/ASPHALT 8/ASPHALT 8.mp3',
    },
    {
      title: 'Полный бак',
      authors: 'Buster',
      img: '/artists/Buster/audio/Полный бак/Полный бак.jpg',
      audio: '/artists/Buster/audio/Полный бак/Полный бак.mp3',
    },
    {
      title: 'Boom Clap',
      authors: 'Charli XCX',
      img: '/artists/Charli XCX/audio/Boom Clap/Boom Clap.jpg',
      audio: '/artists/Charli XCX/audio/Boom Clap/Boom Clap.mp3',
    },
    {
      title: 'Уфф... Деньги...',
      authors: 'MORGENSTERN',
      img: '/artists/MORGENSTERN/audio/Уфф... Деньги/Уфф... Деньги....jpg',
      audio: '/artists/MORGENSTERN/audio/Уфф... Деньги/Уфф... Деньги....mp3',
    },
    {
      title: 'Часики',
      authors: 'Егор Крид',
      img: '/artists/Егор Крид/audio/Часики/Часики.jpg',
      audio: '/artists/Егор Крид/audio/Часики/Часики.mp3',
    },
    {
      title: 'Нервы',
      authors: 'Нервы',
      img: '/artists/Нервы/audio/Нервы/Нервы.jpg',
      audio: '/artists/Нервы/audio/Нервы/Нервы.mp3',
    },
    {
      title: 'Батареи',
      authors: 'Нервы',
      img: '/artists/Нервы/audio/Батареи/Батареи.jpg',
      audio: '/artists/Нервы/audio/Батареи/Батареи.mp3',
    },
    {
      title: 'Weak',
      authors: 'AJR',
      img: '/artists/AJR/audio/Weak/Weak.jpg',
      audio: '/artists/AJR/audio/Weak/Weak.mp3',
    },
  ])
  const [favoriteList, setFavoriteList] = useState([])

  const [nextTracks, setNextTracks] = useState([])
  const [prevTracks, setPrevTracks] = useState([])

  const [search, setSearch] = useState('')

  const [trackLoaded, setTrackLoaded] = useState(false)

  const [volume, setVolume] = useState(localStorage.getItem('volume'))

  const [trackTime, setTrackTime] = useState(0)
  const [currentTime, setCurrentTime] = useState('00:00')
  const [durationTime, setDurationTime] = useState('00:00')

  const [currentTrack, setCurrentTrack] = useState({})
  const [paused, setPaused] = useState(true)
  const dispatch = useDispatch()

  const audioRef = useRef()

  useEffect(() => {
    selectTrack(trackList[0])
  }, [])

  function playTrack() {
    setPaused(false)
    dispatch({ type: 'PLAY' })
    audioRef.current.play()
  }

  function pauseTrack() {
    setPaused(true)
    dispatch({ type: 'PAUSE' })
    audioRef.current.pause()
  }

  const onTrackLoaded = () => {
    audioRef.current.volume = (volume / 100).toFixed(2)
    getDurationTime()
    setTrackLoaded(true)
    console.log(audioRef)
  }

  function selectTrack(track) {
    setTrackTime(0)
    const nextList = []
    const prevList = []
    let prevEnded = false
    for (let el of trackList) {
      if (el.title === track.title) {
        prevEnded = true
        continue
      }

      if (prevEnded) nextList.push(el)
      else prevList.push(el)
    }

    dispatch({ type: 'CHANGE_TRACK', payload: track })
    setCurrentTrack(track)
    setNextTracks(nextList)
    setPrevTracks(prevList)
  }

  function toPrevTrack() {
    setTrackTime(0)
    if (prevTracks.length === 0) {
      selectTrack(trackList[trackList.length - 1])
      setTimeout(() => playTrack(), 0)
      return
    }
    const nextList = nextTracks
    const prevList = prevTracks
    setCurrentTrack(prevTracks[prevTracks.length - 1])
    dispatch({
      type: 'CHANGE_TRACK',
      payload: prevTracks[prevTracks.length - 1],
    })
    nextList.unshift(currentTrack)
    prevList.pop()
    setNextTracks(nextList)
    setPrevTracks(prevList)

    setTimeout(() => playTrack(), 0)
  }

  function toNextTrack() {
    setTrackTime(0)
    if (nextTracks.length === 0) {
      selectTrack(trackList[0])
      setTimeout(() => playTrack(), 0)
      return
    }

    const nextList = nextTracks
    const prevList = prevTracks
    setCurrentTrack(nextTracks[0])
    dispatch({ type: 'CHANGE_TRACK', payload: nextTracks[0] })
    nextList.shift()
    prevList.push(currentTrack)
    setNextTracks(nextList)
    setPrevTracks(prevList)

    setTimeout(() => playTrack(), 0)
  }

  const updateTrackTime = () => {
    const percent =
      audioRef.current.currentTime / (audioRef.current.duration / 100)
    setTrackTime(percent)
    getCurrentTime()
  }

  const onChangeTrackTime = e => {
    const percent = e.target.value
    audioRef.current.currentTime = (percent * audioRef.current.duration) / 100
    setTrackTime(percent)
  }

  const onChangeVolume = e => {
    setVolume(e.target.value)
    audioRef.current.volume = (e.target.value / 100).toFixed(2)
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
    <Layout>
      <main>
        <div className='wrapper'>
          {trackLoaded ? (
            <Routes>
              <Route
                path='/'
                element={
                  <Music
                    trackList={trackList}
                    search={search}
                    selectTrack={selectTrack}
                    playTrack={playTrack}
                    pauseTrack={pauseTrack}
                    audioRef={audioRef}
                    currentTrack={currentTrack}
                    paused={paused}
                  />
                }
              />
              <Route
                path='/favorite'
                element={
                  <Favorite
                    favoriteList={favoriteList}
                    search={search}
                    selectTrack={selectTrack}
                    playTrack={playTrack}
                    pauseTrack={pauseTrack}
                    audioRef={audioRef}
                    currentTrack={currentTrack}
                    paused={paused}
                  />
                }
              />
              <Route path='/about' element={<About />} />
            </Routes>
          ) : (
            <></>
          )}
        </div>
      </main>

      <nav className='track-controller'>
        <audio
          src={currentTrack.audio}
          onEnded={toNextTrack}
          onLoadedMetadata={onTrackLoaded}
          onTimeUpdate={updateTrackTime}
          ref={audioRef}
        ></audio>

        <div className='controls'>
          <button onClick={toPrevTrack}>
            <span>prev</span>
          </button>
          <button
            className='play-btn'
            onClick={paused ? playTrack : pauseTrack}
          >
            <span className={paused ? 'play-img' : 'pause-img'}></span>
          </button>
          <button>
            <span onClick={toNextTrack}>next</span>
          </button>
        </div>

        <div className='track-info'>
          <img src={currentTrack.img} alt='' width={70} height={70} />
          <div className='track-description'>
            <h2>{currentTrack.title}</h2>
            <b>{currentTrack.authors}</b>
          </div>
        </div>

        <div className='audio-time-controller'>
          <input type='range' value={trackTime} onChange={onChangeTrackTime} />
          <div className='times'>
            <b>{currentTime}</b>
            <b>{durationTime}</b>
          </div>
        </div>

        <div className='controls'>
          <input
            className='volume-range'
            type='range'
            value={volume}
            onChangeCapture={onChangeVolume}
          />
          <span className='volume-value' style={{ left: `${volume - -4}px` }}>
            {volume}%
          </span>

          <button className='three-dot-btn'>
            <div className='three-dot'></div>
          </button>
        </div>
      </nav>
    </Layout>
  )
}

export default App
