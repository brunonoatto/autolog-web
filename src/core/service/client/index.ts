import { DefaultError, useMutation } from '@tanstack/react-query';

import { ServiceApi } from '@core/api';
import { TNewClient } from '@core/api/client/types';

export const useCreateClient = () => {
  return useMutation<boolean, DefaultError, TNewClient>({
    mutationFn: async (data) => {
      const response = await ServiceApi.ClientApi.post(data);

      return response.data;
    },
  });
};
