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

export function useGetApartments(
	page: number = 1,
	per_page: number = 10,
	status?: string,
	wing_name?: string,
	type?: string,
) {
	const societyId = useAuthStore((s) => s.user?.society_id);
	const { toast } = useToast();

	const params = {
		society_id: societyId,
		page: page.toString(),
		per_page: per_page.toString(),
		...(status && status !== "all" && { status }),
		...(wing_name && wing_name !== "all" && { wing_name }),
		...(type && type !== "all" && { type }),
	};

	const query = useQuery<ApartmentsResponse>({
		queryKey: [
			"apartments",
			societyId,
			page,
			per_page,
			status,
			wing_name,
			type,
		],
		queryFn: () =>
			get<ApartmentsResponse>(`/society/get-all-apartments-in-society`, params),
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
