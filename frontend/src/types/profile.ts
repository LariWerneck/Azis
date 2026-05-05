export interface Profile {
  id: number;
  name: string;
  email: string;
  role: "admin" | "gestor" | "funcionario";
  nivel: number;
  cargo: string | null;
  equipe: string;
  total_points: number;
  ranking_position: number;
  badges_count: number;
  tasks_count: number;
  visibility_settings: VisibilitySettings;
}

export interface VisibilitySettings {
  show_in_ranking: boolean;
  public_points: boolean;
  feed_achievements: boolean;
}

export interface PointsHistoryItem {
  id: number;
  task_title: string;
  points: number;
  created_at: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  cargo?: string;
}

export interface UpdateVisibilityData {
  show_in_ranking?: boolean;
  public_points?: boolean;
  feed_achievements?: boolean;
}
