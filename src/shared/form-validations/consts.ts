export const REQUIRED_MSG = 'Campo obrigatório';
export const INTEGER_INVALID_MSG = 'Número deve ser um inteiro';
export const NUMBER_INVALID_MSG = 'Número inválido';
export const DATE_INVALID_MSG = 'Data inválida';
export const BYRTHDAY_INVALID_MSG = 'Data deve ser maior que 01/01/1920';
export const EMAIL_INVALID_MSG = 'E-mail inválido';
export const CPF_INVALID_MSG = 'CPF inválido';
export const CNPJ_INVALID_MSG = 'CNPJ inválido';
export const CPF_CNPJ_INVALID_MSG = 'CPF/CNPJ inválido';
export const MIN_INVALID_MSG = (value: number) => `Deve ser maior que ${value}`;
export const MIN_LENGTH_INVALID_MSG = (value: number) => `Mínimo ${value} caracteres`;
export const MAX_LENGTH_INVALID_MSG = (value: number) => `Máximo ${value} caracteres`;

export const STRING_MIN_LENGTH_DEFAULT = 1;
export const STRING_MAX_LENGTH_DEFAULT = 150;
