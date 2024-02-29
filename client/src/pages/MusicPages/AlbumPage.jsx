import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Track from "../../components/Track/Track";
import environment from '../../environment'
import albumFetcher from "../../dataFetchers/album.fetcher";
import TrackSkeleton from "../../components/Track/TrackSkeleton";
import {Skeleton} from "@mui/material";

function AlbumPage({
                     selectTrack, addToFavorite, removeFromFavorite, favoriteList, onClickArtist
                   }) {
  const [album, setAlbum] = useState(null)
  const params = useParams()

  useEffect(() => {
    const id = params.id
    albumFetcher.getOne(id).then(data => setAlbum(data))
  }, [params.id]);

  return (<div className='wrapper'>
    <div className='album-main d-flex m-2 bg-white p-3'>
      {album ? (<>
        <img src={`${environment.API_URL}/${album.image_url}`} alt='' className='rounded-2' width={150} height={150}/>
        <div className='m-3'>
          <h2>{album.name}</h2>
          <span>
            {album.artists?.map((artist, index) => (
              <Link to={`/artist/${artist.name.replaceAll(' ', '_')}/${artist.id}`} key={artist.id}>
                <b className='mx-1'>{artist.name + (index !== album.artists.length - 1 ? ',' : '')}</b>
              </Link>))}
          </span>
        </div>
      </>) : (<>
        <Skeleton width={150} height={150} animation={'wave'}/>
        <div className='m-3'>
          <h2>
            <Skeleton width={200} animation={'wave'}/>
          </h2>
          <span>
              <Skeleton width={100} animation={'wave'}/>
            </span>
        </div>
      </>)}
    </div>

    <div className='my-5'>
      <h2>Музыка</h2>
      <ul className='d-flex flex-column p-0'>
        {album ? album.tracks.map((track, index) => (<Track
          key={index}
          index={index}
          track={track}
          selectTrack={selectTrack}
          currentList={album.tracks}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
          liked={favoriteList.includes(track)}
          onClickArtist={onClickArtist}
        />)) : (<>
          <TrackSkeleton/>
          <TrackSkeleton/>
          <TrackSkeleton/>
          <TrackSkeleton/>
          <TrackSkeleton/>
        </>)}
      </ul>
    </div>
  </div>);
}

export default AlbumPage;