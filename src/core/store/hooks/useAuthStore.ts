import createStore from '@core/store';

type TUser = {
  username: string;
  password: string;
};

type TAuthStore = {
  isAuthenticated: boolean;
  user?: TUser;
  signin: (user: TUser) => Promise<void>;
  signout: () => Promise<void>;
};

const getSessionUser = () => {
  try {
    return (JSON.parse(localStorage.getItem('auth') || '{}') as TUser) || undefined;
  } catch {
    return undefined;
  }
};

const user = getSessionUser();

const useAuthStore = createStore<TAuthStore>((setState) => ({
  user,
  isAuthenticated: !!user,
  signin: async (user: TUser) => {
    await new Promise((r) => setTimeout(r, 500)); // fake delay

    localStorage.setItem('auth', JSON.stringify(user));
    setState({ isAuthenticated: true, user });
  },
  signout: async () => {
    await new Promise((r) => setTimeout(r, 500)); // fake delay

    localStorage.removeItem('auth');
    setState({ isAuthenticated: false, user: undefined });
  },
}));

export default useAuthStore;
