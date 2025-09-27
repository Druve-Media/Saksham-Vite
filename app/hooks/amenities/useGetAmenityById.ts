import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";

import type { Amenity } from "./useGetAmenities";

export function useGetAmenityById(amenityId: string) {
	const { toast } = useToast();

	const query = useQuery<Amenity>({
		queryKey: ["amenity", amenityId],
		queryFn: () =>
			get<Amenity>(`/amenities/get-single-amenity?amenity_id=${amenityId}`),
		enabled: !!amenityId,
	});

	useEffect(() => {
		if (query.isError) {
			const err = query.error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to fetch amenity. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		}
	}, [query.isError, query.error, toast]);

	return query;
}
