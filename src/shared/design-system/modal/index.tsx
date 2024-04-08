import type { PropsWithChildren, ReactNode } from 'react';

import Button, { TButtonProps } from '@shared/design-system/button';

import IconButton from '../icon-button';
import Portal from '../portal';

type TModalProps = PropsWithChildren & {
  open: boolean;
  title?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: TButtonProps['color'];
  cancelColor?: TButtonProps['color'];
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
  confirmColor = 'primary',
  cancelColor = 'secondary',
  onCancelClick,
  onConfirmClick,
  onClose,
}: TModalProps) => {
  return (
    <Portal open={open}>
      <div className="m-auto w-full h-full md:h-auto md:w-2/3 bg-neutral-800 rounded-xl p-4 md:p-6 flex flex-col space-y-4">
        <div>
          {onClose && (
            <div className="text-right">
              <IconButton
                icon="CloseCircleIcon"
                onClick={onClose}
                iconProps={{ width: 25, height: 25 }}
              />
            </div>
          )}
          <h2 className="font-semibold">{title}</h2>
        </div>
        <div className="overflow-auto">{children}</div>
        <div className="text-right space-x-4 ">
          {onCancelClick && (
            <Button color={cancelColor} onClick={onCancelClick}>
              {cancelText}
            </Button>
          )}
          {onConfirmClick && (
            <Button color={confirmColor} onClick={onConfirmClick}>
              {confirmText}
            </Button>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
