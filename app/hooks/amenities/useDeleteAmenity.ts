import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { deleteReq } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { queryClient } from "@/lib/query-client";

export const useDeleteAmenity = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: (amenityId: string) =>
			deleteReq<{ message?: string }>("/amenities/delete-amenity", {
				amenity_id: amenityId,
			}),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["amenities"] });
			if (data?.message) {
				toast({
					title: "Success",
					description: data.message || "Amenity deleted successfully!",
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
						"Failed to delete amenity. Please try again.",
					variant: "destructive",
				});
			}
		},
	});
};
