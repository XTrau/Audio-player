import React from 'react'
import Track from '../components/Track/Track'

function Music({
  trackList,
  search,
  selectTrack,
  playTrack,
  pauseTrack,
  audioRef,
  currentTrack,
  paused
}) {
  return (
    <>
      <h1>Музыка</h1>
      <ul className='track-list'>
        {trackList
          .filter(track => {
            const filterList = search.trim().split(' ')
            for (const text of filterList) {
              const lowerText = text.toLowerCase()
              if (
                track.title.toLowerCase().includes(lowerText) ||
                track.authors.toLowerCase().includes(lowerText)
              )
                return true
            }
          })
          .map((track, index) => (
            <Track
              key={index}
              track={track}
              audioRef={audioRef}
              selectTrack={selectTrack}
              playTrack={playTrack}
              pauseTrack={pauseTrack}
              currentTrack={currentTrack}
              paused={paused}
            />
          ))}
      </ul>

      <div className='wrapper-bottom'>
        <b>Всего: {trackList.length} треков</b>
      </div>
    </>
  )
}

export default Music
