import type { PropsWithChildren } from 'react';

import Portal from '../portal';
import IconButton from '../icon-button';
import Button from '@shared/design-system/button';

type TModalProps = PropsWithChildren & {
  open: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onCancelClick?: () => void;
  onConfirmClick?: () => void;
};
const Modal = ({
  children,
  open,
  title,
  cancelText = 'Voltar',
  confirmText = 'Confirmar',
  onClose,
  onCancelClick,
  onConfirmClick,
}: TModalProps) => {
  return (
    <Portal open={open}>
      <div className="relative m-auto w-full h-full md:h-5/6 md:w-2/3 md:top-10 bg-neutral-800 rounded-xl p-4 flex flex-col">
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
        <div className="text-right space-x-4 pt-2">
          {onCancelClick && (
            <Button color="secondary" onClick={onCancelClick}>
              {cancelText}
            </Button>
          )}
          {onConfirmClick && <Button onClick={onConfirmClick}>{confirmText}</Button>}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
