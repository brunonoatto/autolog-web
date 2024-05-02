import { useContext } from 'react';

import { AuthContext } from '@core/store/context/AuthContext';

export default function useAuth() {
  return useContext(AuthContext);
}
