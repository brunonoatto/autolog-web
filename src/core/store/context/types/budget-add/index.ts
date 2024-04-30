import { z } from 'zod';

import { zodValidators } from '@shared/form-validations';

export const budgetAddSchema = z
  .object({
    name: zodValidators.String(),
    phone: zodValidators.String(),
    cpf_cnpj: zodValidators.CpfOrCnpj(),
    license: zodValidators.String().toUpperCase(),
    brand: zodValidators.String(),
    model: zodValidators.String(),
    year: zodValidators
      .Int()
      .min(1900, 'Ano deve ser maior que 1900')
      .max(new Date().getFullYear(), `Ano deve ser menor ou igual que o atual`),
    observation: zodValidators.StringOptional(),
  })
  .strict();

export type TBudgetAddFormType = z.infer<typeof budgetAddSchema>;
