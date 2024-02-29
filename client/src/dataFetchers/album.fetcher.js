import axios from "../axios"

class AlbumFetcher {
  async getAll() {
    const albums = await axios.get('/api/album')
    if (!albums.data) throw Error("Server error")
    return albums.data
  }

  async getOne(id) {
    const album = await axios.get(`/api/album/${id}`)
    if (!album.data) throw Error("Server error")
    return album.data
  }

  async create(album) {
    const fd = new FormData()
    fd.append('artists', album.artists)
    fd.append('title', album.title)
    fd.append('image', album.image)

    const newAlbum = await axios.post('/api/album', fd)
    if (!newAlbum.data) throw new Error("Server error")
    return newAlbum.data
  }

  async update(id, album) {
    const fd = new FormData()
    fd.append('id', id)
  }

  async remove(id) {
    const album = await axios.delete(`/api/album/${id}`)
    if (!album.data) throw Error("Server error")
    return album.data
  }
}

export default new AlbumFetcher()