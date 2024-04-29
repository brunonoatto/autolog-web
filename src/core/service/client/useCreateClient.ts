import { useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';

export const useCreateClient = () => {
  return useMutation({
    mutationFn: ServiceApi.ClientApi.post,
  });
};
