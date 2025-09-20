// hooks/useGetSociety.ts
import { useQuery } from "@tanstack/react-query";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useAuthStore } from "@/stores/auth-store";

interface SocietyResponse {
	id: string;
	name: string;
	address?: string;
	// 👆 extend with actual fields you expect
}

export function useGetSociety() {
	const societyId = useAuthStore((s) => s.user?.society_id);

	return useQuery<any>({
		queryKey: ["society", societyId],
		queryFn: () => get<any>(`/v2/society/`, { society_id: societyId }),
		enabled: !!societyId,
	});
}
