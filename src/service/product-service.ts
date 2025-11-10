import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma.js";

export class productService {
  getProducts = async (data: any) => {
    let { sort, skip, take, searchName, searchDescription } = data;
    let orderBy: Prisma.ProductOrderByWithRelationInput;

    skip = Number(skip);
    take = Number(skip);

    if (sort === "oldest") {
      orderBy = { createdAt: "desc" };
    } else if (sort == "recent") {
      orderBy = { createdAt: "asc" };
    } else {
      orderBy = { createdAt: "desc" };
    }

    const product = await prisma.product.findMany({
      skip,
      take,
      where: {
        AND: [
          searchName ? { name: { contains: searchName } } : undefined,
          searchDescription
            ? { content: { contains: searchDescription } }
            : undefined,
        ].filter(Boolean) as Prisma.ProductWhereInput,
      },
      orderBy,
    });
    return product;
  };

  addIsLiked = async (user: any, product: any) => {
    const productLikeList = user.productLike;
    const likedProductIds = [];
    for (const productLike of productLikeList) {
      let productId = productLike.productId;
      likedProductIds.push(productId);
    }

    const productId = Number(product.id);
    if (likedProductIds.includes(productId)) {
      product.isLiked = true;
    } else {
      product.isLiked = false;
    }
    return product;
  };
}

export default new productService();
