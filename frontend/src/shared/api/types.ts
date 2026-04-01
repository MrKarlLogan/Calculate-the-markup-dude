export interface ISuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface IValidationError {
  source: string;
  keys: string[];
  message: string;
}

export interface ICelebrateError {
  statusCode: number;
  error: string;
  message: string;
  validation: {
    body: IValidationError;
  };
}

export interface IErrorResponse {
  success: false;
  message: string;
  statusCode?: number;
  validation?: {
    body: IValidationError;
  };
}

export interface IAuthData {
  id: string;
  login: string;
  name: string;
  role: "admin" | "others";
}

export type TRegisterResponse = ISuccessResponse<IAuthData> | IErrorResponse;
export type TLoginResponse = ISuccessResponse<IAuthData> | IErrorResponse;
export type TCheckAuthResponse = ISuccessResponse<IAuthData> | IErrorResponse;
export type TRefreshResponse = ISuccessResponse<null> | IErrorResponse;
export type TLogoutResponse = ISuccessResponse<null> | IErrorResponse;
export type TApiResponse<T> = ISuccessResponse<T> | IErrorResponse;
