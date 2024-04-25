import { TCar } from '@core/api/car/types';

export default function carName({ brand, model, year }: TCar) {
  return `${brand} - ${model} - ${year}`;
}
