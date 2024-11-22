import { prisma } from "@/prisma-client";
import jwt from "jsonwebtoken";

export const tokenService = {
  generateToken(payload: object) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return { accessToken, refreshToken };
  },

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await prisma.refreshToken.findFirst({
      where: { userId },
    });

    if (tokenData) {
      tokenData.token = refreshToken;
      return prisma.refreshToken.update({
        where: { id: tokenData.id },
        data: tokenData,
      });
    }

    const token = await prisma.refreshToken.create({
      data: { token: refreshToken, userId },
    });

    return token;
  },

  async removeToken(token: string) {
    return await prisma.refreshToken.delete({ where: { token } });
  },

  async findToken(token: string) {
    return await prisma.refreshToken.findFirst({ where: { token } });
  },

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
      return userData
    } catch (e) {
      return null;
    }
  },

  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
      return userData
    } catch (e) {
      return null;
    }
  }
};
