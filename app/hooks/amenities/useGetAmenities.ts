import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";

export interface Amenity {
	amenity_id: string;
	amenity_name: string;
	time_duration: number;
	max_capacity: number;
	amenity_status: string;
	start_time: string;
	end_time: string;
	location: string;
}

export function useGetAmenities() {
	const { toast } = useToast();

	const query = useQuery<Amenity[]>({
		queryKey: ["amenities"],
		queryFn: () => get<Amenity[]>("/amenities/get-all-amenities"),
	});

	useEffect(() => {
		if (query.isError) {
			const err = query.error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to fetch amenities. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		}
	}, [query.isError, query.error, toast]);

	return query;
}
