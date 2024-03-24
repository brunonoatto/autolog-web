export type TLoginParams = {
  email: string;
  password: string;
};

export type TUserType = 'garage' | 'client';
export type TLoginResponse = {
  type: TUserType;
  name: string;
  accessToken: string;
};
