import React from "react";
import { ProtectedComponentProps } from "./ProtectedComponentProps.types";
import { USER_PERMISSIONS } from "src/@const/UserPermissions";


export const ProtectedComponente = ({
  permissions,
  children,
}: ProtectedComponentProps) => {
  

  if (
    permissions.find((permission) => permission === USER_PERMISSIONS.RESEARCH) !==
    undefined
  ) {
    return <>{children}</>;
  }
  return null
};
