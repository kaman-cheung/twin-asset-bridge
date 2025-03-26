
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Menu } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden">
          <div className="h-12 border-b flex items-center px-4 bg-background">
            <div className="flex items-center space-x-2">
              <SidebarTrigger>
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded">dev</span>
              <span className="px-2 py-1 bg-blue-400 text-white text-xs rounded">s074</span>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-muted">
                <span className="text-lg">🌙</span>
              </button>
              <button className="p-2 rounded-full hover:bg-muted">
                <span className="text-lg">✕</span>
              </button>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
