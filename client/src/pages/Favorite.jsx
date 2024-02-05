import React from 'react'
import Track from '../components/Track/Track'

function Favorite({
                    favoriteList,
                    search,
                    selectTrack,
                    shuffleTracks,
                    addToFavorite,
                    removeFromFavorite
                  }) {
  return (
    <div className='wrapper'>
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Избранное</h1>
        <button className='btn btn-primary h-100' onClick={() => shuffleTracks(favoriteList)}>Перемешать</button>
      </div>

      <ul className='track-list'>
        {favoriteList?.map((track, index) => (
          <Track
            key={index}
            index={index}
            track={track}
            selectTrack={selectTrack}
            currentList={favoriteList}
            addToFavorite={addToFavorite}
            removeFromFavorite={removeFromFavorite}
            liked={favoriteList.includes(track)}
          />
        ))}
      </ul>

      <div className='wrapper-bottom'>
        <b>Всего: {favoriteList.length} треков</b>
      </div>
    </div>
  )
}

export default Favorite
