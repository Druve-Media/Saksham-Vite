import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGetAmenities } from "@/hooks/amenities/useGetAmenities";
import { useAddBooking } from "@/hooks/bookings/useAddBooking";
import { useUpdateBooking } from "@/hooks/bookings/useUpdateBooking";
import { cn } from "@/lib/utils";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	booking?: {
		booking_id: string;
		amenity_name: string;
		booking_date: string;
		booking_time: string;
		user_name?: string;
		time_duration?: number;
		max_capacity?: number;
	};
	isEdit?: boolean;
	isView?: boolean;
	onSuccess?: () => void;
}

const formSchema = z.object({
	amenityId: z.string().min(1, "Amenity is required"),
	date: z.date({ message: "Date is required" }),
	timeSlot: z.string().min(1, "Time slot is required"),
});

type FormValues = z.infer<typeof formSchema>;

const timeSlots = [
	"08:00 AM",
	"08:20 AM",
	"09:20 AM",
	"10:00 AM",
	"10:40 AM",
	"11:20 AM",
	"12:00 PM",
	"12:40 PM",
	"01:20 PM",
	"02:00 PM",
	"02:40 PM",
	"03:20 PM",
	"04:00 PM",
	"04:40 PM",
	"05:20 PM",
	"06:00 PM",
	"06:40 PM",
	"07:20 PM",
];

function slotToTime(slot: string): string {
	const [time, period] = slot.split(" ");
	let [hours, minutes] = time.split(":").map(Number);
	if (period === "PM" && hours !== 12) {
		hours += 12;
	} else if (period === "AM" && hours === 12) {
		hours = 0;
	}
	return `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:00.000Z`;
}

function getSlotFromTime(timeStr: string): string {
	const time = new Date(timeStr);
	const hours = time.getUTCHours();
	const minutes = time.getUTCMinutes();
	const period = hours >= 12 ? "PM" : "AM";
	let displayHours = hours % 12;
	if (displayHours === 0) displayHours = 12;
	const slotTime = `${displayHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
	// Find closest slot
	return (
		timeSlots.find((slot) =>
			slot.includes(`${displayHours}:${minutes.toString().padStart(2, "0")}`),
		) || slotTime
	);
}

export default function AddBookingAmenity({
	open,
	onOpenChange,
	booking,
	isEdit = false,
	isView = false,
	onSuccess,
}: Props) {
	const { data: amenities = [] } = useGetAmenities();
	const { mutate: addMutate, isPending: isAddPending } = useAddBooking();
	const { mutate: updateMutate, isPending: isUpdatePending } =
		useUpdateBooking();
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		mode: "onSubmit",
		defaultValues: {
			amenityId: "",
			date: new Date(),
			timeSlot: "",
		},
	});

	useEffect(() => {
		if (open) {
			if ((isEdit || isView) && booking && amenities.length > 0) {
				const matchingAmenity = amenities.find(
					(a) => a.amenity_name === booking.amenity_name,
				);
				form.reset({
					amenityId: matchingAmenity?.amenity_id || "",
					date: new Date(booking.booking_date),
					timeSlot: getSlotFromTime(booking.booking_time),
				});
			} else {
				form.reset({
					amenityId: "",
					date: new Date(),
					timeSlot: "",
				});
			}
		}
	}, [open, booking, isEdit, isView, amenities, form]);

	const isPending = isEdit ? isUpdatePending : isAddPending;

	const onSubmit = (values: FormValues) => {
		if (isView) {
			onOpenChange(false);
			return;
		}
		const bookingDate = values.date.toISOString().split("T")[0];
		const bookingTime = slotToTime(values.timeSlot);
		const payload = {
			amenity_id: values.amenityId,
			booking_date: bookingDate,
			booking_time: bookingTime,
		};
		if (isEdit && booking) {
			updateMutate(
				{ ...payload, booking_id: booking.booking_id },
				{
					onSuccess: () => {
						form.reset();
						onSuccess?.();
					},
				},
			);
		} else {
			addMutate(payload, {
				onSuccess: () => {
					form.reset();
					onSuccess?.();
				},
			});
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
					<DialogTitle>
						{isView
							? "View Booking"
							: isEdit
								? "Edit Booking"
								: "Add Book Amenity"}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 py-4"
					>
						<FormField
							control={form.control}
							name="amenityId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Choose Amenity *</FormLabel>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										disabled={isView}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select Amenity" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{amenities.map((amenity) => (
												<SelectItem
													key={amenity.amenity_id}
													value={amenity.amenity_id}
												>
													{amenity.amenity_name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Booking Date *</FormLabel>
									<FormControl>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													className={cn(
														"w-full justify-start text-left font-normal",
														!field.value && "text-muted-foreground",
														isView && "cursor-not-allowed opacity-50",
													)}
													disabled={isView}
												>
													{field.value ? (
														field.value.toLocaleDateString("en-GB", {
															day: "2-digit",
															month: "long",
															year: "numeric",
														})
													) : (
														<span>Pick a date</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={isView}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="timeSlot"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Booking Time *</FormLabel>
									<FormControl>
										<div className="grid grid-cols-4 gap-2">
											{timeSlots.map((slot) => (
												<Button
													key={slot}
													type="button"
													variant="outline"
													className={cn(
														"text-sm",
														field.value === slot &&
															"bg-[#ffb400] text-white border-[#ffb400]",
														isView && "cursor-not-allowed opacity-50",
													)}
													onClick={() => field.onChange(slot)}
													disabled={isView}
												>
													{slot}
												</Button>
											))}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={handleClose}
								className="border-[#ffb400] bg-[#ffb400] text-white hover:bg-[#ffb400]/80 cursor-pointer"
							>
								Cancel
							</Button>
							<Button
								type="submit"
								disabled={isPending || isView}
								className="bg-[#1a5fd8] hover:bg-[#1a5fd8]/80 cursor-pointer text-white"
							>
								{isPending
									? "Saving..."
									: isView
										? "Close"
										: isEdit
											? "Update"
											: "Save"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
