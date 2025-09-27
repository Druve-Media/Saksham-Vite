import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";

export interface Complaint {
	created_by_user_id: string;
	content: string;
	society_id: string;
	complaint_id: string;
	status: string;
}

export function useGetComplaintById(complaintId: string) {
	const { toast } = useToast();

	const query = useQuery<Complaint>({
		queryKey: ["complaint", complaintId],
		queryFn: () => get<Complaint>(`/complaints/${complaintId}`),
		enabled: !!complaintId,
	});

	useEffect(() => {
		if (query.isError) {
			const err = query.error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to fetch complaint details. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		}
	}, [query.isError, query.error, toast]);

	return query;
}
