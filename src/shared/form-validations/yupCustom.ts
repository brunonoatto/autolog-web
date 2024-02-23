import * as yup from 'yup';
import { INTEGER_INVALID_MSG, REQUIRED_MSG } from './consts';

yup.setLocale({
  mixed: {
    required: () => REQUIRED_MSG,
  },
  number: {
    integer: () => INTEGER_INVALID_MSG,
  },
});

export default yup;
