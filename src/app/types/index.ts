export type TParamsLogin = {
  email: string;
  password: string;
};

export type PostType = {
  _id: string;
  user: User;
  title: string;
  content: string;
  picture?: string;
  likes: LikeType[];
  likesCount: number;
  comments?: CommentType[];
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

export type LikeType = {
  _id: string;
  user: string;
  post: string;
};

export type Like = {
  user: string;
  post: string;
};

export type CommentType = {
  _id: string;
  user: User;
  post: string;
  content: string;
};

export type Comment = {
  user: string;
  post: string;
  content: string;
};
