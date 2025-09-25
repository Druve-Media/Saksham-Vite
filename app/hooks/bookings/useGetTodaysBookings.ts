import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/auth-store";
import type { Booking } from "./useGetBookings";

export function useGetTodaysBookings() {
	const societyId = useAuthStore((s) => s.user?.society_id);
	const { toast } = useToast();

	const query = useQuery<Booking[]>({
		queryKey: ["todays-bookings", societyId],
		queryFn: () =>
			get<Booking[]>("/bookings/get-todays-booking", { society_id: societyId }),
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

	return query;
}
