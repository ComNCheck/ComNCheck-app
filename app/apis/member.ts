import { api } from "./client";
import { PresidentCouncilResponse } from "./member.type";

export async function getCouncilList(): Promise<PresidentCouncilResponse> {
  const response = await api.get<PresidentCouncilResponse>(
    "/api/v1/member/members/president-council"
  );
  return response.data;
}
