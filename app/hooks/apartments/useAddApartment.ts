import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postRequest } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/auth-store";

interface AddApartmentPayload {
	flat_no: string;
	wing_id: string;
	floor: number;
	type: string;
	area_sqft: number;
	status: string;
}

interface AddApartmentResponse {
	success: boolean;
	message: string;
	flat_id?: string;
}

export function useAddApartment() {
	const societyId = useAuthStore((s) => s.user?.society_id);
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (payload: AddApartmentPayload) =>
			postRequest<AddApartmentResponse>(`/society/add-apartment`, {
				...payload,
				society_id: societyId,
			}),
		onSuccess: (data) => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ["apartments", societyId] });
				toast({
					title: "Success",
					description: data.message || "Apartment added successfully.",
					variant: "default",
				});
			}
		},
		onError: (error: AxiosError<{ message?: string }>) => {
			const message =
				error?.response?.data?.message ||
				"Failed to add apartment. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		},
	});

	return mutation;
}
