import { z } from 'zod';

import { zodValidators } from '@shared/form-validations';

export const budgetAddClientSchema = z
  .object({
    id: zodValidators.String().optional(),
    name: zodValidators.String(),
    phone: zodValidators.String(),
    cpfCnpj: zodValidators.CpfOrCnpj(),
  })
  .strict();

export const budgetAddCarSchema = z
  .object({
    id: zodValidators.String().optional(),
    license: zodValidators.String().toUpperCase(),
    model: zodValidators.String(),
    year: zodValidators
      .Int()
      .min(1900, 'Ano deve ser maior que 1900')
      .max(new Date().getFullYear(), `Ano deve ser menor ou igual que o atual`),
  })
  .strict();

export const budgetAddSchema = z
  .object({
    client: budgetAddClientSchema,
    car: budgetAddCarSchema,
    observation: zodValidators.StringOptional(),
  })
  .strict();

export type TBudgetAddFormType = z.infer<typeof budgetAddSchema>;
