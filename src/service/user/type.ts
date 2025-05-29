export type LoginRequest = {
  username: string;
  password: string;
};

export type UserInfo = {
  id: number;
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  phone: string;
  isFrozen: boolean;
  isAdmin: boolean;
  createdTime: Date;
  roles: string[];
  permissions: string[];
};

export type LoginResponse = {
  userInfo: UserInfo;
  accessToken: string;
  refreshToken: string;
};

export type RegisterRequest = {
  username: string;
  password: string;
  nick_name: string;
  email: string;
  captcha: string;
};

export type updatePasswordRequest = {
  username: string;
  email: string;
  captcha: string;
  new_password: string;
};

export type updateUserInfoRequest = {
  nick_name: string;
  email: string;
  phone: string;
  avatar: string;
  captcha: string;
};

export type UserInfoResponse = {
  userInfo: UserInfo;
};
