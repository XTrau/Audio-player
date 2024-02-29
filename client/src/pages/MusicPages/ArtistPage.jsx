import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Track from "../../components/Track/Track";
import {Link} from 'react-router-dom'
import environment from "../../environment";
import artistFetcher from "../../dataFetchers/artist.fetcher";
import {Skeleton} from "@mui/material";
import TrackSkeleton from "../../components/Track/TrackSkeleton";

function ArtistPage({
                      selectTrack, addToFavorite, removeFromFavorite, favoriteList, onClickArtist
                    }) {
  const [artist, setArtist] = useState(null)
  const params = useParams()

  useEffect(() => {
    const id = params.id
    artistFetcher.getOne(id).then(artist => setArtist(artist))
  }, [params.id]);

  return (
    <div className='wrapper'>
      <div className='d-flex justify-content-between m-2 bg-white p-3'>
        {artist ? (
          <>
            <img src={`${environment.API_URL}/${artist.image_url}`} alt='' className='rounded-2' width={150}
                 height={150}/>
            <div className='m-3 w-100'>
              <h2>{artist.name}</h2>
              <div>{(artist.albums?.length ? artist.albums?.length : 0) + ' Альбомов'}</div>
              <div>{(artist.tracks?.length ? artist.tracks?.length : 0) + ' Треков'}</div>
            </div>
            <div>
              <Link to='edit'>Изменить</Link>
            </div>
          </>
        ) : (
          <>
            <Skeleton width={150} height={150}/>
            <div className='m-3 w-100'>
              <h2>
                <Skeleton width={200} height="100%" animation='wave'/>
              </h2>
              <div className='my-2'>
                <Skeleton width={200} height="100%" animation='wave'/>
              </div>
              <div>
                <Skeleton width={200} height="100%" animation='wave'/>
              </div>
            </div>
          </>
        )}
      </div>

      <div className='album-slider d-flex'>

        {
          artist ?
            (
              artist.albums?.map((album, index) => {
                return (
                  <Link to={`/album/${album.name.replaceAll(' ', '_')}/${album.id}`} key={index}>
                    <div className='album-wrapper d-flex flex-column mx-2 p-2 rounded-3 shadow c-pointer'>
                      <img src={`${environment.API_URL}/${album.image_url}`} alt='' className='rounded-2' width={200}/>
                      <b>{album.name}</b>
                      <b className='opacity-75'>{(() => {
                        const text = album.artists?.reduce((acc, artist) => acc + artist.name + ', ', '')
                        return text.substring(0, text.length - 2)
                      })()}</b>
                    </div>
                  </Link>)
              })) : (
              <>
                <Skeleton width={230} height={270} className='mx-2' animation='wave'/>
                <Skeleton width={230} height={270} className='mx-2' animation='wave'/>
                <Skeleton width={230} height={270} className='mx-2' animation='wave'/>
                <Skeleton width={230} height={270} className='mx-2' animation='wave'/>
              </>
            )
        }

      </div>

      <div className='my-5'>
        <h2>Музыка</h2>
        <ul className='d-flex flex-column p-0'>
          {
            artist ?
              (
                artist.tracks?.map((track, index) => (<Track
                  key={index}
                  index={index}
                  track={track}
                  selectTrack={selectTrack}
                  currentList={artist.tracks}
                  addToFavorite={addToFavorite}
                  removeFromFavorite={removeFromFavorite}
                  liked={favoriteList.includes(track)}
                  onClickArtist={onClickArtist}
                />))
              ) : (
                <>
                  <TrackSkeleton/>
                  <TrackSkeleton/>
                  <TrackSkeleton/>
                  <TrackSkeleton/>
                  <TrackSkeleton/>
                </>
              )}
        </ul>
      </div>
    </div>);
}

export default ArtistPage;