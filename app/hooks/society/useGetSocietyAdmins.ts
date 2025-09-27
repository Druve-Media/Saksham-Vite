import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import type { SocietyAdmin } from "@/beans/society/society-admins";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/auth-store";

export function useGetSocietyAdmins() {
	const societyId = useAuthStore((s) => s.user?.society_id);
	const { toast } = useToast();

	const query = useQuery<SocietyAdmin[]>({
		queryKey: ["society-admins", societyId],
		queryFn: () =>
			get<SocietyAdmin[]>(`/society-user/society/society_admins`, {
				society_id: societyId,
			}),
		enabled: !!societyId,
	});

	useEffect(() => {
		if (query.isError) {
			const err = query.error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to fetch society admins. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		}
	}, [query.isError, query.error, toast]);

	return query;
}
