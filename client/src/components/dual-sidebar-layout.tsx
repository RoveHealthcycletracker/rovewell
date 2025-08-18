import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
  SidebarRail
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface DualSidebarLayoutProps {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  mainContent: React.ReactNode;
  leftTitle?: string;
  rightTitle?: string;
  className?: string;
}

export default function DualSidebarLayout({
  leftContent,
  rightContent,
  mainContent,
  leftTitle = "Left Panel",
  rightTitle = "Right Panel",
  className
}: DualSidebarLayoutProps) {
  return (
    <SidebarProvider>
      <div className={cn("flex h-screen w-full", className)}>
        {/* Left Sidebar */}
        {leftContent && (
          <Sidebar side="left" className="border-r">
            <SidebarHeader className="border-b p-4">
              <h2 className="text-lg font-semibold">{leftTitle}</h2>
            </SidebarHeader>
            <SidebarContent className="p-4">
              {leftContent}
            </SidebarContent>
            <SidebarRail />
          </Sidebar>
        )}

        {/* Main Content Area */}
        <SidebarInset className="flex-1">
          <div className="flex h-full">
            {/* Main Content */}
            <div className="flex-1 p-6">
              {mainContent}
            </div>

            {/* Right Sidebar */}
            {rightContent && (
              <Sidebar side="right" className="border-l">
                <SidebarHeader className="border-b p-4">
                  <h2 className="text-lg font-semibold">{rightTitle}</h2>
                </SidebarHeader>
                <SidebarContent className="p-4">
                  {rightContent}
                </SidebarContent>
                <SidebarRail />
              </Sidebar>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

// Example usage component
export function ExampleDualSidebar() {
  return (
    <DualSidebarLayout
      leftTitle="Navigation"
      rightTitle="Settings"
      leftContent={
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-sidebar-accent">
            <h3 className="font-medium">Menu Item 1</h3>
            <p className="text-sm text-sidebar-foreground/70">Description</p>
          </div>
          <div className="p-3 rounded-lg bg-sidebar-accent">
            <h3 className="font-medium">Menu Item 2</h3>
            <p className="text-sm text-sidebar-foreground/70">Description</p>
          </div>
        </div>
      }
      rightContent={
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-sidebar-accent">
            <h3 className="font-medium">Setting 1</h3>
            <p className="text-sm text-sidebar-foreground/70">Value</p>
          </div>
          <div className="p-3 rounded-lg bg-sidebar-accent">
            <h3 className="font-medium">Setting 2</h3>
            <p className="text-sm text-sidebar-foreground/70">Value</p>
          </div>
        </div>
      }
      mainContent={
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Main Content Area</h1>
            <p className="text-lg text-muted-foreground">
              This is the main content area between the left and right sidebars.
            </p>
          </div>
        </div>
      }
    />
  );
}
