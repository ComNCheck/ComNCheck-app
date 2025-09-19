import { api } from "./client";
import { RoleChangeType } from "./roleChange.type";

export function applyRoleChange(data: RoleChangeType) {
  return api.post("/api/v1/role-change-requests", data);
}
