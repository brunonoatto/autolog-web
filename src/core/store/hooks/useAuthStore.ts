import { TGarage } from '@core/api/garage/types';
import createStore from '@core/store';

type TAuthStore = {
  isAuthenticated: boolean;
  garage: TGarage;
  signin: (user: TGarage) => Promise<void>;
  signout: () => Promise<void>;
};

const getLoggedGarage = () => {
  try {
    const autoStorage = localStorage.getItem('auth');
    return autoStorage ? (JSON.parse(autoStorage) as TGarage) : undefined;
  } catch {
    return undefined;
  }
};

const loggedGarage = getLoggedGarage();

const useAuthStore = createStore<TAuthStore>((setState) => ({
  garage: loggedGarage || ({} as TGarage),
  isAuthenticated: !!loggedGarage,
  signin: async (garage: TGarage) => {
    console.log;
    await new Promise((r) => setTimeout(r, 500)); // fake delay

    localStorage.setItem('auth', JSON.stringify(garage));
    setState({ isAuthenticated: true, garage });
  },
  signout: async () => {
    await new Promise((r) => setTimeout(r, 500)); // fake delay

    localStorage.removeItem('auth');
    setState({ isAuthenticated: false, garage: undefined });
  },
}));

export default useAuthStore;
