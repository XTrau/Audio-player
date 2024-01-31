import React from 'react';
import {Link} from "react-router-dom";
import './ArtistList.scss'

function ArtistList({artists}) {
  return (
    <div className='artist-list'>{
      artists?.map((artist, index) => (
        <Link key={artist.id} to={`/artist/${artist.name.replaceAll(' ', '_')}/${artist.id}`}>
          <b>{artist.name + (index !== artists.length - 1 ? ', ' : '')}</b>
        </Link>
      ))
    }</div>
  );
}

export default ArtistList;