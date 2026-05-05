import { getApiUrl, getAuthHeaders } from "@/lib/api";
import type { Profile, PointsHistoryItem, UpdateProfileData, UpdateVisibilityData } from "@/types/profile";

export async function getMyProfile(): Promise<Profile> {
  const response = await fetch(getApiUrl("/api/users/me/profile"), {
    method: "GET",
    headers: getAuthHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar perfil: ${response.statusText}`);
  }

  return response.json();
}

export async function updateMyProfile(data: UpdateProfileData): Promise<Profile> {
  const response = await fetch(getApiUrl("/api/users/me/profile"), {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Erro ao atualizar perfil: ${response.statusText}`);
  }

  return response.json();
}

export async function getPointsHistory(limit: number = 10): Promise<PointsHistoryItem[]> {
  const response = await fetch(getApiUrl(`/api/users/me/points-history?limit=${limit}`), {
    method: "GET",
    headers: getAuthHeaders(),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar histórico de pontos: ${response.statusText}`);
  }

  return response.json();
}

export async function updateVisibility(data: UpdateVisibilityData): Promise<{ visibility_settings: any }> {
  const response = await fetch(getApiUrl("/api/users/me/visibility"), {
    method: "PUT",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || `Erro ao atualizar visibilidade: ${response.statusText}`);
  }

  return response.json();
}
