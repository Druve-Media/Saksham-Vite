import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/auth-store";

export interface Announcement {
	announcement_id: string;
	created_by: string;
	society_id: string;
	content: string;
	created_on: string;
	status: string;
	role: string[];
}

export function useGetSocietyAnnouncements() {
	const { toast } = useToast();

	const societyId = useAuthStore((s) => s.user?.society_id);

	const query = useQuery<Announcement[]>({
		queryKey: ["announcements", societyId],
		queryFn: () =>
			get<Announcement[]>(
				`/announcements/get-society-announcements?society_id=${societyId}`,
			),
		enabled: !!societyId,
	});

	useEffect(() => {
		if (query.isError) {
			const err = query.error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to fetch announcements. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		}
	}, [query.isError, query.error, toast]);

	return query;
}
