import { CircleX } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';

import { Button, TButtonProps } from '@shared/design-system/ui/button';
import { CardTitle } from '@shared/design-system/ui/card';
import { TIcons } from '@shared/design-system/ui/icon';
import {
  MODAL_CANCEL_BUTTON_TEST_ID,
  MODAL_CONFIRM_BUTTON_TEST_ID,
} from '@shared/design-system/ui/modal/consts';
import Portal from '@shared/design-system/ui/portal';

type TModalProps = PropsWithChildren & {
  open: boolean;
  title?: ReactNode;
  icon?: TIcons;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: TButtonProps['variant'];
  cancelVariant?: TButtonProps['variant'];
  onCancelClick?: () => void;
  onConfirmClick?: () => void;
  onClose?: () => void;
};
const Modal = ({
  children,
  open,
  title,
  icon,
  confirmText = 'Confirmar',
  cancelText = 'Voltar',
  confirmVariant = 'default',
  cancelVariant = 'outline',
  onCancelClick,
  onConfirmClick,
  onClose,
}: TModalProps) => {
  return (
    <Portal open={open}>
      <div className="m-auto w-full h-full md:h-auto md:w-2/3 bg-background border-2 border-border rounded-xl p-4 md:p-6 flex flex-col space-y-4">
        <div>
          {onClose && (
            <div className="text-right">
              <Button icon={CircleX} variant="ghost" size="icon" onClick={onClose} />
            </div>
          )}
          <CardTitle icon={icon}>{title}</CardTitle>
        </div>
        <div className="overflow-auto">{children}</div>
        <div className="text-right space-x-4 ">
          {onCancelClick && (
            <Button
              data-testid={MODAL_CANCEL_BUTTON_TEST_ID}
              variant={cancelVariant}
              onClick={onCancelClick}
            >
              {cancelText}
            </Button>
          )}
          {onConfirmClick && (
            <Button
              data-testid={MODAL_CONFIRM_BUTTON_TEST_ID}
              variant={confirmVariant}
              onClick={onConfirmClick}
            >
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
