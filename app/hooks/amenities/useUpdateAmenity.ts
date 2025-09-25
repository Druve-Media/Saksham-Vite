import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { patch } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/query-client";

export const useUpdateAmenity = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: (payload: any) =>
			patch<{ message?: string }>("/amenities/update-amenity", payload),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["amenities"] });
			if (data?.message) {
				toast({
					title: "Success",
					description: data.message || "Amenity updated successfully!",
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
						"Failed to update amenity. Please try again.",
					variant: "destructive",
				});
			}
		},
	});
};
