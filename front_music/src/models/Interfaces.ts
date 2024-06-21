export interface IArtist {
  _id: string,
  title: string,
  image: string,
  publish: boolean,
  user: string
  information?: string,
}

export interface IAlbum {
  _id: string,
  title: string,
  image: string
  artist: IArtist,
  date: string,
  publish: boolean,
  user: string
}

export interface ITrack {
  title: string,
  album: string,
  duration: string,
  number: number,
  publish: boolean,
  user: string,
  mp3?: string
}

export interface IUser {
  username: string,
  password: string,
  displayName: string,
  avatarImage?: string
}

export interface IUserApi extends IUser {
  token: string,
  role: string,
}