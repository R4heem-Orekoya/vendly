import { Box, PackageCheck, Zap } from "lucide-react";

export const benefits = [
   {
      title: "Instant Product Setup",
      description:
         "Add digital or physical products and start selling within minutes, no complex setup required.",
      icon: <Zap className="w-5 h-5" strokeWidth={1.5} />,
   },
   {
      title: "Unified Inventory Management",
      description:
         "Track stock levels, file downloads, and variants in one simple dashboard.",
      icon: <Box className="w-5 h-5" strokeWidth={1.5} />,
   },
   {
      title: "Seamless Checkout",
      description:
         "Optimized checkout experience for your customers fast, secure, and conversion-ready.",
      icon: <PackageCheck className="w-5 h-5" strokeWidth={1.5} />,
   },
];

export default function Benefits() {
   return (
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-4xl border rounded-lg md:divide-x max-md:divide-y overflow-hidden mt-20">
         {benefits.map((benefit) => (
            <div key={benefit.title} className="px-4 py-6">
               <div className="flex items-center gap-1 mb-4">
                  {benefit.icon}
                  <h3>{benefit.title}</h3>
               </div>
               <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
         ))}
      </div>
   );
}
