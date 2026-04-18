export type IConfirmModal = {
  text: string;
  positiveAnswer?: string;
  negativeAnswer?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
};
