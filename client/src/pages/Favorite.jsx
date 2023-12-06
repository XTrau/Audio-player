import React from 'react'
import Track from '../components/Track/Track'

function Favorite({
                    favoriteList,
                    search,
                    selectTrack,
                    playTrack,
                    pauseTrack,
                    shuffleTracks,
                    audioRef,
                    addToFavorite,
                    removeFromFavorite
                  }) {
  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className="mx-5">Избранное</h1>
        <button className='btn btn-primary h-100' onClick={() => shuffleTracks(favoriteList)}>Перемешать</button>
      </div>

      <ul className='track-list'>
        {favoriteList?.map((track, index) => (
          <Track
            key={index}
            index={index}
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
