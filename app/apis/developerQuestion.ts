import { api } from "./client";
import { DeveloperQuestion } from "./developerQuestion.type";

export async function postQuestion(data: Pick<DeveloperQuestion, "content">) {
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
export async function getDevQuestions() {
  const response = await api.get<DeveloperQuestion[]>(
    "/api/v1/developer/questions"
  );
  return response.data;
}
