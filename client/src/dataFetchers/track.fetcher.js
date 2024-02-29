import axios from "../axios"

class TrackFetcher {
  async getAll() {
    const tracks = await axios.get('/api/track')
    if (!tracks.data) throw Error("Server error")
    return tracks.data
  }

  async getOne(id) {
    const track = await axios.get(`/api/track/${id}`)
    if (!track.data) throw Error("Server error")
    return track.data
  }

  async create(track) {
    const fd = new FormData()
    fd.append('title', track.title)
    fd.append('artists', track.artists)
    fd.append('album_id', track.album_id)
    fd.append('image', track.image)
    fd.append('audio', track.audio)

    const newTrack = await axios.post('/api/track', fd)
    if (!newTrack.data) throw new Error("Server Error")
    return newTrack.data
  }

  async update(id, track) {
    const fd = new FormData()
    fd.append('id', id)
    fd.append('name', track.name)
    const newTrack = await axios.put(`/api/track/${id}`, fd)
  }

  async remove(id) {
    const track = await axios.delete(`/api/track/${id}`)
    if (!track.data) throw Error("Server error")
    return track.data
  }
}

export default new TrackFetcher()