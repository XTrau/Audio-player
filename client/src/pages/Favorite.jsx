import React from 'react'
import Track from '../components/Track/Track'

function Favorite({
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
      <h1>Избранное</h1>
      <ul className='track-list'>
        {favoriteList
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
              currentList={favoriteList}
              playTrack={playTrack}
              pauseTrack={pauseTrack}
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
              liked={favoriteList.includes(track)}
            />
          ))}
      </ul>

      <div className='wrapper-bottom'>
        <b>Всего: {favoriteList.length} треков</b>
      </div>
    </>
  )
}

export default Favorite
