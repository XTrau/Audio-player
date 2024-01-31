import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "../axios";
import Track from "../components/Track/Track";
import environment from '../environment'

function AlbumPage({
                     selectTrack,
                     addToFavorite,
                     removeFromFavorite,
                     favoriteList,
                     onClickArtist
                   }) {
  const [album, setAlbum] = useState({})
  const params = useParams()

  useEffect(() => {
    const id = params.id
    axios.get(`/api/album/${id}`).then(res => {
      setAlbum(res.data)
    })
  }, [params.id]);

  return (
    <>
      <div className='album-main d-flex m-2 bg-white p-3'>
        <img src={`${environment.API_URL}/${album.image_url}`} alt='' className='rounded-2' width={150} height={150}/>
        <div className='m-3'>
          <h2>{album.name}</h2>
          <span>{
            album.artists?.map((artist, index) => (
              <Link to={`/artist/${artist.name.replaceAll(' ', '_')}/${artist.id}`} key={artist.id}>
                <b className='mx-1'>{artist.name + (index !== album.artists.length - 1 ? ',' : '')}</b>
              </Link>
            ))
          }</span>
        </div>
      </div>

      <div className='my-5'>
        <h2>Музыка {album.name}</h2>
        <ul className='d-flex flex-column p-0'>
          {album.tracks?.map((track, index) => (
            <Track
              key={index}
              index={index}
              track={track}
              selectTrack={selectTrack}
              currentList={album.tracks}
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
              liked={favoriteList.includes(track)}
              onClickArtist={onClickArtist}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default AlbumPage;