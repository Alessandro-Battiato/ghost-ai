"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { Button } from "@/components/ui/button";
import { CreateProjectDialog } from "@/components/project-dialogs/create-project-dialog";
import { RenameProjectDialog } from "@/components/project-dialogs/rename-project-dialog";
import { DeleteProjectDialog } from "@/components/project-dialogs/delete-project-dialog";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";

export function EditorWorkspace() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();
  const { 
    dialog, 
    openCreateDialog, 
    closeDialog,
    isDialogOpen
  } = useProjectDialogs();

  return (
    <main className="flex min-h-screen flex-col bg-base">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />
      <ProjectSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <section className="flex flex-1 flex-col items-center justify-center p-6 text-sm text-copy-muted">
        <div className="max-w-md text-center">
          <h2 className="mb-2 text-xl font-semibold">Create a project or open an existing one</h2>
          <p className="mb-6 text-copy-muted">Start a new architecture workspace, or choose a project from the sidebar.</p>
          <Button onClick={openCreateDialog} size="lg">
            New Project
          </Button>
        </div>
      </section>
      
      <CreateProjectDialog 
        isOpen={dialog.type === "create" && isDialogOpen} 
        onClose={closeDialog} 
        onCreate={(name) => {
          console.log("Creating project:", name);
          // In real app, this would be an API call
          closeDialog();
        }} 
      />
      
      {dialog.type === "rename" && dialog.projectName && (
        <RenameProjectDialog 
          isOpen={isDialogOpen}
          onClose={closeDialog} 
          onRename={(name) => {
            console.log("Renaming project to:", name);
            // In real app, this would be an API call
            closeDialog();
          }} 
          projectName={dialog.projectName}
        />
      )}
      
      {dialog.type === "delete" && dialog.projectName && (
        <DeleteProjectDialog 
          isOpen={isDialogOpen}
          onClose={closeDialog} 
          onDelete={() => {
            console.log("Deleting project:", dialog.projectName);
            // In real app, this would be an API call
            closeDialog();
          }} 
        />
      )}
    </main>
  );
}