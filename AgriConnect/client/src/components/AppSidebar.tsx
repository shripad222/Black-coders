import { Home, TrendingUp, ShoppingBag, MessageSquare, BarChart3, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const menuItems = [
    {
      title: t("dashboard"),
      url: "/dashboard",
      icon: Home,
      testId: "nav-dashboard",
    },
    {
      title: t("market"),
      url: "/dashboard/market",
      icon: TrendingUp,
      testId: "nav-market",
    },
    {
      title: t("marketplace"),
      url: "/dashboard/marketplace",
      icon: ShoppingBag,
      testId: "nav-marketplace",
    },
    {
      title: t("messages"),
      url: "/dashboard/messages",
      icon: MessageSquare,
      testId: "nav-messages",
    },
    {
      title: t("analytics"),
      url: "/dashboard/analytics",
      icon: BarChart3,
      testId: "nav-analytics",
    },
    {
      title: t("profile"),
      url: "/dashboard/profile",
      icon: User,
      testId: "nav-profile",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <TrendingUp className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold text-sidebar-foreground">
              AgriConnect
            </h2>
            <p className="text-xs text-muted-foreground">Market Intelligence</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    isActive={location.pathname === item.url}
                    data-testid={item.testId}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
