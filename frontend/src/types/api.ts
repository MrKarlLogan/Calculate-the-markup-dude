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

export type TApiError = {
  message: string;
  validation?: TValidationError["validation"];
};

export type PossibleError = Partial<TValidationError> & {
  message?: string;
};
