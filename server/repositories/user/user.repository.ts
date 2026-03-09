import { User } from "@prisma/client";
import prisma from "../../config/prisma.config";
import { CreateUserInput } from "../../utils/types/common.types";

const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

const insertUser = async (user: CreateUserInput): Promise<User | null> => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        provider: user.provider,
        ...(user.imageUrl !== undefined && { imageUrl: user.imageUrl }),
        ...(user.role !== undefined && { role: user.role }),
        ...(user.createdAt !== undefined && { createdAt: user.createdAt }),
        ...(user.updatedAt !== undefined && { updatedAt: user.updatedAt }),
      },
    });

    return newUser;
  } catch (err) {
    throw err;
  }
};

export { findUserByEmail, insertUser };
