import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";

export const useUpdateBooking = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	return useMutation({
		mutationFn: (payload: {
			booking_id: string;
			amenity_id: string;
			booking_date: string;
			booking_time: string;
		}) =>
			apiClient.patch(`/bookings/${payload.booking_id}`, {
				amenity_id: payload.amenity_id,
				booking_date: payload.booking_date,
				booking_time: payload.booking_time,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bookings"] });
			toast({
				variant: "default",
				title: "Success",
				description: "Booking updated successfully.",
			});
		},
		onError: (error) => {
			toast({
				variant: "destructive",
				title: "Error",
				description: `Failed to update booking: ${error.message}`,
			});
		},
	});
};
