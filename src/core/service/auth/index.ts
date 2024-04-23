import { DefaultError } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import type { TLoginParams, TLoginResponse } from '@core/api/auth/types';
import useMutationApp from '@shared/hooks/useMutationApp';

export const useLogin = () => {
  return useMutationApp<TLoginResponse, DefaultError, TLoginParams>({
    mutationFn: async (data) => {
      const response = await ServiceApi.AuthApi.login(data);
      return response.data;
    },
  });
};
