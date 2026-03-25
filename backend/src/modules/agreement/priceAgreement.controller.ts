import { type NextFunction, type Request, type Response } from "express";
import { notifyAdmins, notifyUser } from "@/socket";
import { IPriceAgreement, TResponseAgreement } from "./priceAgreement.types";
import { AgreementRepository } from "@/data-source";
import { AGREEMENT_OPTIONS } from "@/shared/constants";
import InternalServerError from "@/shared/errors/internal-server-error";
import NotFoundError from "@/shared/errors/not-found-error";

export const findPriceAgreements = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // TODO: Добавить получение данных под разные роли после реализации авторизации
    const agreements = await AgreementRepository.find();

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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id.toString();
    const agreement = await AgreementRepository.findOne({ where: { id } });

    if (!agreement)
      return next(
        new NotFoundError(`Согласование стоимости с id: ${id} не найдено`),
      );

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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: IPriceAgreement = req.body;

    // TODO: Временная заглушка пока нет JWT. Нужно поменять на userId пользователя из БД при условии успешной авторизации. Из req.user.id
    data.userId = "a4e93ee2-275e-46f1-b40a-52400114b550";

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
    notifyAdmins("agreement:created", savedAgreement);

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
    notifyUser(updateAgreement.userId, "agreement:updated", updateAgreement);

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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id.toString();
    const deletedAgreement = await AgreementRepository.findOne({
      where: { id },
    });

    if (!deletedAgreement)
      return next(
        new NotFoundError(`Согласование стоимости с id: ${id} не найдено`),
      );

    await AgreementRepository.remove(deletedAgreement);

    // TODO: Когда будет фронт, проверить передаваемые данные. Провести оптимизацию
    notifyAdmins("agreement:deleted", deletedAgreement);
    notifyUser(deletedAgreement.userId, "agreement:deleted", deletedAgreement);

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
