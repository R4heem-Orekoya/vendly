"use client";

import CreateProductForm from "@/components/product/create-product-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
   ProductFormProvider,
   useProductFormContext,
} from "@/context/product-form-context";
import { PlusIcon, Spinner } from "@/icons";
import type { productTypesType } from "@/lib/consts";
import { useUploadThing } from "@/lib/uploadthing";
import { productSchema, type ProductSchemaType } from "@/validators/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "~/convex/_generated/api";

export default function Page() {
   return (
      <ProductFormProvider>
         <NewProductForm />
      </ProductFormProvider>
   );
}

function NewProductForm() {
   const router = useRouter()
   const { selectedMedia, selectedProductFiles } = useProductFormContext();
   const form = useForm<ProductSchemaType>({
      resolver: zodResolver(productSchema),
   });

   const productType = form.watch("type") as productTypesType;

   const createProduct = useMutation(api.products.create);
   
   const { startUpload: uploadProductImages } = useUploadThing(
      "productImagesUploader"
   );
   const { startUpload: uploadProductFile } = useUploadThing(
      "productFileUploader"
   );

   async function onSubmit(data: ProductSchemaType) {
      router.prefetch("/dashboard/products");
      
      if (productType === "digital_product" && !selectedProductFiles?.length) {
         toast.error(
            "You've selected 'Digital Product', please upload at least one .zip file for customers to download."
         );
         return;
      }

      try {
         const productId = await createProduct({
            name: data.name,
            description: data.description,
            type: data.type,
            price: data.price,
            stockQuantity: data.stockQuantity,
            stockUnit: data.stockUnit,
            collections: data.collections,
            compareAtPrice: data.compareAtPrice ?? undefined,
            costPrice: data.costPrice ?? undefined,
            pageTitle: data.pageTitle ?? data.name,
            pageDescription: data.pageDescription,
         });

         if (selectedMedia) {
            void uploadProductImages(selectedMedia, {
               productId,
            }).catch(err => {
               console.error("Error uploading images:", err);
            });
         }

         if (selectedProductFiles) {
            void uploadProductFile(selectedProductFiles, {
               productId,
            }).catch(err => {
               console.error("Error uploading product file:", err);
            });
         }
         
         router.push("/dashboard/products")
         toast.success("Product created successfully!");
      } catch (error) {
         console.log("Error creating product:", error);
         toast.error("Something went wrong! Please try again!");
      }
   }

   return (
      <FormProvider {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <section>
               <header className="sticky top-0 z-50 flex h-15 w-full items-center justify-between bg-background border-b p-4">
                  <div className="flex items-center gap-2 text-xs">
                     <SidebarTrigger />
                     <div className="hidden md:flex items-center gap-2">
                        <ChevronRight className="text-muted-foreground size-3" />
                        <span>Products</span>
                        <ChevronRight className="text-muted-foreground size-3" />
                        <span className="bg-secondary rounded px-2 py-1">
                           New
                        </span>
                     </div>
                  </div>

                  <div className="flex items-center justify-end ml-auto gap-4">
                     <Button
                        disabled={form.formState.isSubmitting}
                        size="sm"
                        type="submit"
                     >
                        Add Product
                        {form.formState.isSubmitting ? (
                           <Spinner />
                        ) : (
                           <PlusIcon />
                        )}
                     </Button>
                     <Link
                        href="/dashboard/products"
                        className={buttonVariants({
                           size: "sm",
                           variant: "secondary",
                           className:
                              "aria-disabled:opacity-75 aria-disabled:pointer-none: aria-disabled:cursor-not-allowed",
                        })}
                        aria-disabled={form.formState.isSubmitting}
                     >
                        Cancel
                     </Link>
                  </div>
               </header>

               <CreateProductForm />
            </section>
         </form>
      </FormProvider>
   );
}
