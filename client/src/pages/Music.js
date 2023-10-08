import React from 'react'
import Track from '../components/Track/Track'
import favorite from "./Favorite";

function Music({
                 trackList,
                 favoriteList,
                 search,
                 selectTrack,
                 playTrack,
                 pauseTrack,
                 audioRef,
                 addToFavorite,
                 removeFromFavorite
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
            return false
          })
          .map((track, index) => (
            <Track
              key={index}
              track={track}
              audioRef={audioRef}
              selectTrack={selectTrack}
              currentList={trackList}
              playTrack={playTrack}
              pauseTrack={pauseTrack}
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
              liked={favoriteList.includes(track)}
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
