export interface IUserLogin {
  email: string,
  password: string
}

export interface IUserRegister extends IUserLogin{
  displayName: string,
  avatarImage?: string
}

export interface IUserApi extends IUserRegister {
  token: string,
  role: string,
  _id: string
}