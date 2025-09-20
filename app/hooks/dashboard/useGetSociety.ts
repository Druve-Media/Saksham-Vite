import { useQuery } from "@tanstack/react-query";
import type { SocietyResponse } from "@/beans/society/society";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useAuthStore } from "@/stores/auth-store";

export function useGetSociety() {
	const societyId = useAuthStore((s) => s.user?.society_id);

	return useQuery<SocietyResponse>({
		queryKey: ["society", societyId],
		queryFn: () =>
			get<SocietyResponse>(`/v2/society/`, { society_id: societyId }),
		enabled: !!societyId,
	});
}
