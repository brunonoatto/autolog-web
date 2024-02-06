import * as yup from 'yup';
import { DATE_INVALID_MSG, EMAIL_INVALID_MSG, MAX_INVALID_MSG, NUMBER_INVALID_MSG, REQUIRED_MSG } from './consts';

type TStringValidator = { size: number };
export const StringValidator = ({ size }: TStringValidator = { size: 150 }) =>
  yup.string().max(size, MAX_INVALID_MSG(size)).required(REQUIRED_MSG);

export const NumberValidator = () => yup.number().typeError(NUMBER_INVALID_MSG).required(REQUIRED_MSG);

export const EmailValidator = () => yup.string().email(EMAIL_INVALID_MSG).required(REQUIRED_MSG);

export const CnpjValidator = () => yup.string().max(14, MAX_INVALID_MSG(14)).required(REQUIRED_MSG);

export const DateValidator = () => yup.date().typeError(DATE_INVALID_MSG).required(REQUIRED_MSG);
