"use client";

import { Plus, X, MoreHorizontal, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function EmptyProjectsState({ label }: { label: string }) {
  return (
    <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-copy-muted">
      No {label.toLowerCase()} yet.
    </div>
  );
}

function ProjectItem({
  name,
  isOwner = true,
  onRename,
  onDelete
}: {
  name: string;
  isOwner?: boolean;
  onRename: () => void;
  onDelete: () => void;
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className="group relative flex items-center justify-between rounded-lg p-3 hover:bg-surface/50"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <span className="truncate text-sm">{name}</span>
      {isOwner && showActions && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100">
          <Button 
            size="icon-sm" 
            variant="ghost"
            onClick={onRename}
            aria-label="Rename project"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button 
            size="icon-sm" 
            variant="ghost"
            onClick={onDelete}
            aria-label="Delete project"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  const { openCreateDialog, openRenameDialog, openDeleteDialog } = useProjectDialogs();

  // Mock projects data
  const myProjects = [
    { id: "1", name: "My First Project", isOwner: true },
    { id: "2", name: "Second Project", isOwner: true },
    { id: "3", name: "Shared Project", isOwner: false }
  ];

  return (
    <aside
      aria-hidden={!isOpen}
      aria-label="Projects sidebar"
      className={cn(
        "fixed top-16 bottom-4 left-4 z-40 flex w-80 flex-col rounded-2xl border border-surface-border bg-surface/95 shadow-2xl backdrop-blur transition-transform duration-200 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%+2rem)] pointer-events-none"
      )}
    >
      <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
        <h2 className="text-sm font-semibold text-copy-primary">Projects</h2>
        <Button
          aria-label="Close projects sidebar"
          onClick={onClose}
          size="icon-sm"
          variant="ghost"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs className="min-h-0 flex-1 p-3" defaultValue="my-projects">
        <TabsList className="w-full" variant="line">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        <TabsContent className="flex h-full flex-col gap-1" value="my-projects">
          {myProjects
            .filter(project => project.isOwner)
            .map((project) => (
              <ProjectItem 
                key={project.id}
                name={project.name}
                isOwner={project.isOwner}
                onRename={() => openRenameDialog(project.name, project.id)}
                onDelete={() => openDeleteDialog(project.name, project.id)}
              />
            ))}
          {myProjects.filter(p => p.isOwner).length === 0 && (
            <EmptyProjectsState label="projects" />
          )}
        </TabsContent>
        <TabsContent className="flex h-full flex-col gap-1" value="shared">
          {myProjects
            .filter(project => !project.isOwner)
            .map((project) => (
              <div key={project.id} className="flex items-center justify-between rounded-lg p-3">
                <span className="truncate text-sm">{project.name}</span>
              </div>
            ))}
          {myProjects.filter(p => !p.isOwner).length === 0 && (
            <EmptyProjectsState label="shared projects" />
          )}
        </TabsContent>
      </Tabs>

      <div className="border-t border-surface-border p-3">
        <Button className="w-full" size="lg" onClick={openCreateDialog}>
          <Plus className="h-5 w-5" />
          New Project
        </Button>
      </div>
    </aside>
  );
}
