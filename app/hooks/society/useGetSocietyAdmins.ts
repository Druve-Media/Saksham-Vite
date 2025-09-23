import { useQuery } from "@tanstack/react-query";
import type { SocietyAdmin } from "@/beans/society/society-admins";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useAuthStore } from "@/stores/auth-store";

export function useGetSocietyAdmins() {
	const societyId = useAuthStore((s) => s.user?.society_id);

	return useQuery<SocietyAdmin[]>({
		queryKey: ["society-admins", societyId],
		queryFn: () =>
			get<SocietyAdmin[]>(`/v2/society-user/society/society_admins`, {
				society_id: societyId,
			}),
		enabled: !!societyId,
	});
}
