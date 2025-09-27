import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
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
	};
	isEdit?: boolean;
	onSuccess?: () => void;
}

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
	onSuccess,
}: Props) {
	const { data: amenities = [] } = useGetAmenities();
	const { mutate: addMutate, isPending: isAddPending } = useAddBooking();
	const { mutate: updateMutate, isPending: isUpdatePending } =
		useUpdateBooking();
	const [form, setForm] = useState({
		amenityId: "",
		date: new Date(),
		timeSlot: "",
	});

	useEffect(() => {
		if (isEdit && booking && amenities.length > 0) {
			const matchingAmenity = amenities.find(
				(a) => a.amenity_name === booking.amenity_name,
			);
			setForm({
				amenityId: matchingAmenity?.amenity_id || "",
				date: new Date(booking.booking_date),
				timeSlot: getSlotFromTime(booking.booking_time),
			});
		}
	}, [booking, isEdit, amenities]);

	const isPending = isEdit ? isUpdatePending : isAddPending;

	const handleSubmit = () => {
		if (!form.amenityId || !form.timeSlot) return;
		const bookingDate = form.date.toISOString().split("T")[0];
		const bookingTime = slotToTime(form.timeSlot);
		const payload = {
			amenity_id: form.amenityId,
			booking_date: bookingDate,
			booking_time: bookingTime,
		};
		if (isEdit && booking) {
			updateMutate(
				{ ...payload, booking_id: booking.booking_id },
				{
					onSuccess: () => {
						setForm({
							amenityId: "",
							date: new Date(),
							timeSlot: "",
						});
						onSuccess?.();
					},
				},
			);
		} else {
			addMutate(payload, {
				onSuccess: () => {
					setForm({
						amenityId: "",
						date: new Date(),
						timeSlot: "",
					});
					onSuccess?.();
				},
			});
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{isEdit ? "Edit Booking" : "Add Book Amenity"}
					</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<label htmlFor="amenity" className="text-sm font-medium">
							Choose Amenity *
						</label>
						<Select
							value={form.amenityId}
							onValueChange={(value) =>
								setForm((prev) => ({ ...prev, amenityId: value }))
							}
						>
							<SelectTrigger id="amenity">
								<SelectValue placeholder="Select Amenity" />
							</SelectTrigger>
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
					</div>
					<div className="grid gap-2">
						<label htmlFor="date" className="text-sm font-medium">
							Booking Date *
						</label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className={cn(
										"w-full justify-start text-left font-normal",
										!form.date && "text-muted-foreground",
									)}
								>
									{form.date.toLocaleDateString("en-GB", {
										day: "2-digit",
										month: "long",
										year: "numeric",
									})}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={form.date}
									onSelect={(date) => {
										setForm((prev) => ({ ...prev, date: date || prev.date }));
									}}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className="grid gap-2">
						<span className="text-sm font-medium">Booking Time *</span>
						<div className="grid grid-cols-4 gap-2">
							{timeSlots.map((slot) => (
								<Button
									key={slot}
									variant="outline"
									className={cn(
										"text-sm",
										form.timeSlot === slot &&
											"bg-[#ffb400] text-white border-[#ffb400]",
									)}
									onClick={() =>
										setForm((prev) => ({ ...prev, timeSlot: slot }))
									}
								>
									{slot}
								</Button>
							))}
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						type="button"
						onClick={handleSubmit}
						disabled={isPending || !form.amenityId || !form.timeSlot}
						className="bg-[#1a5fd8] hover:bg-[#1a5fd8]/80 cursor-pointer text-white"
					>
						{isPending ? "Saving..." : isEdit ? "Update" : "Save"}
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
						className="border-[#ffb400] bg-[#ffb400] text-white hover:bg-[#ffb400]/80 cursor-pointer"
					>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
