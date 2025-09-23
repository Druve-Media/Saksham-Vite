export interface SocietyAdminUser {
	user_id: string;
	name: string;
	phone: number;
	email: string;
}

export interface SocietyAdminRole {
	flat_id: string;
	society_id: string;
	role: string;
	tenancy_start: string;
	tenancy_end: string | null;
	is_active: boolean;
}

export interface SocietyAdmin {
	user: SocietyAdminUser;
	role: SocietyAdminRole[];
}
