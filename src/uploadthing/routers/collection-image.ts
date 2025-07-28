import z from "zod";
import { f, utApi } from "..";
import { convex, getConvexHttpClient } from "@/lib/convex";
import { api } from "~/convex/_generated/api";
import { UploadThingError } from "uploadthing/server";
import type { Id } from "~/convex/_generated/dataModel";

export const collectionImageUploader = f({
   image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
   },
})
   .input(
      z.object({
         collectionId: z.string(),
      })
   )
   .middleware(async ({ input }) => {
      const convex = await getConvexHttpClient();
      const user = await convex.query(api.users.current);

      if (!user || !user._id) throw new UploadThingError("Unauthorized");

      return { userId: user._id, collectionId: input.collectionId };
   })
   .onUploadComplete(async ({ file, metadata }) => {
      try {
         const { oldKey } = await convex.mutation(api.collections.updateImage, {
            collectionId: metadata.collectionId as Id<"collections">,
            url: file.ufsUrl,
            key: file.key,
         });

         if (oldKey) {
            void utApi.deleteFiles([oldKey]);
         }

         return { uploadedBy: metadata.userId };
      } catch (err) {
         console.error("Failed to update Convex collection image:", err);
         return {
            uploadedBy: metadata.userId,
            error: "collectionImageUpdateFailed",
         };
      }
   });
