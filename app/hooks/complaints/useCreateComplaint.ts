import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { postRequest } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/auth-store";

interface CreateComplaintPayload {
	content: string;
}

export function useCreateComplaint() {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const user = useAuthStore((s) => s.user);
	const societyId = user?.society_id;

	return useMutation({
		mutationFn: ({ content }: CreateComplaintPayload) =>
			postRequest(`/complaints/`, {
				created_by_user_id: user?.sub,
				content,
				society_id: societyId,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["complaints", societyId] });
			toast({
				title: "Success",
				description: "Complaint created successfully.",
				variant: "default",
			});
		},
		onError: (error) => {
			const err = error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to create complaint. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		},
	});
}
