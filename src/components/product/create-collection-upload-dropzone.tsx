"use client";

import { TrashIconDuo, UploadIconDuo } from "@/icons";
import { useDropzone } from "@uploadthing/react";
import { useCallback, type Dispatch, type SetStateAction } from "react";
import { Label } from "../ui/label";

interface CreateCollectionUploadDropzoneProps {
   setSelectedFile: Dispatch<SetStateAction<File | null>>;
   selectedFile: File | null;
   isFormSubmitting: boolean;
}

export default function CreateCollectionUploadDropzone({
   selectedFile,
   setSelectedFile,
   isFormSubmitting,
}: CreateCollectionUploadDropzoneProps) {
   const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setSelectedFile(file);
   }, []);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      multiple: false,
      accept: {
         "image/*": [".jpg", ".jpeg", ".png", ".webp"],
      },
      maxSize: 2 * 1024 * 1024,
   });

   return (
      <div className="grid gap-3">
         <Label className="text-muted-foreground">Collection Image</Label>
         {selectedFile ? (
            <div className="flex items-center gap-4 rounded-xl">
               <div className="size-28 rounded-full overflow-hidden">
                  <img
                     src={URL.createObjectURL(selectedFile)}
                     className="w-full h-full object-cover"
                  />
               </div>
               <button
                  onClick={() => setSelectedFile(null)}
                  disabled={isFormSubmitting}
                  className="size-8 rounded-lg grid place-items-center bg-destructive/10 text-destructive cursor-pointer disabled:opacity-65 disabled:cursor-not-allowed"
               >
                  <TrashIconDuo className="size-4" />
               </button>
            </div>
         ) : (
            <div
               {...getRootProps()}
               className="flex items-center justify-center flex-col w-full py-6 bg-secondary text-muted-foreground text-sm rounded-lg border border-dashed cursor-pointer hover:bg-accent transition-all"
            >
               <input {...getInputProps()} />
               <UploadIconDuo />
               <p>
                  {isDragActive
                     ? "Drop the file here..."
                     : "Click or drag to upload image"}
               </p>
               <p className="text-xs">Max file size: 2MB</p>
            </div>
         )}
      </div>
   );
}
