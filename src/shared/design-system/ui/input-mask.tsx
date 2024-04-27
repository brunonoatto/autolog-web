import React, { useCallback, useState } from 'react';
import { PatternFormat, PatternFormatProps } from 'react-number-format';

import { Input } from '@shared/design-system/ui/input';
import MasksEnum from '@shared/helpers/string/masks';
import onlyNumbers from '@shared/helpers/string/onlyNumbers';

type TMaskInput = Omit<PatternFormatProps, 'format'> & {
  mask: MasksEnum;
  maskSecond?: MasksEnum;
  maskSecondCondition?: (e: React.KeyboardEvent<HTMLInputElement>, value: string) => boolean;
};

const MaskInput = React.forwardRef<HTMLInputElement, TMaskInput>(
  ({ mask, maskSecond, maskSecondCondition, ...otherProps }, ref) => {
    const [currentMask, setCurrentMask] = useState<MasksEnum>(mask);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!maskSecond) return;

        const textOnlyNumbers = onlyNumbers(e.currentTarget.value);

        let newMask: MasksEnum = MasksEnum.none;

        if (maskSecondCondition?.(e, textOnlyNumbers)) {
          if (currentMask !== maskSecond) {
            newMask = maskSecond;
          }
        } else if (currentMask !== mask) {
          newMask = mask;
        }

        if (newMask !== MasksEnum.none) {
          setCurrentMask(newMask);
        }
      },
      [currentMask, mask, maskSecond, maskSecondCondition],
    );

    return (
      <PatternFormat
        {...otherProps}
        getInputRef={ref}
        customInput={Input}
        format={currentMask}
        onKeyDown={handleKeyDown}
      />
    );
  },
);

export default MaskInput;
