import express from "express";
import prisma from "../../lib/prisma";
import AlarmService from "../service/alarm-service";
import type { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { User } from "@prisma/client";
import { RequestHandler } from "express";

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
    const userId = user.id;

    const alrams = await prisma.alarm.findMany({ where: { userId } });
    return res.send(alrams);
  };

  getUnreadAlarmCount: RequestHandler = async (
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
    try {
      const unReadedAlramCount = await prisma.alarm.count({
        where: { readed: false, userId },
      });
      return res.send(unReadedAlramCount);
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
      const alrams = await prisma.alarm.update({
        where: { id: alarmId },
        data: { readed: true },
      });
      return res.send(" 알람 상태 변경 완료 ");
    } catch (error) {
      throw new Error(" 데이터베이스 에러 발생 ");
    }
  };

  sendAlarm = async (req: Request, res: Response, next: NextFunction) => {
    const alarm;
  };
}
export default new alarmController();
