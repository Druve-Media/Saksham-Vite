import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { type Resolver, useForm } from "react-hook-form";
import * as z from "zod";

type AmenityStatus =
	| "Available"
	| "Booked"
	| "Under Maintenance"
	| "Out of Service";

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAddAmenity } from "@/hooks/amenities/useAddAmenity";
import { useGetAmenityById } from "@/hooks/amenities/useGetAmenityById";
import { useUpdateAmenity } from "@/hooks/amenities/useUpdateAmenity";
import { useAuthStore } from "@/stores/auth-store";

const amenityStatuses = [
	"Available",
	"Booked",
	"Under Maintenance",
	"Out of Service",
];

const formSchema = z.object({
	amenity_name: z.string().min(1, "Amenity name is required"),
	location: z.string().min(1, "Location is required"),
	time_duration: z.coerce
		.number()
		.min(1, "Time duration must be at least 1 hour"),
	max_capacity: z.coerce.number().min(1, "Max capacity must be at least 1"),
	start_time: z.string().min(1, "Start time is required"),
	end_time: z.string().min(1, "End time is required"),
	amenity_status: z.enum(amenityStatuses as [string, ...string[]], {
		message: "Status is required",
	}),
});

type FormValues = z.infer<typeof formSchema>;

interface AddAmenityProps {
	isOpen: boolean;
	onClose: () => void;
	amenityId?: string | null;
	onSuccess: () => void;
}

export default function AddAmenity({
	isOpen,
	onClose,
	amenityId,
	onSuccess,
}: AddAmenityProps) {
	const isEdit = !!amenityId;
	const { data: amenity, isLoading: isAmenityLoading } = useGetAmenityById(
		amenityId || "",
	);
	const { mutate: addAmenity, isPending: isAdding } = useAddAmenity();
	const { mutate: updateAmenity, isPending: isUpdating } = useUpdateAmenity();
	const societyId = useAuthStore((s) => s.user?.society_id);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema) as Resolver<FormValues>,
		mode: "onSubmit",
		defaultValues: {
			amenity_name: "",
			time_duration: 1,
			max_capacity: 1,
			amenity_status: "Available",
			start_time: "",
			end_time: "",
			location: "",
		},
	});

	useEffect(() => {
		if (isOpen) {
			if (isEdit && amenity && !isAmenityLoading) {
				const timeFormat = (timeStr: string) => {
					if (timeStr) {
						const parts = timeStr.split(":");
						return `${parts[0]}:${parts[1]}`;
					}
					return "";
				};
				form.reset({
					amenity_name: amenity.amenity_name,
					time_duration: amenity.time_duration,
					max_capacity: amenity.max_capacity,
					amenity_status: amenity.amenity_status as AmenityStatus,
					start_time: timeFormat(amenity.start_time),
					end_time: timeFormat(amenity.end_time),
					location: amenity.location,
				});
			} else if (!isEdit) {
				form.reset({
					amenity_name: "",
					time_duration: 1,
					max_capacity: 1,
					amenity_status: "Available",
					start_time: "",
					end_time: "",
					location: "",
				});
			}
		}
	}, [isEdit, amenity, isAmenityLoading, isOpen, form]);

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const startTime = values.start_time ? `${values.start_time}:00.000Z` : "";
		const endTime = values.end_time ? `${values.end_time}:00.000Z` : "";

		const payload = {
			amenity_name: values.amenity_name,
			time_duration: values.time_duration,
			max_capacity: values.max_capacity,
			amenity_status: values.amenity_status,
			start_time: startTime,
			end_time: endTime,
			location: values.location,
			society_id: societyId ?? "",
			...(isEdit && { amenity_id: amenityId }),
		};

		if (isEdit) {
			updateAmenity(payload, {
				onSuccess: () => {
					onClose();
					onSuccess();
				},
			});
		} else {
			addAmenity(payload, {
				onSuccess: () => {
					onClose();
					onSuccess();
				},
			});
		}
	};

	const handleClose = () => {
		form.reset();
		onClose();
	};

	const isSubmitting = isAdding || isUpdating;

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>
						{isEdit ? "Edit Amenity" : "Add New Amenity"}
					</DialogTitle>
					<DialogDescription>
						{isEdit
							? "Update the amenity details."
							: "Add a new amenity or facility to the community."}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 py-4"
					>
						<FormField
							control={form.control}
							name="amenity_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amenity Name *</FormLabel>
									<FormControl>
										<Input placeholder="e.g., Swimming Pool" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location *</FormLabel>
									<FormControl>
										<Input placeholder="e.g., Rooftop" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="time_duration"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Time Duration (hours) *</FormLabel>
										<FormControl>
											<Input type="number" min="1" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="max_capacity"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Max Capacity *</FormLabel>
										<FormControl>
											<Input type="number" min="1" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="start_time"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Start Time *</FormLabel>
										<FormControl>
											<Input type="time" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="end_time"
								render={({ field }) => (
									<FormItem>
										<FormLabel>End Time *</FormLabel>
										<FormControl>
											<Input type="time" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="amenity_status"
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
											{amenityStatuses.map((status) => (
												<SelectItem key={status} value={status}>
													{status}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="button" variant="outline" onClick={handleClose}>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isSubmitting || isAmenityLoading}
								className="bg-[#1a5fd8] hover:bg-[#1a5fd8]/80"
							>
								{isSubmitting
									? "Saving..."
									: isEdit
										? "Update Amenity"
										: "Add Amenity"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
