// // src/beans/society/user-form.ts
// export interface UserFormValues {
//   id?: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   status: "Active" | "Inactive";
// }

interface UserFormValues {
	user: {
		name: string;
		phone: string;
		email: string;
		agent_id: string;
	};
	role: {
		flat_id: string;
		society_id: string;
		role: string;
		tenancy_start: string;
		tenancy_end: string;
		is_active: boolean;
	};
}
interface Apartment {
	id: string;
	name: string;
}
interface UserDialogProps {
	open: boolean;
	mode: "add" | "edit";
	initialData?: UserFormValues;
	onClose: () => void;
	onSubmit: (data: UserFormValues) => void;
	apartments: Apartment[];
}
