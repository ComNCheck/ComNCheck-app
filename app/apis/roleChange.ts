import { api } from "./client";
import {
  RoleChangeRequestDetail,
  RoleChangeRequestList,
  RoleChangeType,
  RoleChangeUpdateRequest,
} from "./roleChange.type";

export function applyRoleChange(data: RoleChangeType) {
  return api.post("/api/v1/role-change-requests", data);
}

export function getRoleChangeRequests() {
  return api.get<RoleChangeRequestList>("/api/v1/role-change-requests");
}

export function getRoleChangeRequestById(requestId: number) {
  return api.get<RoleChangeRequestDetail>(
    `/api/v1/role-change-requests/${requestId}`
  );
}

export function updateRoleChangeRequest(
  requestId: number,
  data: RoleChangeUpdateRequest
) {
  return api.put<RoleChangeRequestDetail>(
    `/api/v1/role-change-requests/${requestId}`,
    data
  );
}
