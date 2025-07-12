import React, {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { UploadIconDuo } from "@/icons";
import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Gauge } from "../guage";
import { cn } from "@/lib/utils";

interface StoreLogoDropZoneProps {
  setIsDropZoneVisible: Dispatch<SetStateAction<boolean>>;
}

export default function StoreLogoDropZone({
  setIsDropZoneVisible,
}: StoreLogoDropZoneProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (isUploading) return;
    startUpload(acceptedFiles);
  }, []);

  const { startUpload, routeConfig, isUploading } = useUploadThing(
    "storeLogoUploader",
    {
      onUploadProgress(p) {
        setUploadProgress(p);
      },
      onClientUploadComplete: async () => {
        toast.success("Store Logo uploaded successfully!");
        setIsDropZoneVisible(false);
      },
      onUploadError: (err) => {
        toast.error(err.message);
      },
    },
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes,
    ),
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "text-muted-foreground group flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed py-3",
        isUploading && "pointer-events-none",
      )}
    >
      <Input
        {...getInputProps()}
        id="store-logo"
        type="file"
        accept="image/*"
        className="hidden"
      />

      {isUploading ? (
        <div className="grid gap-2">
          <Gauge
            size={50}
            primary={"oklch(0.623 0.214 259.815)"}
            strokeWidth={9}
            transition={{
              delay: 0.05,
              step: 3,
              length: 500,
            }}
            value={uploadProgress}
          />
        </div>
      ) : (
        <>
          <UploadIconDuo className="size-8" />
          <p className="text-xs">Click to select image</p>
          <p className="text-[10px]">Max file size: 2MB</p>
        </>
      )}
    </div>
  );
}
