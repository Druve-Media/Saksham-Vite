import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useAuthStore } from "@/stores/auth-store";

export interface Wing {
	wing_name?: string;
	society_id?: string;
	wing_id?: string;
	total_apartments?: number;
}

export interface WingResponse {
	total: number;
	page: number;
	per_page: number;
	items: Wing[];
}

export function useGetWings(page: number, perPage: number) {
	const societyId = useAuthStore((s) => s.user?.society_id);

	return useQuery<WingResponse>({
		queryKey: ["wings", societyId, page, perPage],
		queryFn: () =>
			get<WingResponse>(
				`/v2/society/get-all-wings?society_id=${societyId}&page=${page}&per_page=${perPage}`,
			),
		enabled: !!societyId,
		placeholderData: keepPreviousData,
	});
}
