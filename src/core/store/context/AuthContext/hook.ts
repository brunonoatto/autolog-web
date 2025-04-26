import { useContext } from 'react';

import { AuthContext } from '@core/store/context/AuthContext/context';

export const useAuth = () => useContext(AuthContext);
