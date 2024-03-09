import { DefaultError, useMutation } from '@tanstack/react-query';

import type { TLoginParams } from '@core/api/auth/types';
import type { TGarage } from '@core/api/garage/types';
import { ServiceApi } from '@core/api';

export const useLogin = () => {
  return useMutation<TGarage, DefaultError, TLoginParams>({
    mutationFn: async (data) => {
      const response = await ServiceApi.AuthApi.login(data);
      return response.data;
    },
  });
};
