import createStore from '@core/store';

type TAuthStore = {
  isAuthenticated: boolean;
  username: string | null;
  signin: (username: string) => Promise<void>;
  signout: () => Promise<void>;
};

const useAuthStore = createStore<TAuthStore>((setState) => ({
  isAuthenticated: false,
  username: null,
  signin: async (username: string) => {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    setState({ isAuthenticated: true, username: username });
  },
  signout: async () => {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    setState({ isAuthenticated: false, username: '' });
  },
}));

export default useAuthStore;
