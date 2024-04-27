/* eslint-disable @typescript-eslint/no-explicit-any */
import onlyNumbers from '@shared/helpers/string/onlyNumbers';

type TEventParams = any[];
type TEvent = (...event: TEventParams) => void;

export type THandleEventsConfigs = {
  valueAsNumber?: boolean;
  isMask?: boolean;
};

export const handleEvents = (
  event1: TEvent,
  event2: TEvent,
  configs: THandleEventsConfigs,
  ...params: any[]
) => {
  const { valueAsNumber, isMask } = configs;

  const [_, ...otherParams] = params;
  let [event] = params;

  if (valueAsNumber && event?.target && 'value' in event.target) {
    const valueOnlyNumbers = onlyNumbers(event.target.value || '');

    let newValue: number | string = valueOnlyNumbers === '' ? NaN : +valueOnlyNumbers;

    if (isNaN(newValue)) newValue = '';

    event = {
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    };
  } else if (isMask) {
    event = {
      ...event,
      target: {
        ...event.target,
        value: onlyNumbers(event.target.value || ''),
      },
    };
  }

  const eventParams = [event, ...otherParams];
  event1?.(...eventParams);
  event2?.(...eventParams);
};
