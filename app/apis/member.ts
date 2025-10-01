import { api } from "./client";
import { MemberCountResponse, PresidentCouncilResponse } from "./member.type";

export async function getCouncilList(): Promise<PresidentCouncilResponse> {
  const response = await api.get<PresidentCouncilResponse>(
    "/api/v1/member/members/president-council"
  );
  return response.data;
}

export async function getMemberCount(): Promise<MemberCountResponse> {
  const response = await api.get<MemberCountResponse>("/api/v1/member/count");
  return response.data;
}
