import { z } from 'zod';

import { zodValidators } from '@shared/form-validations';

export const loginFormSchema = z
  .object({
    email: zodValidators.Email(),
    password: zodValidators.String(),
  })
  .strict();

export type TLoginFormType = z.infer<typeof loginFormSchema>;
