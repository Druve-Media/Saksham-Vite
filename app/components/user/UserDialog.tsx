// // // src/components/society/UserDialog.tsx
// // import { useState, useEffect } from "react";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogFooter,
// // } from "@/components/ui/dialog";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Select,
// //   SelectTrigger,
// //   SelectContent,
// //   SelectItem,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import type { UserFormValues } from "@/beans/user/user-form";

// // interface UserDialogProps {
// //   open: boolean;
// //   mode: "add" | "edit";
// //   initialData?: UserFormValues;
// //   onClose: () => void;
// //   onSubmit: (data: UserFormValues) => void;
// // }

// // export function UserDialog({
// //   open,
// //   mode,
// //   initialData,
// //   onClose,
// //   onSubmit,
// // }: UserDialogProps) {
// //   const [form, setForm] = useState<UserFormValues>({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     role: "",
// //     status: "Active",
// //   });

// //   useEffect(() => {
// //     if (initialData) {
// //       setForm(initialData);
// //     } else {
// //       setForm({
// //         name: "",
// //         email: "",
// //         phone: "",
// //         role: "",
// //         status: "Active",
// //       });
// //     }
// //   }, [initialData, open]);

// //   const handleChange = (key: keyof UserFormValues, value: string) => {
// //     setForm((prev) => ({ ...prev, [key]: value }));
// //   };

// //   const handleSubmit = () => {
// //     onSubmit(form);
// //     onClose();
// //   };

// //   return (
// //     <Dialog open={open} onOpenChange={onClose}>
// //       <DialogContent className="sm:max-w-lg">
// //         <DialogHeader>
// //           <DialogTitle>{mode === "add" ? "Add User" : "Edit User"}</DialogTitle>
// //         </DialogHeader>

// //         <div className="space-y-4 py-2">
// //           <Input
// //             placeholder="Name"
// //             value={form.name}
// //             onChange={(e) => handleChange("name", e.target.value)}
// //           />
// //           <Input
// //             placeholder="Email"
// //             type="email"
// //             value={form.email}
// //             onChange={(e) => handleChange("email", e.target.value)}
// //           />
// //           <Input
// //             placeholder="Phone"
// //             type="tel"
// //             value={form.phone}
// //             onChange={(e) => handleChange("phone", e.target.value)}
// //           />
// //           <Input
// //             placeholder="Role"
// //             value={form.role}
// //             onChange={(e) => handleChange("role", e.target.value)}
// //           />
// //           <Select
// //             value={form.status}
// //             onValueChange={(val) =>
// //               handleChange("status", val as "Active" | "Inactive")
// //             }
// //           >
// //             <SelectTrigger>
// //               <SelectValue placeholder="Select status" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="Active">Active</SelectItem>
// //               <SelectItem value="Inactive">Inactive</SelectItem>
// //             </SelectContent>
// //           </Select>
// //         </div>

// //         <DialogFooter>
// //           <Button variant="outline" onClick={onClose}>
// //             Cancel
// //           </Button>
// //           <Button onClick={handleSubmit}>
// //             {mode === "add" ? "Add" : "Save"}
// //           </Button>
// //         </DialogFooter>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // }

// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";

// interface Apartment {
//   id: string;
//   name: string;
// }

// interface UserPayload {
//   user: {
//     name: string;
//     phone: string;
//     email: string;
//     agent_id: string;
//   };
//   role: {
//     flat_id: string;
//     society_id: string;
//     role: string;
//     tenancy_start: string;
//     tenancy_end: string;
//     is_active: boolean;
//   };
// }

// interface UserDialogProps {
//   open: boolean;
//   mode: "add" | "edit";
//   initialData?: UserPayload;
//   onClose: () => void;
//   onSubmit: (data: UserPayload) => void;
//   apartments: Apartment[]; // 👈 fetched from API
// }

// const mockRoles = ["Owner", "Tenant", "Admin", "Secretary", "Watchman"];

// export function UserDialog({
//   open,
//   mode,
//   initialData,
//   onClose,
//   onSubmit,
//   apartments,
// }: UserDialogProps) {
//   const [form, setForm] = useState<UserPayload>({
//     user: {
//       name: "",
//       phone: "",
//       email: "",
//       agent_id: "",
//     },
//     role: {
//       flat_id: "",
//       society_id: "",
//       role: "",
//       tenancy_start: "",
//       tenancy_end: "",
//       is_active: true,
//     },
//   });

//   useEffect(() => {
//     if (initialData) {
//       setForm(initialData);
//     } else {
//       setForm({
//         user: {
//           name: "",
//           phone: "",
//           email: "",
//           agent_id: "",
//         },
//         role: {
//           flat_id: "",
//           society_id: "",
//           role: "",
//           tenancy_start: "",
//           tenancy_end: "",
//           is_active: true,
//         },
//       });
//     }
//   }, [initialData, open]);

//   const handleUserChange = (key: keyof UserPayload["user"], value: string) => {
//     setForm((prev) => ({
//       ...prev,
//       user: { ...prev.user, [key]: value },
//     }));
//   };

//   const handleRoleChange = (key: keyof UserPayload["role"], value: any) => {
//     setForm((prev) => ({
//       ...prev,
//       role: { ...prev.role, [key]: value },
//     }));
//   };

//   const handleSubmit = () => {
//     onSubmit(form);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle>{mode === "add" ? "Add User" : "Edit User"}</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4 py-2">
//           {/* User Info */}
//           <Input
//             placeholder="Name"
//             value={form.user.name}
//             onChange={(e) => handleUserChange("name", e.target.value)}
//           />
//           <Input
//             placeholder="Email"
//             type="email"
//             value={form.user.email}
//             onChange={(e) => handleUserChange("email", e.target.value)}
//           />
//           <Input
//             placeholder="Phone"
//             type="tel"
//             value={form.user.phone}
//             onChange={(e) => handleUserChange("phone", e.target.value)}
//           />
//           <Input
//             placeholder="Agent ID"
//             value={form.user.agent_id}
//             onChange={(e) => handleUserChange("agent_id", e.target.value)}
//           />

