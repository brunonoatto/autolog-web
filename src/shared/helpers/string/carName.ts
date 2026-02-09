import { TCar } from '@core/api/car/types';

export default function carName({ model, year }: TCar) {
  return `${model} - ${year}`;
}
