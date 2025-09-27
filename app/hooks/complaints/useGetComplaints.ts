import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/auth-store";

export interface Complaint {
	created_by_user_id: string;
	content: string;
	society_id: string;
	complaint_id: string;
	status: string;
}

export function useGetComplaints() {
	const { toast } = useToast();

	const societyId = useAuthStore((s) => s.user?.society_id);

	const query = useQuery<Complaint[]>({
		queryKey: ["complaints", societyId],
		queryFn: () =>
			get<Complaint[]>(`/v2/saksham/complaints/society/${societyId}`),
		enabled: !!societyId,
	});

	useEffect(() => {
		if (query.isError) {
			const err = query.error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to fetch complaints. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		}
	}, [query.isError, query.error, toast]);

	return query;
}
