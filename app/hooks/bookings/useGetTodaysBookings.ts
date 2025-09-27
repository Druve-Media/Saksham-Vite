import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/auth-store";
import type { Booking } from "./useGetBookings";

interface TodaysBookingsResponse {
	bookings: Booking[];
	message?: string;
}

export function useGetTodaysBookings() {
	const societyId = useAuthStore((s) => s.user?.society_id);
	console.log(societyId, "societyId societyId");
	const { toast } = useToast();

	const query = useQuery<TodaysBookingsResponse>({
		queryKey: ["todays-bookings", societyId],
		queryFn: () =>
			get<TodaysBookingsResponse>("/bookings/get-todays-booking", {
				society_id: societyId,
			}),
		enabled: !!societyId,
	});

	useEffect(() => {
		if (query.isError) {
			const err = query.error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to fetch today's bookings. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		}
	}, [query.isError, query.error, toast]);

	const data = query.data?.bookings || [];
	const message = query.data?.message;

	return {
		...query,
		data,
		message,
	};
}