//           {/* Apartment Dropdown */}
//           <Select
//             value={form.role.flat_id}
//             onValueChange={(val) => handleRoleChange("flat_id", val)}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select Apartment" />
//             </SelectTrigger>
//             <SelectContent>
//               {apartments.map((apt) => (
//                 <SelectItem key={apt.id} value={apt.id}>
//                   {apt.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           {/* Role + Status side by side */}
//           <div className="grid grid-cols-2 gap-4">
//             {/* Role */}
//             <Select
//               value={form.role.role}
//               onValueChange={(val) => handleRoleChange("role", val)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Role" />
//               </SelectTrigger>
//               <SelectContent>
//                 {mockRoles.map((r) => (
//                   <SelectItem key={r} value={r}>
//                     {r}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             {/* Status */}
//             <Select
//               value={form.role.is_active ? "true" : "false"}
//               onValueChange={(val) =>
//                 handleRoleChange("is_active", val === "true")
//               }
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="true">Active</SelectItem>
//                 <SelectItem value="false">Inactive</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Tenancy Dates */}
//           <div className="grid grid-cols-2 gap-4">
//             <Input
//               type="date"
//               value={form.role.tenancy_start}
//               onChange={(e) =>
//                 handleRoleChange("tenancy_start", e.target.value)
//               }
//             />
//             <Input
//               type="date"
//               value={form.role.tenancy_end}
//               onChange={(e) => handleRoleChange("tenancy_end", e.target.value)}
//             />
//           </div>
//         </div>

//         <DialogFooter>
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit}>
//             {mode === "add" ? "Add" : "Save"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const ROLES = ["Admin", "User", "Watchman", "Super Admin", "Secretary"];

export function UserDialog({
	open,
	mode,
	initialData,
	onClose,
	onSubmit,
	apartments,
}: UserDialogProps) {
	const [formData, setFormData] = useState<UserFormValues>({
		user: {
			name: "",
			phone: "",
			email: "",
			agent_id: "",
		},
		role: {
			flat_id: "",
			society_id: "",
			role: "",
			tenancy_start: "",
			tenancy_end: "",
			is_active: true,
		},
	});

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	const handleChange = (
		section: "user" | "role",
		field: string,
		value: any,
	) => {
		setFormData((prev) => ({
			...prev,
			[section]: { ...prev[section], [field]: value },
		}));
	};

	const handleSubmit = () => {
		onSubmit(formData);
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>{mode === "add" ? "Add User" : "Edit User"}</DialogTitle>
					<DialogDescription>
						{mode === "add"
							? "Fill the form to add a new user."
							: "Update the details of this user."}
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					{/* Full Name */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Full Name
						</Label>
						<Input
							id="name"
							value={formData.user.name}
							onChange={(e) => handleChange("user", "name", e.target.value)}
							className="col-span-3"
						/>
					</div>

					{/* Email */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="email" className="text-right">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							value={formData.user.email}
							onChange={(e) => handleChange("user", "email", e.target.value)}
							className="col-span-3"
						/>
					</div>

					{/* Phone */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="phone" className="text-right">
							Phone
						</Label>
						<Input
							id="phone"
							value={formData.user.phone}
							onChange={(e) => handleChange("user", "phone", e.target.value)}
							className="col-span-3"
						/>
					</div>

					{/* Apartment */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="flat_id" className="text-right">
							Apartment
						</Label>
						<Select
							value={formData.role.flat_id}
							onValueChange={(value) => handleChange("role", "flat_id", value)}
						>
							<SelectTrigger className="col-span-3">
								<SelectValue placeholder="Select apartment" />
							</SelectTrigger>
							<SelectContent>
								{apartments.map((apt) => (
									<SelectItem key={apt.id} value={apt.id}>
										{apt.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="role" className="text-right">
							Role
						</Label>
						<Select
							value={formData.role.role}
							onValueChange={(value) => handleChange("role", "role", value)}
						>
							<SelectTrigger className="col-span-3">
								<SelectValue placeholder="Select role" />
							</SelectTrigger>
							<SelectContent>
								{ROLES.map((role) => (
									<SelectItem key={role} value={role}>
										{role}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="role" className="text-right">
							Status
						</Label>
						<div className="col-span-3 grid grid-cols-2 gap-2">
							<Select
								value={formData.role.is_active ? "active" : "inactive"}
								onValueChange={(value) =>
									handleChange("role", "is_active", value === "active")
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="active">Active</SelectItem>
									<SelectItem value="inactive">Inactive</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Tenancy Start */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="tenancy_start" className="text-right">
							Tenancy Start
						</Label>
						<Input
							id="tenancy_start"
							type="date"
							value={formData.role.tenancy_start}
							onChange={(e) =>
								handleChange("role", "tenancy_start", e.target.value)
							}
							className="col-span-3"
						/>
					</div>

					{/* Tenancy End */}
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="tenancy_end" className="text-right">
							Tenancy End
						</Label>
						<Input
							id="tenancy_end"
							type="date"
							value={formData.role.tenancy_end || ""}
							onChange={(e) =>
								handleChange("role", "tenancy_end", e.target.value)
							}
							className="col-span-3"
						/>
					</div>
					{/* Role & Status in one row */}
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button
						style={{ backgroundColor: "#ffb400", color: "#1a5fd8" }}
						onClick={handleSubmit}
					>
						{mode === "add" ? "Add User" : "Update User"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
