export type TParamsLogin = {
  email: string;
  password: string;
};

export type PostType = {
  _id: string;
  user: string;
  title: string;
  content: string;
};

export interface PostCreate {
  user: string;
  title: string;
  content: string;
}

export type User = {
  _id: string;
  name: string;
  email: string;
};
