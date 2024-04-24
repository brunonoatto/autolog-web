import { DefaultError, useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TLoginParams, TLoginResponse } from '@core/api/auth/types';

export const useLogin = () => {
  return useMutation<TLoginResponse, DefaultError, TLoginParams>({
    mutationFn: async (data) => {
      const response = await ServiceApi.AuthApi.login(data);
      return response.data;
    },
  });
};
