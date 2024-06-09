export type TLoginParams = {
  email: string;
  password: string;
};

export type TUserType = 'Client' | 'Garage';

export type TLoginResponse = {
  accessToken: string;
};

export type TAccessTokenData = {
  id: string;
  name: string;
  type: TUserType;
};
