import prisma from "../../lib/prisma.js";
import type { Request, Response, NextFunction } from "express";

interface User {
  id: number;
  password: string;
  image: string;
  email: string;
}

interface articleRequest extends Request {
  user?: any;
}

class LikeController {
  ArticleLike = async (
    req: articleRequest,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;
    let userId;
    if (user) {
      userId = Number(user.id);
    }

    const articleId = Number(req.params.id);

    if (!userId) {
      throw new Error("서버 에러 ");
    }
    const like = await prisma.articleLike.create({
      data: { userId, articleId },
    });
    return like;
  };

  ArticleDislike = async (
    req: articleRequest,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;
    if (!user) {
      throw new Error("유저가 존재하지 않습니다");
    }
    const userId = Number(user.id);
    const articleId = Number(req.params.id);
    const findedLike = await prisma.articleLike.findFirst({
      where: { userId, articleId },
    });
    if (findedLike) {
      await prisma.articleLike.delete({
        where: { id: findedLike.id },
      });
    }

    return "success";
  };

  ProductLike = async (
    req: articleRequest,
    res: Response,
    next: NextFunction
  ) => {
    let userId;
    if (req.user) {
      userId = Number(req.user.id);
    }

    const productId = Number(req.params.id);
    if (!userId) {
      throw new Error("서버 에러 발생");
    }
    const like = await prisma.productLike.create({
      data: { userId, productId },
    });
    return like;
  };

  ProductDislike = async (
    req: articleRequest,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;
    if (!user) {
      throw new Error("로그인이 필요합니다.");
    }
    const userId = Number(user.id);
    const productId = Number(req.params.id);
    const findLike = await prisma.productLike.findFirst({
      where: { userId, productId },
    });
    if (!findLike) {
      throw new Error("서버 에러 발생");
    }
    await prisma.productLike.delete({
      where: { id: findLike.id },
    });
    return "success";
  };
}

export default new LikeController();
