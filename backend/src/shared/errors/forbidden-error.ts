class ForbiddenError extends Error {
  public statusCode: number;

  constructor(message: string = "Недостаточно прав для доступа к ресурсу") {
    super(message);
    this.statusCode = 403;
  }
}

export default ForbiddenError;
