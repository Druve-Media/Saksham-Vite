import { useEffect, useState } from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const amenityStatuses = [
	"Available",
	"Booked",
	"Under Maintenance",
	"Out of Service",
];

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
	const [form, setForm] = useState({
		amenity_name: "",
		time_duration: 1,
		max_capacity: 1,
		amenity_status: "Available" as AmenityStatus,
		start_time: "",
		end_time: "",
		location: "",
	});

	const isEdit = !!amenityId;
	const { data: amenity, isLoading: isAmenityLoading } = useGetAmenityById(
		amenityId || "",
	);
	const { mutate: addAmenity, isPending: isAdding } = useAddAmenity();
	const { mutate: updateAmenity, isPending: isUpdating } = useUpdateAmenity();

	useEffect(() => {
		if (isEdit && amenity && !isAmenityLoading) {
			const timeFormat = (timeStr: string) => {
				if (timeStr) {
					const parts = timeStr.split(":");
					return `${parts[0]}:${parts[1]}`;
				}
				return "";
			};
			setForm({
				amenity_name: amenity.amenity_name,
				time_duration: amenity.time_duration,
				max_capacity: amenity.max_capacity,
				amenity_status: amenity.amenity_status as AmenityStatus,
				start_time: timeFormat(amenity.start_time),
				end_time: timeFormat(amenity.end_time),
				location: amenity.location,
			});
		} else if (!isEdit && isOpen) {
			setForm({
				amenity_name: "",
				time_duration: 1,
				max_capacity: 1,
				amenity_status: "Available",
				start_time: "",
				end_time: "",
				location: "",
			});
		}
	}, [isEdit, amenity, isAmenityLoading, isOpen]);

	const handleSubmit = () => {
		const startTime = form.start_time ? `${form.start_time}:00.000Z` : "";
		const endTime = form.end_time ? `${form.end_time}:00.000Z` : "";

		if (!form.amenity_name || !form.location || !startTime || !endTime) {
			// TODO: Add toast error notification
			return;
		}

		const payload = {
			amenity_name: form.amenity_name,
			time_duration: form.time_duration,
			max_capacity: form.max_capacity,
			amenity_status: form.amenity_status,
			start_time: startTime,
			end_time: endTime,
			location: form.location,
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
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="amenity_name">Amenity Name *</Label>
						<Input
							id="amenity_name"
							placeholder="e.g., Swimming Pool"
							value={form.amenity_name}
							onChange={(e) =>
								setForm((f) => ({ ...f, amenity_name: e.target.value }))
							}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="location">Location *</Label>
						<Input
							id="location"
							placeholder="e.g., Rooftop"
							value={form.location}
							onChange={(e) =>
								setForm((f) => ({ ...f, location: e.target.value }))
							}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="time_duration">Time Duration (hours) *</Label>
							<Input
								id="time_duration"
								type="number"
								min="1"
								value={form.time_duration}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										time_duration: parseInt(e.target.value) || 1,
									}))
								}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="max_capacity">Max Capacity *</Label>
							<Input
								id="max_capacity"
								type="number"
								min="1"
								value={form.max_capacity}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										max_capacity: parseInt(e.target.value) || 1,
									}))
								}
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="start_time">Start Time *</Label>
							<Input
								id="start_time"
								type="time"
								value={form.start_time}
								onChange={(e) =>
									setForm((f) => ({ ...f, start_time: e.target.value }))
								}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="end_time">End Time *</Label>
							<Input
								id="end_time"
								type="time"
								value={form.end_time}
								onChange={(e) =>
									setForm((f) => ({ ...f, end_time: e.target.value }))
								}
							/>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="amenity_status">Status *</Label>
						<Select
							value={form.amenity_status}
							onValueChange={(value) =>
								setForm((f) => ({
									...f,
									amenity_status: value as AmenityStatus,
								}))
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select Status" />
							</SelectTrigger>
							<SelectContent>
								{amenityStatuses.map((status) => (
									<SelectItem key={status} value={status}>
										{status}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={handleClose}>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
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
			</DialogContent>
		</Dialog>
	);
}
