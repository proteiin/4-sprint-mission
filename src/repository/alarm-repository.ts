import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma.js";

interface createAlarmDto {
  userId: number;
  message: string;
}

export class AlarmRepository {
  findManyAlarm = async (userId: number) => {
    try {
      const alrams = await prisma.alarm.findFirst({ where: { id: userId } });
      return alrams;
    } catch (error) {
      throw new Error("데이터베이스 에러 발생 ");
    }
  };

  getUnreadAlarmCount = async (userId: number) => {
    try {
      const unReadedAlramCount = await prisma.alarm.count({
        where: { readed: false, userId },
      });
      return unReadedAlramCount;
    } catch (error) {
      throw new Error(" 데이터베이스 에러 발생 ");
    }
  };

  checkAlarm = async (alarmId: number) => {
    try {
      const alrams = await prisma.alarm.update({
        where: { id: alarmId },
        data: { readed: true },
      });
      return alrams;
    } catch (error) {
      throw new Error("데이터베이스 에러 발생");
    }
  };

  createAlarm = async ({ userId, message }: createAlarmDto) => {
    try {
      const alarm = await prisma.alarm.create({
        data: {
          message,
          userId,
        },
      });
      return alarm;
    } catch (error) {
      throw new Error("데이터베이스 에러 발생");
    }
  };
}

export default new AlarmRepository();
