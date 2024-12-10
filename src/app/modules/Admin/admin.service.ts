import { Admin, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IpaginationType } from "../../interfaces/pagination";
import { IAdminFilterRequest } from "./admin.interfaces";
import { adminSearchableFields } from "./admin.constant";
import prisma from "../../../shared/prisma";

const getAllAdminFromDB = async (
  params: IAdminFilterRequest,
  options: IpaginationType
) => {
  // console.log(options);
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.AdminWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.AdminWhereInput = {
    AND: andConditions,
  };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// const getSingleAdminFromDB = async (id: string): Promise<Admin | null> => {
//   const result = await prisma.admin.findUnique({
//     where: {
//       id,
//       isDeleted: false,
//     },
//   });
//   return result;
// };

const updateAdminToDb = async (
  id: string,
  data: Partial<Admin>
): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: { id, isDeleted: false },
  });

  const result = await prisma.admin.update({
    where: { id },
    data,
  });
  return result;
};

// const deleteAdminFromDb = async (id: string): Promise<Admin | null> => {
//   await prisma.admin.findUniqueOrThrow({
//     where: { id },
//   });

//   const result = await prisma.$transaction(async (transactionClient) => {
//     const deleteFromAdmin = await transactionClient.admin.delete({
//       where: { id },
//     });

//     await transactionClient.user.delete({
//       where: {
//         email: deleteFromAdmin.email,
//       },
//     });

//     return deleteFromAdmin;
//   });
//   return result;
// };

// const softDeleteAdminFromDb = async (id: string): Promise<Admin | null> => {
//   await prisma.admin.findUniqueOrThrow({
//     where: { id, isDeleted: false },
//   });

//   const result = await prisma.$transaction(async (transactionClient) => {
//     const deleteFromAdmin = await transactionClient.admin.update({
//       where: { id },
//       data: {
//         isDeleted: true,
//       },
//     });

//     await transactionClient.user.update({
//       where: {
//         email: deleteFromAdmin.email,
//       },
//       data: {
//         status: UserStatus.DELETED,
//       },
//     });

//     return deleteFromAdmin;
//   });
//   return result;
// };

export const adminService = {
  getAllAdminFromDB,
  //   getSingleAdminFromDB,
  updateAdminToDb,
  //   deleteAdminFromDb,
  //   softDeleteAdminFromDb,
};
