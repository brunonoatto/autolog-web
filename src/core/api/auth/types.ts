export type TLoginParams = {
  email: string;
  password: string;
};

export type TUserType = 'garage' | 'client';

export type TLoginResponse = {
  accessToken: string;
};

export type TAccessTokenData = {
  id: string;
  name: string;
  type: TUserType;
};
