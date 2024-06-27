import {IArtistApi} from "./IArtist";

export interface IAlbum {
  title: string,
  image: string,
  date: string,
  artist: string
}

export interface IAlbumApi extends Omit<IAlbum, 'artist'>{
  _id: string,
  artist: IArtistApi,
  publish: boolean,
  user: string
}