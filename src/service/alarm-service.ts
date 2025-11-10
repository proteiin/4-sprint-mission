import alarmRepository from "../repository/alarm-repository.js";

export class AlarmService {
  getAlarm = async (userId: number) => {
    return await alarmRepository.findManyAlarm(userId);
  };

  getUnreadAlramCount = async (userId: number) => {
    return await alarmRepository.getUnreadAlarmCount(userId);
  };

  checkAlarm = async (userId: number) => {
    return await alarmRepository.checkAlarm(userId);
  };

  createProductPriceAlarm = async (productOwnerId: number) => {
    const message = "내가 좋아요한 상품의 가격이 변경되었습니다";
    const userId = productOwnerId;
    const alaram = await alarmRepository.createAlarm({ userId, message });
    return alaram;
  };

  createArticleCommentAlarm = async (articleOwnerId: number) => {
    const message = "내가 판매 신청한 매물에 새로운 댓글이 달렸습니다";
    const userId = articleOwnerId;
    const alarm = await alarmRepository.createAlarm({ message, userId });
    return alarm;
  };
}

export default new AlarmService();
