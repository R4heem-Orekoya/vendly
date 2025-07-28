import { convex, getConvexHttpClient } from "@/lib/convex";
import { f, utApi } from "..";
import { api } from "~/convex/_generated/api";
import { UploadThingError } from "uploadthing/server";

export const storeLogoUploader = f({
   image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
   },
})
   .middleware(async () => {
      const convex = await getConvexHttpClient();
      const user = await convex.query(api.users.current);

      if (!user || !user._id) throw new UploadThingError("Unauthorized");

      if (!user.storeId) throw new UploadThingError("No store");

      return { userId: user._id, storeId: user.storeId };
   })
   .onUploadComplete(async ({ metadata, file }) => {
      try {
         const { oldKey } = await convex.mutation(api.stores.updateImage, {
            storeId: metadata.storeId,
            url: file.ufsUrl,
            key: file.key,
         });

         if (oldKey) {
            void utApi.deleteFiles([oldKey]);
         }

         return { uploadedBy: metadata.userId };
      } catch (err) {
         console.error("Failed to update Convex store image:", err);
         return {
            uploadedBy: metadata.userId,
            error: "storeImageUpdateFailed",
         };
      }
   });
