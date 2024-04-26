import {
  DefaultError,
  QueryClient,
  QueryKey,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

export default function useQueryCustom<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient) {
  const { isLoading, isPending, data } = useQuery(options, queryClient);

  return {
    isLoading: isLoading || isPending,
    data,
  };
}
