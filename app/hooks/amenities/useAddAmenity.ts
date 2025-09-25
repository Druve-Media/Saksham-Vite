import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { postRequest } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/query-client";

export const useAddAmenity = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: (payload: any) =>
			postRequest<{ message?: string }>("/amenities/add-amenity", payload),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["amenities"] });
			if (data?.message) {
				toast({
					title: "Success",
					description: data.message || "Amenity added successfully!",
					variant: "default",
				});
			}
		},
		onError: (error: AxiosError<{ message?: string }>) => {
			if (error?.response?.data?.message) {
				toast({
					title: "Error",
					description:
						error.response.data.message ||
						"Failed to add amenity. Please try again.",
					variant: "destructive",
				});
			}
		},
	});
};
