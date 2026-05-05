import { useState, useEffect } from "react";
import { toast } from "sonner";
import * as profileService from "@/services/profileService";
import type { Profile, PointsHistoryItem, UpdateProfileData, UpdateVisibilityData } from "@/types/profile";

interface UseProfileReturn {
  profile: Profile | null;
  pointsHistory: PointsHistoryItem[];
  loading: boolean;
  error: string | null;
  handleSaveProfile: (data: UpdateProfileData) => Promise<void>;
  handleToggleVisibility: (key: keyof UpdateVisibilityData, value: boolean) => Promise<void>;
}

export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [pointsHistory, setPointsHistory] = useState<PointsHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar perfil e histórico de pontos em paralelo
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [profileData, historyData] = await Promise.all([
          profileService.getMyProfile(),
          profileService.getPointsHistory(10),
        ]);

        setProfile(profileData);
        setPointsHistory(historyData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro ao carregar perfil";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Salvar alterações do perfil com optimistic update
  const handleSaveProfile = async (data: UpdateProfileData) => {
    try {
      if (!profile) return;

      // Optimistic update local
      const updatedProfile = {
        ...profile,
        name: data.name || profile.name,
        email: data.email || profile.email,
        cargo: data.cargo || profile.cargo,
      };
      setProfile(updatedProfile);

      // Chamada à API
      const result = await profileService.updateMyProfile(data);
      setProfile(result);
      toast.success("Perfil atualizado com sucesso!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar perfil";
      setError(errorMessage);
      toast.error(errorMessage);

      // Reverter optimistic update em caso de erro
      if (profile) {
        setProfile(profile);
      }
    }
  };

  // Alternar visibilidade com optimistic update
  const handleToggleVisibility = async (key: keyof UpdateVisibilityData, value: boolean) => {
    try {
      if (!profile) return;

      // Optimistic update local
      const updatedSettings = {
        ...profile.visibility_settings,
        [key]: value,
      };
      setProfile({
        ...profile,
        visibility_settings: updatedSettings,
      });

      // Chamada à API
      const updateData = { [key]: value };
      const result = await profileService.updateVisibility(updateData);
      setProfile({
        ...profile,
        visibility_settings: result.visibility_settings,
      });
      toast.success("Preferências de visibilidade atualizadas!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar visibilidade";
      setError(errorMessage);
      toast.error(errorMessage);

      // Reverter optimistic update em caso de erro
      if (profile) {
        setProfile(profile);
      }
    }
  };

  return {
    profile,
    pointsHistory,
    loading,
    error,
    handleSaveProfile,
    handleToggleVisibility,
  };
}
