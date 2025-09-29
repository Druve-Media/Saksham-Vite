import {
	IconCalendar,
	IconEdit,
	IconEye,
	IconTrash,
	IconX,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import AddBookingAmenity from "@/components/bookAmenity/AddBookingAmenity";
import { CommonTable } from "@/components/CommonTable";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useGetAmenities } from "@/hooks/amenities/useGetAmenities";
import { useDeleteBooking } from "@/hooks/bookings/useDeleteBooking";
import { useGetBookings } from "@/hooks/bookings/useGetBookings";
import { cn } from "@/lib/utils";

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
	const queryClient = useQueryClient();
	const { data: bookings = [], isLoading, error } = useGetBookings();
	const { data: amenities = [] } = useGetAmenities();
	const deleteMutation = useDeleteBooking();

	const [startDate, setStartDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();

	const filteredBookings = bookings.filter((booking) => {
		const bookingDate = new Date(booking.booking_date);
		const start = startDate ? startDate : new Date(0);
		const end = endDate ? endDate : new Date(8640000000000000); // far future
		return bookingDate >= start && bookingDate <= end;
	});

	const handleResetDates = () => {
		setStartDate(undefined);
		setEndDate(undefined);
	};

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isView, setIsView] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const pageSize = 10;
	const total = filteredBookings.length || 0;
	const handlePageChange = (newPage: number) => setPage(newPage);

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
		setIsView(false);
		setIsDialogOpen(true);
	};

	const handleViewClick = (booking: Booking) => {
		setSelectedBooking(booking);
		setIsView(true);
		setIsDialogOpen(true);
	};

	const handleEditClick = (booking: Booking) => {
		setSelectedBooking(booking);
		setIsView(false);
		setIsDialogOpen(true);
	};

	const handleDeleteClick = (booking: Booking) => {
		setSelectedDeleteId(booking.booking_id);
		setDeleteOpen(true);
	};

	const handleConfirmDelete = () => {
		if (selectedDeleteId) {
			handleDelete(selectedDeleteId);
			setDeleteOpen(false);
			setSelectedDeleteId(null);
		}
	};

	const handleDelete = (bookingId: string) => {
		deleteMutation.mutate(bookingId, {
			onSuccess: () => {
				// Optimistically remove the deleted booking from local data
				queryClient.setQueryData(["bookings"], (old: Booking[] | undefined) =>
					old ? old.filter((booking) => booking.booking_id !== bookingId) : [],
				);
			},
		});
	};

	const handleExport = () => {
		console.log("Export filtered bookings", filteredBookings);
		// TODO: Implement export functionality for filtered data
	};

	const topBarExtras = (
		<div className="flex items-center gap-2">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"w-[200px] justify-start text-left font-normal",
							!startDate && "text-muted-foreground",
						)}
					>
						<IconCalendar className="mr-2 h-4 w-4" />
						{startDate ? (
							startDate.toLocaleDateString("en-GB", {
								day: "2-digit",
								month: "long",
								year: "numeric",
							})
						) : (
							<span>From</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={startDate}
						onSelect={setStartDate}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			<span className="flex items-center text-muted-foreground">To</span>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"w-[200px] justify-start text-left font-normal",
							!endDate && "text-muted-foreground",
						)}
					>
						<IconCalendar className="mr-2 h-4 w-4" />
						{endDate ? (
							endDate.toLocaleDateString("en-GB", {
								day: "2-digit",
								month: "long",
								year: "numeric",
							})
						) : (
							<span>To</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={endDate}
						onSelect={setEndDate}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			<Button
				variant="outline"
				size="sm"
				onClick={handleResetDates}
				className="border-[#1a5fd8] text-[#1a5fd8] hover:bg-[#1a5fd8]/10 cursor-pointer"
			>
				<IconX className="mr-2 h-4 w-4" /> RESET
			</Button>
		</div>
	);

	const columns: ColumnDef<Booking>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={() => row.toggleSelected()}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		// {
		//   accessorKey: "booking_id",
		//   header: "BOOKING ID",
		//   cell: ({ row }) => row.original.booking_id,
		// },
		{
			accessorKey: "amenity_name",
			header: "AMENITY NAME",
			cell: ({ row }) => (
				<span className="font-semibold">{row.original.amenity_name}</span>
			),
		},
		{
			accessorKey: "user_name",
			header: "BOOKED BY",
			cell: ({ row }) => (
				<span className="font-semibold">{row.original.user_name}</span>
			),
		},
		{
			accessorKey: "booking_date",
			header: "BOOKING DATE",
			cell: ({ row }) => formatDate(row.original.booking_date),
		},
		{
			id: "booking_time",
			header: "BOOKING TIME",
			cell: ({ row }) => (
				<Badge className="bg-[#1a5fd8]/10 text-[#1a5fd8] px-2 py-1 text-xs font-semibold">
					{formatTime(row.original.booking_time)}
				</Badge>
			),
		},
		{
			accessorKey: "time_duration",
			header: "SLOT TIME",
			cell: ({ row }) => `${row.original.time_duration} min`,
		},
		{
			accessorKey: "max_capacity",
			header: "NUMBER OF PERSONS",
			cell: ({ row }) => row.original.max_capacity,
		},
		{
			id: "actions",
			header: "ACTION",
			cell: ({ row }) => {
				const booking = row.original;
				return (
					<div className="flex gap-1">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0">
									<span className="sr-only">Open menu</span>
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => handleViewClick(booking)}>
									<IconEye className="mr-2 h-4 w-4" />
									View
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleEditClick(booking)}>
									<IconEdit className="mr-2 h-4 w-4" />
									Edit
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleDeleteClick(booking)}
									className="text-destructive focus:text-destructive"
								>
									<IconTrash className="mr-2 h-4 w-4" />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				);
			},
		},
	];

	return (
		<div className="p-8 space-y-6">
			<h1 className="text-2xl font-semibold">Book Amenity</h1>
			<CommonTable
				columns={columns}
				data={filteredBookings}
				page={page}
				pageSize={pageSize}
				total={filteredBookings.length}
				onPageChange={handlePageChange}
				searchable={true}
				searchPlaceholder="Search Amenity by amenity name and user name"
				addButtonLabel="Add"
				onAddClick={handleAddClick}
				exportButtonLabel="Export"
				onExportClick={handleExport}
				topBarExtras={topBarExtras}
				className="mt-6"
			/>
			<AddBookingAmenity
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				booking={selectedBooking || undefined}
				isEdit={!!selectedBooking && !isView}
				isView={isView}
				onSuccess={() => {
					setIsDialogOpen(false);
					setSelectedBooking(null);
					setIsView(false);
				}}
			/>
			<AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the
							booking {selectedDeleteId}.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							className="bg-destructive font-semibold hover:bg-destructive/80"
							onClick={handleConfirmDelete}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
