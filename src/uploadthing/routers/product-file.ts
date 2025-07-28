import z from "zod";
import { f, utApi } from "..";
import { convex, getConvexHttpClient } from "@/lib/convex";
import { api } from "~/convex/_generated/api";
import { UploadThingError } from "uploadthing/server";
import type { Id } from "~/convex/_generated/dataModel";

export const productFileUploader = f({
   "application/zip": {
      maxFileSize: "128MB",
      maxFileCount: 1,
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
         const { oldKey } = await convex.mutation(
            api.products.updateDigitalFile,
            {
               productId: metadata.productId as Id<"products">,
               file: {
                  key: file.key,
                  name: file.name,
                  size: file.size,
                  url: file.ufsUrl,
               },
            }
         );

         if (oldKey) {
            void utApi.deleteFiles([oldKey]);
         }

         return { uploadedBy: metadata.userId };
      } catch (error) {
         console.log("Failed to update Convex collection image:", error);
         return {
            uploadedBy: metadata.userId,
            error: "productFileUpdateFailed",
         };
      }
   });
