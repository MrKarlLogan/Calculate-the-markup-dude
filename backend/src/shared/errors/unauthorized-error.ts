class UnauthorizedError extends Error {
  public statusCode: number;

  constructor(message: string = "Ошибка авторизации") {
    super(message);
    this.statusCode = 401;
  }
}

export default UnauthorizedError;
