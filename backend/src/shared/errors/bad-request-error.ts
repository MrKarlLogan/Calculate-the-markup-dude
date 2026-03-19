// Неверный JSON, пропущены поля, некорректные данные

class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);

    this.statusCode = 400;
  }
}

export default BadRequestError;
