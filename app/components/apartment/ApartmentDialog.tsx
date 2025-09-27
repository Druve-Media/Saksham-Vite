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

export function ApartmentDialog({
	open,
	onOpenChange,
	mode,
	initialData,
	onClose,
}: ApartmentDialogProps) {
	const wings = useGetWings(1, 100);
	const [selectedWing, setSelectedWing] = useState<Wing | null>(null);
	const [formData, setFormData] = useState({
		wingId: "",
		flat_no: "",
		floor: "",
		type: "",
		area_sqft: "",
		status: "",
	});

	const { mutateAsync: addApartment } = useAddApartment();
	const { mutateAsync: updateApartment } = useUpdateApartment();

	useEffect(() => {
		if (open) {
			if (mode === "edit" && initialData) {
				setFormData({
					wingId: "",
					flat_no: initialData.flat_no,
					floor: initialData.floor.toString(),
					type: initialData.type,
					area_sqft: initialData.area_sqft.toString(),
					status: initialData.status,
				});
			} else {
				setFormData({
					wingId: "",
					flat_no: "",
					floor: "",
					type: "",
					area_sqft: "",
					status: "",
				});
			}
		}
	}, [open, mode, initialData]);

	useEffect(() => {
		if (
			mode === "edit" &&
			initialData &&
			wings.data?.items.length &&
			formData.wingId === ""
		) {
			const wing = wings.data.items.find(
				(w) => w.wing_name === initialData.wing_name,
			);
			if (wing) {
				setSelectedWing(wing);
				setFormData((prev) => ({ ...prev, wingId: wing.wing_id }));
			}
		}
	}, [wings.data, initialData, mode, formData.wingId]);

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
		setFormData((prev) => ({ ...prev, wingId: value, floor: "" }));
	};

	const handleSubmit = async () => {
		try {
			const payload = {
				flat_no: formData.flat_no,
				wing_id: formData.wingId,
				floor: parseInt(formData.floor, 10),
				type: formData.type,
				area_sqft: parseInt(formData.area_sqft, 10),
				status: formData.status,
			};

			if (mode === "add") {
				await addApartment(payload);
			} else if (mode === "edit" && initialData) {
				await updateApartment({ flat_id: initialData.flat_id, ...payload });
			}

			onOpenChange(false);
			if (onClose) onClose();
		} catch (error) {
			// Errors handled in mutations
			console.error(`Failed to ${mode} apartment:`, error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
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
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="flat_no">Flat No *</Label>
							<Input
								id="flat_no"
								placeholder="204"
								value={formData.flat_no}
								onChange={(e) =>
									setFormData({
										...formData,
										flat_no: e.target.value,
									})
								}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="wing">Wing *</Label>
							<Select onValueChange={handleWingChange} value={formData.wingId}>
								<SelectTrigger>
									<SelectValue placeholder="Select Wing" />
								</SelectTrigger>
								<SelectContent>
									{wings.data?.items.map((wing) => (
										<SelectItem key={wing.wing_id} value={wing.wing_id}>
											{wing.wing_name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="floor">Floor *</Label>
							<Select
								onValueChange={(value) =>
									setFormData({ ...formData, floor: value })
								}
								value={formData.floor}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select Floor" />
								</SelectTrigger>
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
						</div>
						<div className="grid gap-2">
							<Label htmlFor="type">Apartment Type *</Label>
							<Select
								onValueChange={(value) =>
									setFormData({ ...formData, type: value })
								}
								value={formData.type}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select Type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="2BHK">2BHK</SelectItem>
									<SelectItem value="3BHK">3BHK</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="area_sqft">Area (sq ft) *</Label>
							<Input
								id="area_sqft"
								type="number"
								placeholder="1000"
								value={formData.area_sqft}
								onChange={(e) =>
									setFormData({
										...formData,
										area_sqft: e.target.value,
									})
								}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="status">Status *</Label>
							<Select
								onValueChange={(value) =>
									setFormData({ ...formData, status: value })
								}
								value={formData.status}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Occupied">Occupied</SelectItem>
									<SelectItem value="Unsold">Unsold</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						className="bg-[#1a5fd8] hover:bg-[#1a5fd8]/80"
					>
						{mode === "add" ? "Add" : "Update"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
