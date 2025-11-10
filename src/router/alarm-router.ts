import express from "express";

import alarmController from "../controller/alarm-controller.js";

import { checkAuthenticated } from "../../middleware/auth-middleware.js";

import passport from "passport";

const AlarmRouter = express.Router();

//알람 목록 조회
AlarmRouter.get("/me", checkAuthenticated, alarmController.getAlarmList);
//안읽은 알람 개수
AlarmRouter.get(
  "/me/unRead",
  checkAuthenticated,
  alarmController.getUnreadAlarmCount
);
//알람 읽음 처리
AlarmRouter.post(
  "/:alarmId/check",
  checkAuthenticated,
  alarmController.checkAlarm
);

//알림 전송
AlarmRouter.post("/me/:alarmId", checkAuthenticated, alarmController.sendAlarm);
