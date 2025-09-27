import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { put } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/auth-store";

interface UpdateApartmentPayload {
	flat_id: string;
	flat_no: string;
	wing_id: string;
	floor: number;
	type: string;
	area_sqft: number;
	status: string;
}

interface UpdateApartmentResponse {
	success: boolean;
	message: string;
}

export function useUpdateApartment() {
	const societyId = useAuthStore((s) => s.user?.society_id);
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: ({ flat_id, ...payload }: UpdateApartmentPayload) =>
			put<UpdateApartmentResponse>(`/v2/saksham/society/update-apartment`, {
				...payload,
				society_id: societyId,
				flat_id,
			}),
		onSuccess: (data) => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ["apartments", societyId] });
				toast({
					title: "Success",
					description: data.message || "Apartment updated successfully.",
					variant: "default",
				});
			}
		},
		onError: (error: AxiosError<{ message?: string }>) => {
			const message =
				error?.response?.data?.message ||
				"Failed to update apartment. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		},
	});

	return mutation;
}
