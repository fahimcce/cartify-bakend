import { Request } from "express";
import { IFileResponse } from "../../interfaces/file";
import { fileUploader } from "../../../helpers/fileUploaders";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { IProductFilterRequest } from "./product.interface";
import { IpaginationType } from "../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { Prisma, Products } from "@prisma/client";
import { productFilterableFields } from "./product.contant";

const createProduct = async (req: Request) => {
  // console.log("Create PRoduct CLICK");
  const file = req.file as IFileResponse;

  const userData = await prisma.vendor.findUniqueOrThrow({
    where: { email: req.user?.email },
    include: {
      shop: true,
    },
  });

  console.log();
  req.body.shopId = userData.shop?.id;
  //Handle file upload
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.images = uploadToCloudinary?.secure_url;
  }

  const shopData = await prisma.shop.findUniqueOrThrow({
    where: { id: req.body.shopId },
  });

  if (!shopData) {
    throw new Error("Shop id is not valid");
  }
  // console.log(req.body);

  //Create the product
  const result = await prisma.products.create({
    data: {
      name: req.body.name,
      description: req.body.description,
      inventoryCount: req.body.inventoryCount,
      images: req.body.images,
      price: req.body.price,
      shopId: req.body.shopId,
    },
  });
  return result;
};

const duplicateProduct = async (id: string, req: Request) => {
  const payload = req.body;
  // Fetch the product by ID
  const product = await prisma.products.findUnique({
    where: { id },
  });
  console.log(product);
  if (!product) throw new Error("Product not found");
  // Create a duplicate product with updated or original data
  const newProduct = await prisma.products.create({
    data: {
      name: payload.name || product.name,
      images: product.images || null,
      description: payload.description || product.description,
      price: payload.price || product.price,
      inventoryCount: payload.inventoryCount || product.inventoryCount,
      discount: payload.discount || product.discount,
      shopId: payload.shopId || product.shopId,
    },
  });

  return newProduct;
};

const getAllProduct = async (
  params: IProductFilterRequest,
  options: IpaginationType
) => {
  // console.log(options);
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.ProductsWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: productFilterableFields.map((field) => ({
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

  const whereConditions: Prisma.ProductsWhereInput = {
    AND: andConditions,
  };

  const result = await prisma.products.findMany({
    where: whereConditions,
    include: { shop: true },
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

  const total = await prisma.products.count({
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

const getSingleProduct = async (id: string): Promise<Products | null> => {
  const result = await prisma.products.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      shop: true,
    },
  });
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await prisma.products.delete({
    where: { id },
  });
  return result;
};

const updateProduct = async (id: string, payload: any) => {
  const { categories, ...productData } = payload;
  // console.log("categories:", categories);
  // console.log("Product Data:", productData);

  const productInfo = await prisma.products.findUniqueOrThrow({
    where: { id },
  });

  await prisma.$transaction(async (transactionClient) => {
    const updateProduct = await transactionClient.products.update({
      where: { id },
      data: {
        ...productData,
      },
      include: {
        categories: true,
      },
    });

    if (categories && categories.length > 0) {
      const deleteFilterProduct = categories.filter(
        (category: any) => category.isDeleted
      );
      for (const categoryId of deleteFilterProduct) {
        await transactionClient.categories.deleteMany({
          where: {
            productId: productInfo.id,
            categoryId: categoryId.categoryId,
          },
        });
      }

      const createProductFilter = categories.filter(
        (category: any) => !category.isDeleted
      );
      for (const categoryId of createProductFilter) {
        await transactionClient.categories.create({
          data: {
            productId: productInfo.id,
            categoryId: categoryId.categoryId,
          },
        });
      }
    }
  });

  const result = await prisma.products.findUnique({
    where: {
      id: productInfo.id,
    },
    include: {
      categories: {
        include: {
          productCategory: true,
        },
      },
    },
  });

  return result;
};

export const productServices = {
  createProduct,
  duplicateProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
