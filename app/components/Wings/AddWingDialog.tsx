import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { useAddWing } from "@/hooks/wings/useAddWing";
import type { Wing } from "@/hooks/wings/useGetWings";
import { useUpdateWing } from "@/hooks/wings/useUpdateWing";

interface AddWingDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	mode: "add" | "edit";
	initialData?: Wing;
}

const formSchema = z.object({
	wing_name: z.string().min(1, "Wing name is required"),
	floors: z
		.string()
		.min(1, "Number of floors is required")
		.refine((val) => !isNaN(Number(val)), "Must be a valid number")
		.refine((val) => Number(val) >= 1, "Number of floors must be at least 1"),
	number_of_apartments: z
		.string()
		.min(1, "Number of apartments is required")
		.refine((val) => !isNaN(Number(val)), "Must be a valid number")
		.refine(
			(val) => Number(val) >= 1,
			"Number of apartments must be at least 1",
		),
});

type FormValues = z.infer<typeof formSchema>;

export function AddWingDialog({
	open,
	onOpenChange,
	mode,
	initialData,
}: AddWingDialogProps) {
	const addWingMutation = useAddWing();
	const updateWingMutation = useUpdateWing();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema) as Resolver<FormValues, any, FormValues>,
		mode: "onSubmit",
		defaultValues: {
			wing_name: "",
			floors: "",
			number_of_apartments: "",
		},
	});

	React.useEffect(() => {
		if (open) {
			if (initialData) {
				form.reset({
					wing_name: initialData.wing_name,
					floors: initialData.floors.toString(),
					number_of_apartments: initialData.number_of_apartments.toString(),
				});
			} else if (mode === "add") {
				form.reset({
					wing_name: "",
					floors: "",
					number_of_apartments: "",
				});
			}
		}
	}, [open, mode, initialData, form]);

	const isEdit = mode === "edit";
	const isPending = isEdit
		? updateWingMutation.isPending
		: addWingMutation.isPending;

	const onSubmit = (values: FormValues) => {
		const wingName = values.wing_name.trim();
		const floorsNum = Number(values.floors);
		const apartmentsNum = Number(values.number_of_apartments);

		if (isEdit) {
			updateWingMutation.mutate(
				{
					wing_id: initialData!.wing_id,
					wing_name: wingName,
					floors: floorsNum,
					number_of_apartments: apartmentsNum,
				},
				{
					onSuccess: () => {
						toast.success("Wing updated successfully!");
						form.reset();
						onOpenChange(false);
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
					floors: floorsNum,
					number_of_apartments: apartmentsNum,
				},
				{
					onSuccess: () => {
						toast.success("Wing added successfully!");
						form.reset();
						onOpenChange(false);
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

	const handleClose = () => {
		form.reset();
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{isEdit ? "Edit Wing" : "Add New Wing"}</DialogTitle>
					<DialogDescription>
						{isEdit
							? "Update the details for the wing."
							: "Enter the details for the new wing. This will be added to your society."}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="wing_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Wing Name *</FormLabel>
									<FormControl>
										<Input placeholder="e.g., Wing A" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="floors"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Number of Floors *</FormLabel>
										<FormControl>
											<Input
												type="number"
												min="1"
												placeholder="e.g., 10"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="number_of_apartments"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Number of Apartments *</FormLabel>
										<FormControl>
											<Input
												type="number"
												min="1"
												placeholder="e.g., 50"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<Button type="button" variant="outline" onClick={handleClose}>
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
				</Form>
			</DialogContent>
		</Dialog>
	);
}
