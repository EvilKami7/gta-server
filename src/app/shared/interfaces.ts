export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
  uid?: string;
}

export interface Profile {
  admin?: number;
  name?: string;
  bio?: string;
  image?: string;
  email: string;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
  localId: string;
}

export interface FbUserResponse {
  localId: string;
  admin: number;
  name?: string;
  bio?: string;
  image?: string;
}

export interface Post {
  id?: string;
  title: string;
  descrip: string;
  text: string;
  author: string;
  image: string;
  date: Date;
}

export interface Steps {
  id: number;
  title: string;
  description: string;
}

export interface FbCreateResponse {
  name: string;
}
