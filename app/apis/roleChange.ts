import { api } from "./client";
import { roleChangeType } from "./roleChange.type";

export function applyRoleChange(data: roleChangeType) {
  return api.post("/api/v1/role-change-requests", data);
}
