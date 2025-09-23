export interface SocietyResponse {
	society: {
		society_id: string;
		society_name: string;
		locality: string;
		city: string;
		district: string;
		state: string;
		pincode: number;
	};
	overview: {
		total_wings: number;
		total_apartments: number;
		total_residents: number;
		roles: {
			Owner: number;
			Resident: number;
			Secretary: number;
		};
	};
}
