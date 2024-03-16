import Track from '../../components/Track/Track'
import {useSelector} from "react-redux";
import TrackSkeleton from "../../components/Track/TrackSkeleton";

function Music({favoriteList, shuffleTracks, selectTrack, addToFavorite, removeFromFavorite}) {
  const trackList = useSelector(store => store.currentTrack.fullTrackList)

  return (<div className='wrapper'>
    <div className='d-flex justify-content-between align-items-center'>
      <h1>Музыка</h1>
      <button className='btn btn-primary h-100' onClick={() => shuffleTracks(trackList)}>Перемешать</button>
    </div>
    <ul className='d-flex flex-column'>
      {trackList.length ? (trackList.map((track, index) => (<Track
        key={index}
        index={index}
        track={track}
        selectTrack={selectTrack}
        currentList={trackList}
        addToFavorite={addToFavorite}
        removeFromFavorite={removeFromFavorite}
        liked={favoriteList.includes(track)}
      />))) : (<>
        <TrackSkeleton/>
        <TrackSkeleton/>
        <TrackSkeleton/>
        <TrackSkeleton/>
        <TrackSkeleton/>
      </>)}
    </ul>
    <div className='wrapper-bottom'>
      <b>Всего: {trackList.length} треков</b>
    </div>
  </div>)
}

export default Music
