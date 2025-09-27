import * as React from "react";
import { toast } from "sonner";
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
import { useAddWing } from "@/hooks/wings/useAddWing";
import type { Wing } from "@/hooks/wings/useGetWings";
import { useUpdateWing } from "@/hooks/wings/useUpdateWing";

interface AddWingDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	mode: "add" | "edit";
	initialData?: Wing;
}

export function AddWingDialog({
	open,
	onOpenChange,
	mode,
	initialData,
}: AddWingDialogProps) {
	const [formData, setFormData] = React.useState({
		wing_name: "",
		floors: "",
		number_of_apartments: "",
	});

	React.useEffect(() => {
		if (open && initialData) {
			setFormData({
				wing_name: initialData.wing_name,
				floors: initialData.floors.toString(),
				number_of_apartments: initialData.number_of_apartments.toString(),
			});
		} else if (open && mode === "add") {
			setFormData({ wing_name: "", floors: "", number_of_apartments: "" });
		}
	}, [open, mode, initialData]);

	const addWingMutation = useAddWing();
	const updateWingMutation = useUpdateWing();

	const isEdit = mode === "edit";
	const isPending = isEdit
		? updateWingMutation.isPending
		: addWingMutation.isPending;

	const handleInputChange = (field: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const wingName = formData.wing_name.trim();
		const floors = parseInt(formData.floors, 10);
		const numberOfApartments = parseInt(formData.number_of_apartments, 10);

		if (
			!wingName ||
			isNaN(floors) ||
			isNaN(numberOfApartments) ||
			floors <= 0 ||
			numberOfApartments <= 0
		) {
			toast.error("Please fill all fields with valid positive numbers.");
			return;
		}

		if (isEdit) {
			updateWingMutation.mutate(
				{
					wing_id: initialData!.wing_id,
					wing_name: wingName,
					floors,
					number_of_apartments: numberOfApartments,
				},
				{
					onSuccess: () => {
						toast.success("Wing updated successfully!");
						onOpenChange(false);
						setFormData({
							wing_name: "",
							floors: "",
							number_of_apartments: "",
						});
					},
					onError: (error: any) => {
						const errorMsg =
							error.response?.data?.detail?.[0]?.msg ||
							"Failed to update wing. Please try again.";
						toast.error(errorMsg);
					},
				},
			);
		} else {
			addWingMutation.mutate(
				{
					wing_name: wingName,
					floors,
					number_of_apartments: numberOfApartments,
				},
				{
					onSuccess: () => {
						toast.success("Wing added successfully!");
						onOpenChange(false);
						setFormData({
							wing_name: "",
							floors: "",
							number_of_apartments: "",
						});
					},
					onError: (error: any) => {
						const errorMsg =
							error.response?.data?.detail?.[0]?.msg ||
							"Failed to add wing. Please try again.";
						toast.error(errorMsg);
					},
				},
			);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{isEdit ? "Edit Wing" : "Add New Wing"}</DialogTitle>
					<DialogDescription>
						{isEdit
							? "Update the details for the wing."
							: "Enter the details for the new wing. This will be added to your society."}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="wing_name">Wing Name</Label>
						<Input
							id="wing_name"
							placeholder="e.g., Wing A"
							value={formData.wing_name}
							onChange={(e) => handleInputChange("wing_name", e.target.value)}
							required
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="floors">Number of Floors</Label>
							<Input
								id="floors"
								type="number"
								min="1"
								placeholder="e.g., 10"
								value={formData.floors}
								onChange={(e) => handleInputChange("floors", e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="number_of_apartments">Number of Apartments</Label>
							<Input
								id="number_of_apartments"
								type="number"
								min="1"
								placeholder="e.g., 50"
								value={formData.number_of_apartments}
								onChange={(e) =>
									handleInputChange("number_of_apartments", e.target.value)
								}
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isPending}>
							{isPending
								? isEdit
									? "Updating..."
									: "Adding..."
								: isEdit
									? "Update Wing"
									: "Add Wing"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
