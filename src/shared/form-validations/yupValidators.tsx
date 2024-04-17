import {
  BYRTHDAY_INVALID_MSG,
  DATE_INVALID_MSG,
  EMAIL_INVALID_MSG,
  MAX_INVALID_MSG,
  NUMBER_INVALID_MSG,
} from './consts';
import yup from './yupCustom';

type TStringValidator = { size: number };
export const StringValidator = ({ size }: TStringValidator = { size: 150 }) =>
  yup.string().max(size, MAX_INVALID_MSG(size));

export const NumberValidator = () => yup.number().typeError(NUMBER_INVALID_MSG);

export const EmailValidator = () => yup.string().email(EMAIL_INVALID_MSG);

export const CpfValidator = () => yup.string().max(11, MAX_INVALID_MSG(11));

export const CnpjValidator = () => yup.string().max(14, MAX_INVALID_MSG(14));

export const DateValidator = () => yup.date().typeError(DATE_INVALID_MSG);

export const BirthdayValidator = () =>
  DateValidator().min(new Date(1920, 0, 1), BYRTHDAY_INVALID_MSG);
