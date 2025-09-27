import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/auth-store";

interface Apartment {
	flat_id: string;
	flat_no: string;
	floor: number;
	type: string;
	area_sqft: number;
	status: string;
	wing_name: string;
	society_name: string;
}

interface ApartmentsResponse {
	total: number;
	page: number;
	per_page: number;
	items: Apartment[];
}

export function useGetAllApartments() {
	const societyId = useAuthStore((s) => s.user?.society_id);
	const { toast } = useToast();

	const query = useQuery<ApartmentsResponse>({
		queryKey: ["all-apartments", societyId],
		queryFn: () =>
			get<ApartmentsResponse>(
				`/v2/saksham/society/get-all-apartments-in-society`,
				{
					society_id: societyId,
					page: "1",
					per_page: "1000",
				},
			),
		enabled: !!societyId,
	});

	useEffect(() => {
		if (query.isError) {
			const err = query.error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to fetch apartments. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		}
	}, [query.isError, query.error, toast]);

	return query;
}
