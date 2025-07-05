"use client"

import {
   BadgeCheck,
   Bell,
   ChevronsUpDown,
   CreditCard,
   LogOut,
   Sparkles,
} from "lucide-react"

import {
   Avatar,
   AvatarFallback,
   AvatarImage,
} from "@/components/ui/avatar"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   useSidebar,
} from "@/components/ui/sidebar"

export function UserDropdown({
   user,
}: {
   user: {
      name: string
      email: string
      avatar: string
   }
}) {
   const { isMobile, open } = useSidebar()

   return (
      <SidebarMenu>
         <SidebarMenuItem>
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                     size="lg"
                     className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                     <Avatar data-open={open} className="size-9 md:[&[data-open=false]]:size-full rounded-full">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                     </Avatar>
                     <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{user.name}</span>
                        <span className="truncate text-xs">{user.email}</span>
                     </div>
                     <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
               </DropdownMenuTrigger>
               <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-[260px] rounded-2xl p-2"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
               >
                  <DropdownMenuLabel className="p-0 font-normal border rounded-lg">
                     <div className="flex items-center gap-2 p-1.5 text-left text-sm">
                        <Avatar className="size-9 rounded-full">
                           <AvatarImage src={user.avatar} alt={user.name} />
                           <AvatarFallback className="rounded-md">CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                           <span className="truncate font-medium">{user.name}</span>
                           <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                        </div>
                     </div>
                  </DropdownMenuLabel>
                  <DropdownMenuGroup className="mt-2">
                     <DropdownMenuItem>
                        <Sparkles />
                        Upgrade to Pro
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <BadgeCheck />
                        Account
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <CreditCard />
                        Billing
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <Bell />
                        Notifications
                     </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="opacity-60" />
                  <DropdownMenuItem variant="destructive">
                     <LogOut />
                     Log out
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </SidebarMenuItem>
      </SidebarMenu>
   )
}
