import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import type { SocietyResponse } from "@/beans/society/society";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/auth-store";

export function useGetSociety() {
	const societyId = useAuthStore((s) => s.user?.society_id);
	const { toast } = useToast();

	const query = useQuery<SocietyResponse>({
		queryKey: ["society", societyId],
		queryFn: () => get<SocietyResponse>(`/society/`, { society_id: societyId }),
		enabled: !!societyId,
	});

	useEffect(() => {
		if (query.isError) {
			const err = query.error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to fetch society details. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		}
	}, [query.isError, query.error, toast]);

	return query;
}
