import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { put } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/auth-store";

export interface Complaint {
	created_by_user_id: string;
	content: string;
	society_id: string;
	complaint_id: string;
	status: string;
}

interface UpdateComplaintPayload {
	content?: string;
	status?: string;
}

export function useUpdateComplaint(complaintId: string) {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const user = useAuthStore((s) => s.user);
	const societyId = user?.society_id;

	return useMutation({
		mutationFn: (payload: UpdateComplaintPayload) =>
			put<Complaint>(`/complaints/${complaintId}`, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["complaints", societyId] });
			queryClient.invalidateQueries({ queryKey: ["complaint", complaintId] });
			toast({
				title: "Success",
				description: "Complaint updated successfully.",
				variant: "default",
			});
		},
		onError: (error) => {
			const err = error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to update complaint. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		},
	});
}
