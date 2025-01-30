import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Store,
  Package,
  ShoppingCart,
  Megaphone,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
}

const navigation = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
    href: "/",
  },
  {
    title: "Bars",
    icon: Store,
    href: "/bars",
  },
  {
    title: "Products",
    icon: Package,
    href: "/products",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    href: "/orders",
  },
  {
    title: "Marketing",
    icon: Megaphone,
    href: "/marketing",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
];

const Sidebar = ({ className, collapsed = false }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div
      className={cn(
        "h-screen bg-background border-r flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-[280px]",
        className,
      )}
    >
      <div className="p-4 border-b">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-start",
          )}
        >
          <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
          {!collapsed && (
            <span className="ml-2 font-semibold text-xl">Bar Admin</span>
          )}
        </div>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <TooltipProvider>
          <nav className="space-y-1 px-2">
            {navigation.map((item) => (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link to={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-10",
                        collapsed ? "justify-center px-2" : "px-4",
                      )}
                    >
                      <item.icon
                        className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")}
                      />
                      {!collapsed && <span>{item.title}</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">{item.title}</TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
      </div>

      <div className="p-4 border-t">
        <TooltipProvider>
          <div className="space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-10",
                    collapsed ? "justify-center px-2" : "px-4",
                  )}
                >
                  <Settings
                    className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")}
                  />
                  {!collapsed && <span>Settings</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">Settings</TooltipContent>
              )}
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-10",
                    collapsed ? "justify-center px-2" : "px-4",
                  )}
                >
                  <HelpCircle
                    className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")}
                  />
                  {!collapsed && <span>Help</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">Help</TooltipContent>}
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className={cn(
                    "w-full justify-start h-10",
                    collapsed ? "justify-center px-2" : "px-4",
                  )}
                >
                  <LogOut
                    className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")}
                  />
                  {!collapsed && <span>Logout</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">Logout</TooltipContent>
              )}
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
