import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect } from "react";
import { get } from "@/components/configurations/axios-config/Axiosclient";
import { useToast } from "@/components/ui/use-toast";
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
	const { toast } = useToast();

	const query = useQuery<WingResponse>({
		queryKey: ["wings", societyId, page, perPage],
		queryFn: () =>
			get<WingResponse>(
				`/society/get-all-wings?society_id=${societyId}&page=${page}&per_page=${perPage}`,
			),
		enabled: !!societyId,
		placeholderData: keepPreviousData,
	});

	useEffect(() => {
		if (query.isError) {
			const err = query.error as AxiosError<{ message?: string }>;
			const message =
				err?.response?.data?.message ||
				"Failed to fetch wings. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		}
	}, [query.isError, query.error, toast]);

	return query;
}
