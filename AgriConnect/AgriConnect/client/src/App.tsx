import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Market from "@/pages/Market";
import Marketplace from "@/pages/Marketplace";
import Messages from "@/pages/Messages";
import Analytics from "@/pages/Analytics";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route path="/market" component={Market} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/messages" component={Messages} />
      <Route path="/analytics" component={Analytics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <SidebarProvider style={style as React.CSSProperties}>
              <div className="flex h-screen w-full">
                <AppSidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border px-4">
                    <SidebarTrigger data-testid="button-sidebar-toggle" />
                    <div className="flex items-center gap-2">
                      <LanguageSelector />
                      <ThemeToggle />
                    </div>
                  </header>
                  <main className="flex-1 overflow-y-auto">
                    <div className="container mx-auto p-6 max-w-screen-2xl">
                      <Router />
                    </div>
                  </main>
                </div>
              </div>
            </SidebarProvider>
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
