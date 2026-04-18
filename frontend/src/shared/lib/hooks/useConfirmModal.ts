import { useCallback, useState } from "react";

type TConfirmModalState = {
  text: string;
  positiveAnswer?: string;
  negativeAnswer?: string;
  resolve?: (value: boolean) => void;
};

const useConfirmModal = () => {
  const [modalState, setModalState] = useState<TConfirmModalState | null>(null);

  const showConfirm = useCallback(
    (text: string, positiveAnswer?: string, negativeAnswer?: string): Promise<boolean> => {
      return new Promise((resolve) => {
        setModalState({
          text,
          positiveAnswer,
          negativeAnswer,
          resolve,
        });
      });
    },
    []
  );

  const handleConfirm = useCallback(() => {
    if (modalState?.resolve) {
      modalState.resolve(true);
      setModalState(null);
    }
  }, [modalState]);

  const handleCancel = useCallback(() => {
    if (modalState?.resolve) {
      modalState.resolve(false);
      setModalState(null);
    }
  }, [modalState]);

  const handleClose = useCallback(() => {
    if (modalState?.resolve) {
      modalState.resolve(false);
      setModalState(null);
    }
  }, [modalState]);

  return {
    showConfirm,
    modal: modalState,
    handleConfirm,
    handleCancel,
    handleClose,
  };
};

export default useConfirmModal;