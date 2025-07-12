import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { api } from "~/convex/_generated/api";
import { convex, getConvexHttpClient } from "@/lib/convex";
import { utApi } from "@/lib/server";

const f = createUploadthing();

export const ourFileRouter = {
   storeLogoUploader: f({
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
               await utApi.deleteFiles([oldKey]);
            }

            return { uploadedBy: metadata.userId };
         } catch (err) {
            console.error("Failed to update Convex store image:", err);
            return {
               uploadedBy: metadata.userId,
               error: "storeImageUpdateFailed",
            };
         }
      }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
