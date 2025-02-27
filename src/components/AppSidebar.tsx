
import { Building, Code, Home, Map, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Assets", url: "/assets", icon: Building },
  { title: "Procedures", url: "/procedures", icon: Code },
  { title: "Zones", url: "/zones", icon: Map, expandable: true, 
    subItems: [
      { title: "Zones", url: "/zones" },
      { title: "Zone Usages", url: "/zone-usages" },
      { title: "Zone Accesses", url: "/zone-accesses" }
    ] 
  },
  { title: "IoT", url: "/iot", icon: Settings, expandable: true,
    subItems: [
      { title: "Devices", url: "/devices" },
      { title: "Sensors", url: "/sensors" },
      { title: "Properties", url: "/properties" },
      { title: "Property Usages", url: "/property-usages" }
    ]
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar className="border-r">
      <div className="flex items-center p-4">
        <div className="w-8 h-8 mr-2">
          <svg viewBox="0 0 24 24" className="text-blue-600 fill-current">
            <path d="M12 1L1 8l11 7 11-7-11-7zM1 16l11 7 11-7M1 12l11 7 11-7"></path>
          </svg>
        </div>
        <h1 className="text-xl font-bold">DTS Admin</h1>
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Generali</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <div key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => navigate(item.url)}
                      className={cn(
                        location.pathname === item.url ? "bg-accent" : "",
                        "justify-start"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                      {item.expandable && (
                        <span className="ml-auto">
                          {location.pathname.startsWith(item.url) ? "↑" : "↓"}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {item.expandable && item.subItems && location.pathname.includes(item.url) && (
                    <div className="ml-6 border-l pl-4 border-border">
                      {item.subItems.map(subItem => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton
                            onClick={() => navigate(subItem.url)}
                            className={location.pathname === subItem.url ? "bg-accent" : ""}
                          >
                            <span className="text-sm">{subItem.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
