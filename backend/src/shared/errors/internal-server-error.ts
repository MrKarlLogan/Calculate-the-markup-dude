class InternalServerError extends Error {
  public statusCode: number;

  constructor(message: string = "Внутренняя ошибка сервера") {
    super(message);
    this.statusCode = 500;
  }
}

export default InternalServerError;
