import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";

export interface Booking {
	user_id: string;
	user_name: string;
	amenity_name: string;
	time_duration: number;
	max_capacity: number;
	booking_id: string;
	booking_date: string;
	booking_time: string;
}

export function useGetBookings() {
	const { toast } = useToast();

	const query = useQuery<Booking[]>({
		queryKey: ["bookings"],
		queryFn: () => get<Booking[]>("/bookings/all-booking"),
	});

	useEffect(() => {
		if (query.isError) {
			const err = query.error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to fetch bookings. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		}
	}, [query.isError, query.error, toast]);

	return query;
}
