import { createUploadthing } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

export const f = createUploadthing();
export const utApi = new UTApi({
   token: process.env.UPLOADTHING_TOKEN,
});