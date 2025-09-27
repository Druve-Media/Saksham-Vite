import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { postRequest } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/auth-store";

interface CreateAnnouncementPayload {
	content: string;
	role?: string[];
}

export function useCreateAnnouncement() {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const user = useAuthStore((s) => s.user);
	const societyId = user?.society_id;

	return useMutation({
		mutationFn: ({ content, role = [] }: CreateAnnouncementPayload) =>
			postRequest(`/announcements/create-announcement`, {
				created_by: user?.sub,
				society_id: societyId,
				content,
				created_on: new Date().toISOString(),
				status: "Active",
				role,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["announcements", societyId] });
			toast({
				title: "Success",
				description: "Announcement created successfully.",
				variant: "default",
			});
		},
		onError: (error) => {
			const err = error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to create announcement. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		},
	});
}
