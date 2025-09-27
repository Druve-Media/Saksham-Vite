import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postRequest } from "@/components/configurations/axios-config/Axiosclient";
import { useAuthStore } from "@/stores/auth-store";

interface AddWingPayload {
	wing_name: string;
	floors: number;
	number_of_apartments: number;
}

export const useAddWing = () => {
	const queryClient = useQueryClient();
	const { user } = useAuthStore();

	return useMutation({
		mutationFn: async (payload: AddWingPayload) => {
			const response = await postRequest("/society/add-wings", {
				...payload,
				society_id: user?.society_id,
			});
			return response;
		},
		onSuccess: () => {
			toast.success("Wing added successfully!");
			queryClient.invalidateQueries({ queryKey: ["wings"] });
		},
		onError: (error: any) => {
			const message =
				error.response?.data?.detail?.[0]?.msg ||
				"Failed to add wing. Please try again.";
			toast.error(message);
			console.error("Error adding wing:", error);
		},
	});
};
