import type { PropsWithChildren, ReactNode } from 'react';

import { Button, TButtonProps } from '@shared/design-system/ui/button';
import { CardTitle } from '@shared/design-system/ui/card';
import { TIcons } from '@shared/design-system/ui/icon';
import IconButton from '@shared/design-system/ui/icon-button';
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
      <div className="m-auto w-full h-full md:h-auto md:w-2/3 bg-background rounded-xl p-4 md:p-6 flex flex-col space-y-4">
        <div>
          {onClose && (
            <div className="text-right">
              <IconButton icon="circle-x" variant="ghost" size="icon" onClick={onClose} />
            </div>
          )}
          <CardTitle icon={icon}>{title}</CardTitle>
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
