import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { patch } from "@/components/configurations/axios-config/Axiosclient";
import { useAuthStore } from "@/stores/auth-store";

interface UpdateWingPayload {
	wing_id: string;
	wing_name: string;
	floors: number;
	number_of_apartments: number;
}

export const useUpdateWing = () => {
	const queryClient = useQueryClient();
	const { user } = useAuthStore();

	return useMutation({
		mutationFn: async (payload: UpdateWingPayload) => {
			const url = `/society/update-wing-data?wing_id=${payload.wing_id}`;
			const response = await patch(url, {
				wing_name: payload.wing_name,
				floors: payload.floors,
				number_of_apartments: payload.number_of_apartments,
				society_id: user?.society_id,
			});
			return response;
		},
		onSuccess: () => {
			toast.success("Wing updated successfully!");
			queryClient.invalidateQueries({ queryKey: ["wings"] });
		},
		onError: (error: any) => {
			const message =
				error.response?.data?.detail?.[0]?.msg ||
				"Failed to update wing. Please try again.";
			toast.error(message);
			console.error("Error updating wing:", error);
		},
	});
};
