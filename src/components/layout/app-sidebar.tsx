"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  CalendarCheck,
  BookText,
  MessageSquareWarning,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { UserNav } from "./user-nav";
import { Logo } from "../icons/logo";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/focus-room", label: "Focus Room", icon: CalendarCheck },
  { href: "/dashboard/logs", label: "Logs", icon: BookText, roles: ["President", "HOD", "Director", "Lead"] },
  { href: "/dashboard/grievances", label: "Grievances", icon: MessageSquareWarning, roles: ["President", "HOD", "Director", "Lead"] },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-2">
            <Logo className="w-10 h-10"/>
            <div className="group-data-[collapsible=icon]:hidden">
                <h1 className="font-headline text-lg font-semibold text-sidebar-primary-foreground">FOCUS</h1>
                <p className="text-xs text-sidebar-foreground">Management</p>
            </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            if (item.roles && user && !item.roles.includes(user.role)) {
                return null;
            }
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={isActive}
                    icon={<item.icon />}
                    tooltip={{ children: item.label }}
                  >
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <UserNav />
      </SidebarFooter>
    </Sidebar>
  );
}
