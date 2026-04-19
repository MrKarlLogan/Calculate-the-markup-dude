import { TNotification } from "@/entities/notification/types/types";

export type TNotificationMessage = {
  notification?: TNotification;
  isEdit?: boolean;
  isCreated?: boolean;
  showFn: {
    modal: (
      text: string,
      positiveAnswer?: string,
      negativeAnswer?: string,
    ) => Promise<boolean>;
    toast: (text: string) => void;
  };
};
