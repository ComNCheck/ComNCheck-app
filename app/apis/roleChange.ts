import { api } from "./client";
import { RoleChangeRequestList, RoleChangeType } from "./roleChange.type";

export function applyRoleChange(data: RoleChangeType) {
  return api.post("/api/v1/role-change-requests", data);
}

export function getRoleChangeRequests() {
  return api.get<RoleChangeRequestList>("/api/v1/role-change-requests");
}
