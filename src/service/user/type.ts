export type LoginRequest = {
  username: string;
  password: string;
};

type UserInfo = {
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
