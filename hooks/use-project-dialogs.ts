import { useState } from "react";

export type ProjectDialogType = 
  | "create"
  | "rename"
  | "delete"
  | null;

interface ProjectDialogState {
  type: ProjectDialogType;
  projectName?: string;
  projectId?: string;
}

export function useProjectDialogs() {
  const [dialog, setDialog] = useState<ProjectDialogState>({
    type: null,
  });

  const openCreateDialog = () => {
    setDialog({ type: "create" });
  };

  const openRenameDialog = (projectName: string, projectId?: string) => {
    setDialog({ 
      type: "rename", 
      projectName,
      projectId
    });
  };

  const openDeleteDialog = (projectName: string, projectId?: string) => {
    setDialog({ 
      type: "delete", 
      projectName,
      projectId
    });
  };

  const closeDialog = () => {
    setDialog({ type: null });
  };

  const isDialogOpen = dialog.type !== null;

  return {
    dialog,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    isDialogOpen,
  };
}