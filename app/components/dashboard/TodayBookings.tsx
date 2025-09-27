"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetTodaysBookings } from "@/hooks/bookings/useGetTodaysBookings";

export default function TodayBookings() {
	const today = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		day: "2-digit",
		month: "short",
		year: "numeric",
	});

	const query = useGetTodaysBookings();

	function parseTime(timeStr: string): Date {
		const [time] = timeStr.split(".");
		const [hours, minutes, seconds] = time.split(":").map(Number);
		const now = new Date();
		now.setHours(hours, minutes, seconds, 0);
		return now;
	}
	console.log(query.data, "query");

	function formatTime(date: Date): string {
		return date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	}

	function getEndTime(startTimeStr: string, duration: number): string {
		const start = parseTime(startTimeStr);
		const end = new Date(start.getTime() + duration * 60000);
		return formatTime(end);
	}

	return (
		<Card className="col-span-1">
			{/* Header */}
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle>Today's Bookings</CardTitle>
				<Badge variant="secondary" className="bg-[#1a5fd8]/20 text-[#1a5fd8]">
					{today}
				</Badge>
			</CardHeader>

			{/* Content */}
			<CardContent className="space-y-3">
				{(query.data || []).map((b, idx) => (
					<div key={b.booking_id}>
						<div className="flex items-center justify-between p-3">
							{/* Left side */}
							<div className="flex flex-col">
								<span className="text-sm font-medium text-muted-foreground">
									{formatTime(parseTime(b.booking_time))} -{" "}
									{getEndTime(b.booking_time, b.time_duration)}
								</span>
								<span className="text-sm font-semibold">{b.user_name}</span>
							</div>

							{/* Right side - Amenity */}
							<Badge
								variant="secondary"
								className="px-3 py-1 text-sm"
								style={{
									backgroundColor: "#1a5fd820",
									color: "#1a5fd8",
								}}
							>
								{b.amenity_name}
							</Badge>
						</div>

						{/* Separator except after last item */}
						{idx < (query.data?.length || 0) - 1 && (
							<Separator className="my-2 w-full h-1" />
						)}
					</div>
				))}
				{query?.data?.length === 0 && (
					<div className="flex items-center justify-center p-8 text-center">
						<p className="text-sm text-muted-foreground">
							{query.message || "No bookings for today."}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
