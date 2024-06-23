import { Path } from 'react-hook-form';

export const selectorByName = <T>(name: Path<T>) => `[name='${name as string}']`;
