export interface IArtist {
  title: string,
  image: string,
  information: string,
}

export interface IArtistApi extends Omit<IArtist, 'information'> {
  _id: string,
  publish: boolean,
  user: string,
  information: string | null,
}