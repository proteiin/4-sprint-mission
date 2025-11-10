import express from "express";
import prisma from "../../lib/prisma";
import AlarmService from "../service/alarm-service";
import type { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { User } from "@prisma/client";
import { RequestHandler } from "express";
import alarmService from "../service/alarm-service";
import articleService from "../service/article-service";

interface AlarmRequest extends Request {
  user?: any;
}

export class alarmController {
  getAlarmList: RequestHandler = async (
    req: AlarmRequest,
    res: Response,
    next: NextFunction
  ) => {
    //대충 코드
    const user = req.user;
    if (!user) {
      throw new Error("로그인이 필요합니다");
    }
    const userId = Number(user.id);

    const alrams = await alarmService.getAlarm;
    return res.status(200).send(alrams);
  };

  getUnreadAlarmCount: RequestHandler = async (
    req: AlarmRequest,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;
    if (!user) {
      throw new Error("로그인이 필요합니다");
    }
    const userId = Number(user.id);

    try {
      const unReadedAlramCount = alarmService.getUnreadAlramCount;
      return res.status(200).send(unReadedAlramCount);
    } catch (error) {
      throw new Error(" 데이터베이스 에러 발생 ");
    }
  };

  checkAlarm = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      throw new Error("로그인이 필요합니다");
    }

    const alarmId = Number(req.params.alarmId);

    try {
      const alrams = await alarmService.checkAlarm;
      return res.send(" 알람 상태 변경 완료 ");
    } catch (error) {
      throw new Error(" 데이터베이스 에러 발생 ");
    }
  };

  //좋아요한 상품 가격 변경 알림
  sendProductPriceAlarm = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const productId = await Number(req.params.productId);
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product || !productId) {
      throw new Error("상품을 찾을 수 없습니다.");
    }
    const productOwnerId = product.userId;

    const alarm = await alarmService.createProductPriceAlarm(productOwnerId);

    return res.send(alarm);
  };

  //게시글 댓글 알림
  sendArticleCommentAlarm = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const articleId = await Number(req.params.articleId);
    const article = await prisma.article.findFirst({
      where: { id: articleId },
    });
    if (!article || !articleId) {
      throw new Error("게시글을 찾을 수 없습니다");
    }
    const articleOwnerId = article.userId;

    const alarm = await alarmService.createArticleCommentAlarm(articleOwnerId);
    return res.send(alarm);
  };
}
export default new alarmController();
