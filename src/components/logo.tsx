import { cn } from "@/lib/utils";
import Image from "next/image";
import LogoSvg from "~/public/logo.svg";

interface AppLogoProps {
   svgClassName?: string;
   textClassName?: string;
}

export default function AppLogo({ svgClassName, textClassName }: AppLogoProps) {
   return (
      <div className="flex items-center gap-2">
         <div className="relative size-10">
            <Image
               src={LogoSvg}
               alt="application Logo"
               width={100}
               height={100}
               className={cn("size-full object-contain", svgClassName)}
            />
         </div>
         <span
            className={cn(
               "text-xl tracking-tighter font-semibold",
               textClassName
            )}
         >
            Vendly
         </span>
      </div>
   );
}
