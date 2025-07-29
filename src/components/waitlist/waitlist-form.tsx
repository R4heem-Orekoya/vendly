"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitlistSchema, type TWaitlistSchema } from "@/validators/waitlist";
import { ConvexError } from "convex/values";
import { useAction, useMutation } from "convex/react";
import { api } from "~/convex/_generated/api";
import { toast } from "sonner";
import { Spinner } from "@/icons";

export default function WaitlistForm() {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<TWaitlistSchema>({
      resolver: zodResolver(waitlistSchema),
   });
   
   const createWaitlist = useMutation(api.waitlist.add)
   const sendWelcomeEmail = useAction(api.emails.sendEmail)
   
   async function onSubmit(data: TWaitlistSchema) {
      try {
         await createWaitlist(data)
         
         void sendWelcomeEmail({
            email: data.email
         })
         toast.success("Thank you for joining our waitlist!")
      } catch (error) {
         console.log(error);
         if(error instanceof ConvexError) {
            toast.error(error.data)
         }
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 max-w-xl w-full mt-12">
         <div className="grid gap-2">
            <Label htmlFor="email" className="text-muted-foreground">
               Enter Your Email
            </Label>
            <Input
               type="email"
               id="email"
               placeholder="example@redoxx.dev"
               className="h-12 text-base"
               {...register("email")}
            />
            {errors.email && (<p className="text-xs font-medium text-destructive">{errors.email?.message}</p>)}
         </div>

         <Button disabled={isSubmitting} size="lg">
            Join Waitlist
            {isSubmitting && <Spinner />}
         </Button>
      </form>
   );
}
