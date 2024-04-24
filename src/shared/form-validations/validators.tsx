import { isCNPJ, isCPF, isCPFOrCNPJ } from 'brazilian-values';
import z from 'zod';

import {
  BYRTHDAY_INVALID_MSG,
  CNPJ_INVALID_MSG,
  CPF_CNPJ_INVALID_MSG,
  CPF_INVALID_MSG,
  DATE_INVALID_MSG,
  EMAIL_INVALID_MSG,
  INTEGER_INVALID_MSG,
  MAX_LENGTH_INVALID_MSG,
  MIN_LENGTH_INVALID_MSG,
  NUMBER_INVALID_MSG,
  REQUIRED_MSG,
  STRING_MAX_LENGTH_DEFAULT,
  STRING_MIN_LENGTH_DEFAULT,
} from './consts';

type TStringValidator = { minLength?: number; maxLength?: number; requiredMessage?: string };

export const String = ({
  minLength = STRING_MIN_LENGTH_DEFAULT,
  maxLength = STRING_MAX_LENGTH_DEFAULT,
  requiredMessage,
}: TStringValidator = {}) =>
  z
    .string({ required_error: requiredMessage || REQUIRED_MSG })
    .min(minLength, MIN_LENGTH_INVALID_MSG(minLength))
    .max(maxLength, MAX_LENGTH_INVALID_MSG(maxLength));

export const StringOptional = ({
  maxLength: size = STRING_MAX_LENGTH_DEFAULT,
}: Omit<TStringValidator, 'requiredMessage'> = {}) =>
  z.string().max(size, MAX_LENGTH_INVALID_MSG(size)).optional();

const Password = () => String({ minLength: 6, maxLength: 25 });
export const PasswordSchema = z
  .object({
    password: Password(),
    passwordConfirm: Password(),
  })
  .refine(
    ({ password, passwordConfirm }) => {
      console.log('refinerefinerefine', { password, passwordConfirm });
      return password === passwordConfirm;
    },
    {
      message: 'Confirmação da senha inválida!',
      path: ['passwordConfirm'],
    },
  );

export const Number = () =>
  z.number({
    message: REQUIRED_MSG,
    invalid_type_error: NUMBER_INVALID_MSG,
  });

export const Int = () =>
  Number().int({
    message: INTEGER_INVALID_MSG,
  });

export const Email = () => String().email(EMAIL_INVALID_MSG);

export const Cpf = () =>
  String().max(11, MAX_LENGTH_INVALID_MSG(11)).refine(isCPF, CPF_INVALID_MSG);

export const Cnpj = () =>
  String().max(14, MAX_LENGTH_INVALID_MSG(14)).refine(isCNPJ, CNPJ_INVALID_MSG);

export const CpfOrCnpj = () =>
  String().max(14, MAX_LENGTH_INVALID_MSG(14)).refine(isCPFOrCNPJ, CPF_CNPJ_INVALID_MSG);

export const DateValidator = () =>
  z.date({
    invalid_type_error: DATE_INVALID_MSG,
  });

export const Birthday = () => DateValidator().min(new Date(1920, 0, 1), BYRTHDAY_INVALID_MSG);
