import axios from "../axios"

class ArtistFetcher {
  async getAll() {
    const artists = await axios.get('/api/artist')
    if (!artists.data) throw Error("Server error")
    return artists.data
  }

  async getOne(id) {
    const artist = await axios.get(`/api/artist/${id}`)
    if (!artist.data) throw Error("Server error")
    return artist.data
  }

  async create(artist) {
    const fd = new FormData()
    fd.append('name', artist.name)
    fd.append('image', artist.image)

    const createdArtist = await axios.post('/api/artist', fd)
    if (!createdArtist.data) throw Error("Server error")
    return createdArtist.data
  }

  async update(artist) {
    const fd = new FormData()
    fd.append('image', artist.image)
    fd.append('name', artist.name)
    fd.append('id', artist.id)

    const newArtist = await axios.put('/api/artist', fd)
    if (!newArtist.data) throw Error("Server Error")
    return newArtist.data
  }

  async remove(id) {
    const artist = await axios.delete(`/api/artist/${id}`)
    if (!artist.data) throw Error("Server error")
    return artist.data
  }
}

export default new ArtistFetcher()