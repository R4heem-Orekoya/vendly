import z from "zod";
import { f } from "..";
import { convex, getConvexHttpClient } from "@/lib/convex";
import { UploadThingError } from "uploadthing/server";
import { api } from "~/convex/_generated/api";
import type { Id } from "~/convex/_generated/dataModel";

export const productImagesUploader = f({
   image: {
      maxFileSize: "4MB",
      maxFileCount: 16,
   },
})
   .input(
      z.object({
         productId: z.string(),
      })
   )
   .middleware(async ({ input }) => {
      const convex = await getConvexHttpClient();
      const user = await convex.query(api.users.current);

      if (!user || !user._id) throw new UploadThingError("Unauthorized");

      return { userId: user._id, productId: input.productId };
   })
   .onUploadComplete(async ({ file, metadata }) => {
      try {
         await convex.mutation(api.products.addImage, {
            productId: metadata.productId as Id<"products">,
            image: {
               name: file.name,
               key: file.key,
               url: file.ufsUrl,
               size: file.size,
               hash: file.fileHash,
            },
         });

         return { uploadedBy: metadata.userId };
      } catch (error) {
         console.error("Failed to update Convex store image:", error);
         return {
            uploadedBy: metadata.userId,
            error: "productImageUpdateFailed",
         };
      }
   });
