"use client";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import StoreLogoDropZone from "./store-logo-dropzone";
import { useState } from "react";

interface EditStoreLogoProps {
  storeImage: string | undefined;
}

export default function EditStoreLogo({ storeImage }: EditStoreLogoProps) {
  const [isDropZoneVisible, setIsDropZoneVisible] = useState(!!!storeImage);

  return (
    <div className="grid grid-cols-1 gap-4 border-b border-dashed py-4 md:grid-cols-3">
      <Label
        htmlFor="store-logo"
        className="text-muted-foreground shrink-0 text-xs"
      >
        Upload Store Logo
      </Label>
      {isDropZoneVisible ? (
        <div className="col-span-2">
          <StoreLogoDropZone setIsDropZoneVisible={setIsDropZoneVisible} />
        </div>
      ) : (
        <div className="col-span-2 flex items-center justify-between">
          <div className="size-16 overflow-hidden rounded-full border p-1">
            <img
              src={storeImage}
              alt="store image"
              className="size-full rounded-full object-cover shadow-sm"
            />
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsDropZoneVisible(true)}
          >
            Upload
          </Button>
        </div>
      )}
    </div>
  );
}
