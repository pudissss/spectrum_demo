"use client";

import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { LogOut, User as UserIcon, ChevronsUpDown, Check, Users, Bell } from "lucide-react";
import { UserRole } from "@/lib/types";
import { ALL_USERS } from "@/lib/data";
import { useRouter } from "next/navigation";

const availableRoles = Array.from(new Set(ALL_USERS.map(u => u.role)));

export function UserNav() {
  const { user, logout, switchRole } = useAuth();
  const router = useRouter();

  if (!user) {
    return null;
  }
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
  }

  const canAnnounce = user.role === 'President' || user.role === 'Vice President' || user.role === 'HOD';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-12 w-full justify-start gap-3 p-2 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="text-left group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium text-sidebar-primary-foreground">{user.name}</p>
            <p className="text-xs text-sidebar-foreground">{user.role}</p>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 text-sidebar-foreground group-data-[collapsible=icon]:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          {!canAnnounce && (
             <DropdownMenuItem onClick={() => router.push('/dashboard/announcements')}>
                <Bell className="mr-2 h-4 w-4" />
                <span>Announcements</span>
            </DropdownMenuItem>
          )}
           <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Users className="mr-2 h-4 w-4" />
              <span>Switch Role</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {availableRoles.map(role => (
                  <DropdownMenuItem key={role} onClick={() => switchRole(role as UserRole)}>
                    <Check className={`mr-2 h-4 w-4 ${user.role === role ? "opacity-100" : "opacity-0"}`} />
                    {role}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
