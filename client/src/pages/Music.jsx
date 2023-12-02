import React from 'react'
import Track from '../components/Track/Track'

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
      <h1 className="mx-5">Музыка</h1>
      <ul className='d-flex flex-column'>
        {trackList?.map((track, index) => (
            <Track
              key={index}
              index={index}
              track={{...track}}
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
