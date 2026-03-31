import { type NextFunction, type Request, type Response } from "express";
import { IPriceAgreement, TResponseAgreement } from "./priceAgreement.types";
import { AgreementRepository } from "@/data-source";
import { notifyAdmins, notifyUser } from "@socket/socket.notifications";
import {
  AGREEMENT_OPTIONS,
  USER_ROLES,
  WEBSOCKET_EVENT_NAME,
} from "@shared/constants";
import InternalServerError from "@shared/errors/internal-server-error";
import NotFoundError from "@shared/errors/not-found-error";
import { TUserPayload } from "@shared/utils/auth";
import ForbiddenError from "@shared/errors/forbidden-error";

export const findPriceAgreements = async (
  req: Request & { user?: TUserPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user)
      return next(new ForbiddenError("Отсутствуют необходимые права доступа"));

    let agreements;

    if (req.user.role === USER_ROLES.ADMIN)
      agreements = await AgreementRepository.find();
    else
      agreements = await AgreementRepository.find({
        where: { userId: req.user.id },
      });

    res.status(200).json({
      success: true,
      data: agreements,
    });
  } catch (error) {
    next(
      new InternalServerError(
        "Ошибка при получении списка согласований стоимости",
      ),
    );
  }
};

export const findPriceAgreementById = async (
  req: Request & { user?: TUserPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user)
      return next(new ForbiddenError("Отсутствуют необходимые права доступа"));

    const id = req.params.id.toString();
    const agreement = await AgreementRepository.findOne({ where: { id } });

    if (!agreement)
      return next(
        new NotFoundError(`Согласование стоимости с id: ${id} не найдено`),
      );

    if (req.user.role !== USER_ROLES.ADMIN && agreement.userId !== req.user.id)
      return next(new ForbiddenError("Отсутствуют необходимые права доступа"));

    res.status(200).json({
      success: true,
      data: agreement,
    });
  } catch (error) {
    next(
      new InternalServerError(
        `Ошибка при получении согласования стоимости с id: ${req.params.id}`,
      ),
    );
  }
};

export const createPriceAgreement = async (
  req: Request & { user?: TUserPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user)
      return next(new ForbiddenError("Отсутствуют необходимые права доступа"));

    const data: Omit<IPriceAgreement, "id"> = req.body;
    data.userId = req.user.id;

    const newAgreement = AgreementRepository.create(data);
    const savedAgreement = await AgreementRepository.save(newAgreement);

    const agreements = await AgreementRepository.find({
      order: { created: "ASC" },
    });

    if (agreements.length > AGREEMENT_OPTIONS.MAX_LENGTH) {
      const excessCount = agreements.length - AGREEMENT_OPTIONS.MAX_LENGTH;
      const elementsToDelete = agreements.slice(0, excessCount);

      if (elementsToDelete.length > 0)
        await AgreementRepository.delete(
          elementsToDelete.map((element) => element.id),
        );
    }

    // TODO: Когда будет фронт, проверить передаваемые данные. Провести оптимизацию
    notifyAdmins(WEBSOCKET_EVENT_NAME.CREATED, savedAgreement);

    res.status(201).json({
      success: true,
      data: savedAgreement,
      message: "Согласование стоимости успешно создано",
    });
  } catch (error) {
    next(
      new InternalServerError(
        "Произошла ошибка при создании согласования стоимости",
      ),
    );
  }
};

export const updatePriceAgreements = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id.toString();
    const { isAgreed, responseMessage }: TResponseAgreement = req.body;
    const updateAgreement = await AgreementRepository.findOne({
      where: { id },
    });

    if (!updateAgreement)
      return next(
        new NotFoundError(`Согласование стоимости с id: ${id} не найдено`),
      );

    updateAgreement.isAgreed = isAgreed;
    updateAgreement.responseMessage = responseMessage || null;

    await AgreementRepository.save(updateAgreement);

    // TODO: Когда будет фронт, проверить передаваемые данные. Провести оптимизацию
    notifyUser(
      updateAgreement.userId,
      WEBSOCKET_EVENT_NAME.UPDATED,
      updateAgreement,
    );

    res.status(200).json({
      success: true,
      data: updateAgreement,
      message: `Согласование стоимости с id ${id}: ${updateAgreement.isAgreed ? "согласовано" : "не согласовано"}`,
    });
  } catch (error) {
    next(
      new InternalServerError(
        `Ошибка при обновлении согласования стоимости с id: ${req.params.id}`,
      ),
    );
  }
};

export const deletePriceAgreements = async (
  req: Request & { user?: TUserPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user)
      return next(new ForbiddenError("Отсутствуют необходимые права доступа"));

    const id = req.params.id.toString();
    const deletedAgreement = await AgreementRepository.findOne({
      where: { id },
    });

    if (!deletedAgreement)
      return next(
        new NotFoundError(`Согласование стоимости с id: ${id} не найдено`),
      );

    if (
      req.user.role !== USER_ROLES.ADMIN &&
      deletedAgreement.userId !== req.user.id
    ) {
      return next(new ForbiddenError("Отсутствуют необходимые права доступа"));
    }

    await AgreementRepository.remove(deletedAgreement);

    // TODO: Когда будет фронт, проверить передаваемые данные. Провести оптимизацию
    notifyAdmins(WEBSOCKET_EVENT_NAME.DELETED, deletedAgreement);
    notifyUser(
      deletedAgreement.userId,
      WEBSOCKET_EVENT_NAME.DELETED,
      deletedAgreement,
    );

    res.status(200).json({
      success: true,
      message: `Согласование стоимости с id ${id} успешно удалено`,
    });
  } catch (error) {
    next(
      new InternalServerError(
        `Ошибка при удалении согласования стоимости с id: ${req.params.id}`,
      ),
    );
  }
};
