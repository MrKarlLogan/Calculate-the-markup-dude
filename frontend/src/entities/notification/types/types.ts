export type TNotification = {
  id: string;
  author: string;
  message: string;
  created: string;
};

export type TNotificationState = {
  messages: TNotification[];
  loading: boolean;
  error: string | null;
};

export type TNotificationRequest = Omit<TNotification, "id" | "created">;

export type TNotificationResponse = {
  success: boolean;
  data: TNotification[];
};

export type TNotificationDeleteResponse = {
  success: boolean;
  message: string;
};

export type TValidationError = {
  statusCode: number;
  error: string;
  message: string;
  validation: {
    body: {
      source: string;
      keys: string[];
      message: string;
    };
  };
};

export type TNotificationCreateResponse = {
  success: boolean;
  data?: TNotification;
  message?: string;
  validation?: TValidationError["validation"];
};

export type TNotificationUpdateResponse = {
  success: boolean;
  data?: TNotification;
  message?: string;
  validation?: TValidationError["validation"];
};
