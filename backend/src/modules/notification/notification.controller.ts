import { type NextFunction, type Request, type Response } from "express";
import { NotificationRepository } from "@/data-source";
import { INotification } from "./notification.types";
import { NOTIFICATION_OPTIONS } from "@shared/constants";
import InternalServerError from "@shared/errors/internal-server-error";
import NotFoundError from "@shared/errors/not-found-error";

export const findNotifications = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const notifications = await NotificationRepository.find();

    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    next(new InternalServerError("Ошибка при получении сообщения"));
  }
};

export const createNotification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const message: Omit<INotification, "id"> = req.body;
    const newMessage = NotificationRepository.create(message);
    const savedMessage = await NotificationRepository.save(newMessage);

    const notifications = await NotificationRepository.find({
      order: { created: "ASC" },
    });

    if (notifications.length > NOTIFICATION_OPTIONS.MAX_LENGTH) {
      const excessCount =
        notifications.length - NOTIFICATION_OPTIONS.MAX_LENGTH;
      const elementsToDelete = notifications.slice(0, excessCount);

      if (elementsToDelete.length > 0)
        await NotificationRepository.delete(
          elementsToDelete.map((element) => element.id),
        );
    }

    res.status(201).json({
      success: true,
      data: savedMessage,
      message: "Сообщение успешно создано",
    });
  } catch (error) {
    next(new InternalServerError("Произошла ошибка при создании сообщения"));
  }
};

export const updateNotification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: Omit<INotification, "id"> = req.body;
    const id = req.params.id.toString();
    const updateNotification = await NotificationRepository.findOne({
      where: { id },
    });

    if (!updateNotification)
      return next(new NotFoundError(`Сообщение с id: ${id} не найдено`));

    updateNotification.message = data.message;

    await NotificationRepository.save(updateNotification);

    res.status(200).json({
      success: true,
      data: updateNotification,
      message: `Сообщение с id ${id} успешно обновлено`,
    });
  } catch (error) {
    next(
      new InternalServerError(
        `Ошибка при обновлении сообщения с id: ${req.params.id}`,
      ),
    );
  }
};

export const deleteNotification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id.toString();
    const result = await NotificationRepository.delete(id);

    if (result.affected === 0)
      return next(new NotFoundError(`Сообщение с id: ${id} не найдено`));

    res.status(200).json({
      success: true,
      message: `Сообщение с id ${id} успешно удалено`,
    });
  } catch (error) {
    next(
      new InternalServerError(
        `Ошибка при удалении сообщения с id: ${req.params.id}`,
      ),
    );
  }
};
