import { UserRole } from "@prisma/client";

export type IAuthUser = {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
  id: string;
  profilePhoto?: string;
} | null;
