import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";

export interface Announcement {
	announcement_id: string;
	created_by: string;
	society_id: string;
	content: string;
	created_on: string;
	status: string;
	role: string[];
}

export function useGetAnnouncementById(announcementId: string) {
	const { toast } = useToast();

	const query = useQuery<Announcement>({
		queryKey: ["announcement", announcementId],
		queryFn: () =>
			get<Announcement>(
				`/announcements/get-by-announcements?announcement_id=${announcementId}`,
			),
		enabled: !!announcementId,
	});

	useEffect(() => {
		if (query.isError) {
			const err = query.error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to fetch announcement details. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		}
	}, [query.isError, query.error, toast]);

	return query;
}
