import { type FileRouter } from "uploadthing/next";
import { storeLogoUploader } from "@/uploadthing/routers/store-logo";
import { collectionImageUploader } from "@/uploadthing/routers/collection-image";
import { productImagesUploader } from "@/uploadthing/routers/product-images";
import { productFileUploader } from "@/uploadthing/routers/product-file";

export const ourFileRouter = {
   storeLogoUploader,
   collectionImageUploader,
   productImagesUploader,
   productFileUploader
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;