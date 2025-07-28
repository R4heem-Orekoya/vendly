"use client";

import { type PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import { type ProductSchemaType } from "@/validators/product";
import GeneralInformtaion from "./general-information";
import ProductFiles from "./product-files";
import ProductPricing from "./product-pricing";
import ProductInventory from "./product-inventory";
import SearchEngineListing from "./search-engine-listing";
import type { productTypesType } from "@/lib/consts";
import { AnimatePresence, motion } from "motion/react";

export default function CreateProductForm() {
   const form = useFormContext<ProductSchemaType>();

   const productType = form.watch("type") as productTypesType;

   return (
      <div className="w-full my-6 mb-32 scroll-smooth">
         <div className="max-w-2xl mx-auto space-y-6 p-4">
            <MotionDiv>
               <GeneralInformtaion />
            </MotionDiv>

            <AnimatePresence>
               {productType === "digital_product" && (
                  <motion.div
                     key="product-files"
                     layout
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: "auto" }}
                     exit={{ opacity: 0, height: 0 }}
                     transition={{ duration: 0.3 }}
                  >
                     <ProductFiles />
                  </motion.div>
               )}
            </AnimatePresence>

            <MotionDiv>
               <ProductPricing />
            </MotionDiv>

            <AnimatePresence>
               {productType === "physical_product" && (
                  <motion.div
                     key="product-inventory"
                     layout
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: "auto" }}
                     exit={{ opacity: 0, height: 0 }}
                     transition={{ duration: 0.3 }}
                  >
                     <ProductInventory />
                  </motion.div>
               )}
            </AnimatePresence>

            <MotionDiv>
               <SearchEngineListing />
            </MotionDiv>
         </div>
      </div>
   );
}

interface SectionWrapperProps extends PropsWithChildren {
   delay?: number;
   className?: string;
}

function MotionDiv({ children, delay = 0, className }: SectionWrapperProps) {
   return (
      <motion.section
         layout
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.3, delay }}
         className={className}
      >
         {children}
      </motion.section>
   );
}
