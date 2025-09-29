import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAddApartment } from "@/hooks/apartments/useAddApartment";
import { useUpdateApartment } from "@/hooks/apartments/useUpdateApartment";
import { useGetWings, type Wing } from "@/hooks/wings/useGetWings";

interface Apartment {
	flat_id: string;
	flat_no: string;
	floor: number;
	type: string;
	area_sqft: number;
	status: string;
	wing_name: string;
	society_name: string;
	wing_id?: string;
}

interface ApartmentDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	mode: "add" | "edit";
	initialData?: Apartment | null;
	onClose?: () => void;
}

const formSchema = z.object({
	wingId: z.string().min(1, "Wing is required"),
	flat_no: z.string().min(1, "Flat No is required"),
	floor: z
		.string()
		.min(1, "Floor is required")
		.refine(
			(val) => !isNaN(Number(val)) && Number(val) >= 0,
			"Floor must be a valid number >= 0",
		),
	type: z
		.string()
		.min(1, "Apartment type is required")
		.refine(
			(val) => ["2BHK", "3BHK"].includes(val),
			"Apartment type must be 2BHK or 3BHK",
		),
	area_sqft: z
		.string()
		.min(1, "Area is required")
		.refine(
			(val) => !isNaN(Number(val)) && Number(val) >= 1,
			"Area must be a valid number >= 1 sq ft",
		),
	status: z
		.string()
		.min(1, "Status is required")
		.refine(
			(val) => ["Occupied", "Unsold"].includes(val),
			"Status must be Occupied or Unsold",
		),
});

type FormValues = z.infer<typeof formSchema>;

export function ApartmentDialog({
	open,
	onOpenChange,
	mode,
	initialData,
	onClose,
}: ApartmentDialogProps) {
	const wings = useGetWings(1, 100);
	const [selectedWing, setSelectedWing] = useState<Wing | null>(null);

	const { mutateAsync: addApartment } = useAddApartment();
	const { mutateAsync: updateApartment } = useUpdateApartment();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema) as Resolver<FormValues, any, FormValues>,
		mode: "onSubmit",
		defaultValues: {
			wingId: "",
			flat_no: "",
			floor: "",
			type: "",
			area_sqft: "",
			status: "",
		},
	});

	useEffect(() => {
		if (open) {
			if (mode === "edit" && initialData) {
				form.reset({
					wingId: "",
					flat_no: initialData.flat_no,
					floor: initialData.floor.toString(),
					type: initialData.type,
					area_sqft: initialData.area_sqft.toString(),
					status: initialData.status,
				});
				setSelectedWing(null);
			} else {
				form.reset({
					wingId: "",
					flat_no: "",
					floor: "",
					type: "",
					area_sqft: "",
					status: "",
				});
				setSelectedWing(null);
			}
		}
	}, [open, mode, initialData, form]);

	useEffect(() => {
		if (
			mode === "edit" &&
			initialData &&
			wings.data?.items.length &&
			form.getValues("wingId") === ""
		) {
			const wing = wings.data.items.find(
				(w) => w.wing_name === initialData.wing_name,
			);
			if (wing) {
				setSelectedWing(wing);
				form.setValue("wingId", wing.wing_id);
			}
		}
	}, [wings.data, initialData, mode, form]);

	const getFloorLabel = (floor: number): string => {
		if (floor === 0) return "Ground";
		const units = [
			"",
			"First",
			"Second",
			"Third",
			"Fourth",
			"Fifth",
			"Sixth",
			"Seventh",
			"Eighth",
			"Ninth",
			"Tenth",
			"Eleventh",
			"Twelfth",
			"Thirteenth",
			"Fourteenth",
			"Fifteenth",
			"Sixteenth",
			"Seventeenth",
			"Eighteenth",
			"Nineteenth",
			"Twentieth",
		];
		return units[floor] || `${floor}th`;
	};

	const handleWingChange = (value: string) => {
		const wing = wings.data?.items.find((w) => w.wing_id === value) || null;
		setSelectedWing(wing);
		form.setValue("wingId", value);
		form.setValue("floor", "");
	};

	const onSubmit = async (values: FormValues) => {
		try {
			const payload = {
				flat_no: values.flat_no,
				wing_id: values.wingId,
				floor: Number(values.floor),
				type: values.type,
				area_sqft: Number(values.area_sqft),
				status: values.status,
			};

			if (mode === "add") {
				await addApartment(payload);
			} else if (mode === "edit" && initialData) {
				await updateApartment({ flat_id: initialData.flat_id, ...payload });
			}

			form.reset();
			onOpenChange(false);
			if (onClose) onClose();
		} catch (error) {
			// Errors handled in mutations
			console.error(`Failed to ${mode} apartment:`, error);
		}
	};

	const handleClose = () => {
		form.reset();
		setSelectedWing(null);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>
						{mode === "add" ? "Add New Apartment" : "Edit Apartment"}
					</DialogTitle>
					<DialogDescription>
						{mode === "add"
							? "Enter the details for the new apartment below."
							: "Update the apartment details below."}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 py-4"
					>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="flat_no"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Flat No *</FormLabel>
										<FormControl>
											<Input placeholder="204" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="wingId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Wing *</FormLabel>
										<Select
											onValueChange={handleWingChange}
											value={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select Wing" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{wings.data?.items.map((wing) => (
													<SelectItem key={wing.wing_id} value={wing.wing_id}>
														{wing.wing_name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="floor"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Floor *</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select Floor" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{selectedWing
													? Array.from(
															{ length: selectedWing.floors + 1 },
															(_, i) => (
																<SelectItem key={i} value={i.toString()}>
																	{getFloorLabel(i)}
																</SelectItem>
															),
														)
													: null}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Apartment Type *</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select Type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="2BHK">2BHK</SelectItem>
												<SelectItem value="3BHK">3BHK</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="area_sqft"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Area (sq ft) *</FormLabel>
										<FormControl>
											<Input type="number" placeholder="1000" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status *</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select Status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Occupied">Occupied</SelectItem>
												<SelectItem value="Unsold">Unsold</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<Button type="button" variant="outline" onClick={handleClose}>
								Cancel
							</Button>
							<Button
								type="submit"
								className="bg-[#1a5fd8] hover:bg-[#1a5fd8]/80"
							>
								{mode === "add" ? "Add" : "Update"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
