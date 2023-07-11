import { Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/database/PrismaService";

@Injectable()
export class UserAccountRepository {
  constructor(private prismaClient: PrismaService) {}

  public async getUserAccountByEmail(email: string) {
    return await this.prismaClient.user_account.findUnique({
      where: { email },
    });
  }

  public async createAccount(user: UserAccount) {
    await this.prismaClient.user_account.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
      include: { project: false, todo: false },
    });
  }

  public async getUserDetailsById(id: number) {
    return await this.prismaClient.user_account.findUnique({
      where: { id },
      include: { project: false, todo: false },
    });
  }

  public async getUserProjects(email: string) {
    return await this.prismaClient.user_account.findUnique({
      where: { email },
      include: { project: false, todo: false },
    });
  }
}
