import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';

import { useToast } from '@shared/design-system/ui/use-toast';

export default function useMutationApp<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(options: UseMutationOptions<TData, TError, TVariables, TContext>) {
  const { toast } = useToast();
  return useMutation({
    ...options,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (e: any) => {
      const title = e?.response?.data?.message;
      if (title) toast({ title, variant: 'destructive' });
    },
  });
}
