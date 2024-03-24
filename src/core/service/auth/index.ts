import { DefaultError, useMutation } from '@tanstack/react-query';

import type { TLoginParams, TLoginResponse } from '@core/api/auth/types';
import { ServiceApi } from '@core/api';

export const useLogin = () => {
  return useMutation<TLoginResponse, DefaultError, TLoginParams>({
    mutationFn: async (data) => {
      const response = await ServiceApi.AuthApi.login(data);
      return response.data;
    },
  });
};
