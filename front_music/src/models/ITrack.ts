export interface ITrack {
  title: string,
  album: string,
  mp3: string
}

export interface ITrackApi extends ITrack{
  _id: string,
  title: string,
  album: string,
  duration: string,
  number: number,
  publish: boolean,
  user: string
}

interface artist {
  title: string,
  _id: string
}

interface album {
  artist: artist,
  title: string,
  _id: string,
  image: string
}

export interface ITrackWithArtistApi {
  album: album,
  title: string
  mp3: string
  _id: string,
  publish: boolean
}

export interface ITrackHistory {
  datetime: string,
  track: ITrackWithArtistApi
}