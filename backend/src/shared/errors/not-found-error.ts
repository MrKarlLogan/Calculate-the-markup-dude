class NotFoundError extends Error {
  public statusCode: number;

  constructor(message: string = "Запрашиваемый ресурс не был найден") {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
