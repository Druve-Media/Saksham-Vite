import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";

export const useDeleteBooking = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	return useMutation({
		mutationFn: (booking_id: string) =>
			apiClient.delete(`/bookings/${booking_id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bookings"] });
			toast({
				variant: "default",
				title: "Success",
				description: "Booking deleted successfully.",
			});
		},
		onError: (error) => {
			toast({
				variant: "destructive",
				title: "Error",
				description: `Failed to delete booking: ${error.message}`,
			});
		},
	});
};
