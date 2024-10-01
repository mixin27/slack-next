"use client";

import { useGetWorkspace } from "@/features/workspaces/api/get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();

  const { data } = useGetWorkspace({ id: workspaceId });

  return <div>Workspace ID page</div>;
};

export default WorkspaceIdPage;
