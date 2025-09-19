import { api } from "./client";
import { DeveloperQuestion } from "./developerQuestion.type";

export async function postQuestion(data: DeveloperQuestion) {
  const response = await api.post<DeveloperQuestion>(
    "/api/v1/developer/questions",
    data
  );
  return response.data;
}
export async function getAllQuestions() {
  const response = await api.get<DeveloperQuestion[]>(
    "/api/v1/developer/questions/my"
  );
  return response.data;
}
