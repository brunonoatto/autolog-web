import { ContextSelector, useContextSelector } from '@fluentui/react-context-selector';

import { GarageAddCarContext, TGarageAddCarValue } from '@core/store/context/GarageAddCarContext';

export default function useGarageAddCarContext<T>(
  selector: ContextSelector<TGarageAddCarValue, T>,
) {
  return useContextSelector(GarageAddCarContext, selector);
}
