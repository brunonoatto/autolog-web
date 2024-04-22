import type { PropsWithChildren, ReactNode } from 'react';

import { Button, TButtonProps } from '@shared/design-system/ui/button';
import { CardTitle } from '@shared/design-system/ui/card';
import IconButton from '@shared/design-system/ui/icon-button';
import Portal from '@shared/design-system/ui/portal';

type TModalProps = PropsWithChildren & {
  open: boolean;
  title?: ReactNode;
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
      <div className="m-auto w-full h-full md:h-auto md:w-2/3 bg-background rounded-xl p-4 md:p-6 flex flex-col space-y-4">
        <div>
          {onClose && (
            <div className="text-right">
              <IconButton icon="circle-x" variant="ghost" size="icon" onClick={onClose} />
            </div>
          )}
          <CardTitle>{title}</CardTitle>
        </div>
        <div className="overflow-auto">{children}</div>
        <div className="text-right space-x-4 ">
          {onCancelClick && (
            <Button variant={cancelVariant} onClick={onCancelClick}>
              {cancelText}
            </Button>
          )}
          {onConfirmClick && (
            <Button variant={confirmVariant} onClick={onConfirmClick}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
