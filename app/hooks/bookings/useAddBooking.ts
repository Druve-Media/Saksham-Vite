import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";

export const useAddBooking = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	return useMutation({
		mutationFn: (payload: {
			amenity_id: string;
			booking_date: string;
			booking_time: string;
		}) => apiClient.post("/bookings/add-booking", payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bookings"] });
			toast({
				variant: "default",
				title: "Success",
				description: "Booking added successfully.",
			});
		},
		onError: (error) => {
			toast({
				variant: "destructive",
				title: "Error",
				description: `Failed to add booking: ${error.message}`,
			});
		},
	});
};
