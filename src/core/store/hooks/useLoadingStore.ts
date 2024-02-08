import createStore from '..';

type TLoadingStore = { isLoading: boolean; loading: (value: boolean) => void };
export const useLoadingStore = createStore<TLoadingStore>((setState) => ({
  isLoading: false,
  loading: (isLoading) => {
    setState({ isLoading });
  },
}));

export default useLoadingStore;
