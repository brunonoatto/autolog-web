import { useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

export const useLogin = () => {
  return useMutation({
    mutationFn: ServiceApi.AuthApi.login,
  });
};
