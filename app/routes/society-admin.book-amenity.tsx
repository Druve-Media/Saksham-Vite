import {
	IconCalendar,
	IconDownload,
	IconEdit,
	IconFilter,
	IconPlus,
	IconTrash,
	IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import AddBookingAmenity from "@/components/bookAmenity/AddBookingAmenity";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useGetAmenities } from "@/hooks/amenities/useGetAmenities";
import { useDeleteBooking } from "@/hooks/bookings/useDeleteBooking";
import { useGetBookings } from "@/hooks/bookings/useGetBookings";

interface Booking {
	booking_id: string;
	amenity_name: string;
	user_name: string;
	booking_date: string;
	booking_time: string;
	time_duration: number;
	max_capacity: number;
}

export default function BookAmenityPage() {
	const { data: bookings = [], isLoading, error } = useGetBookings();
	const { data: amenities = [] } = useGetAmenities();
	const deleteMutation = useDeleteBooking();

	const [search, setSearch] = useState("");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		});
	};

	const formatTime = (timeString: string) => {
		const time = new Date(`2000-01-01T${timeString}`);
		return time.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	};

	const handleAddClick = () => {
		setSelectedBooking(null);
		setIsDialogOpen(true);
	};

	const handleEditClick = (booking: Booking) => {
		setSelectedBooking(booking);
		setIsDialogOpen(true);
	};

	const handleDelete = (bookingId: string) => {
		deleteMutation.mutate(bookingId);
	};

	// if (isLoading) {
	// 	return <div className="p-8">Loading bookings...</div>;
	// }

	// if (error) {
	// 	return <div className="p-8 text-red-500">Error loading bookings: {String(error)}</div>;
	// }

	return (
		<div className="p-8 space-y-6">
			<h1 className="text-2xl font-semibold">Book Amenity</h1>
			<div className="flex items-center gap-4 mt-6">
				<Input
					placeholder="Search Amenity by amenity name and user name"
					className="w-[320px]"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button
					variant="outline"
					size="sm"
					className="border-[#ffb400] bg-[#ffb400] text-white hover:bg-[#ffb400]/80 cursor-pointer"
					onClick={handleAddClick}
				>
					<IconPlus className="mr-2 h-4 w-4" /> Add
				</Button>
				<Button
					variant="outline"
					size="sm"
					className="border-[#ffb400] bg-[#ffb400] text-white hover:bg-[#ffb400]/80 cursor-pointer"
				>
					<IconFilter className="mr-2 h-4 w-4" /> FILTERS
				</Button>
				<div className="flex items-center gap-2">
					<div className="flex items-center border rounded px-2 py-1">
						<IconCalendar className="mr-2 h-4 w-4 text-muted-foreground" />
						<span>09/18/2025</span>
					</div>
					<span className="mx-2">To</span>
					<div className="flex items-center border rounded px-2 py-1">
						<IconCalendar className="mr-2 h-4 w-4 text-muted-foreground" />
						<span>09/18/2025</span>
					</div>
					<Button
						variant="outline"
						size="sm"
						className="border-[#1a5fd8] text-[#1a5fd8] hover:bg-[#1a5fd8]/10 cursor-pointer"
					>
						<IconX className="mr-2 h-4 w-4" /> RESET
					</Button>
				</div>
				<Button
					variant="outline"
					size="sm"
					className="border-[#ffb400] bg-[#ffb400] text-white hover:bg-[#ffb400]/80 cursor-pointer"
				>
					<IconDownload className="mr-2 h-4 w-4" /> Export
				</Button>
				<AddBookingAmenity
					open={isDialogOpen}
					onOpenChange={setIsDialogOpen}
					booking={selectedBooking || undefined}
					isEdit={!!selectedBooking}
					onSuccess={() => {
						setIsDialogOpen(false);
						setSelectedBooking(null);
					}}
				/>
			</div>
			<div className="mt-6">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]">
								<input type="checkbox" />
							</TableHead>
							<TableHead>BOOKING ID</TableHead>
							<TableHead>AMENITY NAME</TableHead>
							<TableHead>BOOKED BY</TableHead>
							<TableHead>BOOKING DATE</TableHead>
							<TableHead>BOOKING TIME</TableHead>
							<TableHead>SLOT TIME</TableHead>
							<TableHead>NUMBER OF PERSONS</TableHead>
							<TableHead>ACTION</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{bookings.map((b) => (
							<TableRow key={b.booking_id}>
								<TableCell>
									<input type="checkbox" />
								</TableCell>
								<TableCell>{b.booking_id}</TableCell>
								<TableCell className="font-semibold">
									{b.amenity_name}
								</TableCell>
								<TableCell className="font-semibold">{b.user_name}</TableCell>
								<TableCell>{formatDate(b.booking_date)}</TableCell>
								<TableCell>
									<Badge className="bg-[#1a5fd8]/10 text-[#1a5fd8] px-2 py-1 text-xs font-semibold">
										{formatTime(b.booking_time)}
									</Badge>
								</TableCell>
								<TableCell>{b.time_duration} min</TableCell>
								<TableCell>{b.max_capacity}</TableCell>
								<TableCell>
									<div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											className="border-[#1a5fd8] bg-[#1a5fd8] text-white hover:bg-[#1a5fd8]/80 cursor-pointer"
											onClick={() => handleEditClick(b)}
										>
											<IconEdit className="mr-2 h-4 w-4" /> UPDATE
										</Button>
										<DeleteDialog
											itemName={`booking ${b.booking_id}`}
											onDelete={() => handleDelete(b.booking_id)}
											trigger={
												<Button
													variant="outline"
													size="sm"
													className="border-[#ffb400] bg-[#ffb400] text-white hover:bg-[#ffb400]/80 cursor-pointer"
												>
													<IconTrash className="h-4 w-4" />
												</Button>
											}
										/>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
