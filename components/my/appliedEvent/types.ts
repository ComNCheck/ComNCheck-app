export type TopItem = {
  id: string;
  rank: number;
  title: string;
  subtitle?: string;
  description?: string;
  likes: number;
  comments?: number;
  liked?: boolean;
};
