"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { bookings } from "@/utils/data/bookings";

export default function TodayBookings() {
	const today = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		day: "2-digit",
		month: "short",
		year: "numeric",
	});

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
				{bookings.map((b, idx) => (
					<div key={idx}>
						<div className="flex items-center justify-between p-3">
							{/* Left side */}
							<div className="flex flex-col">
								<span className="text-sm font-medium text-muted-foreground">
									{b.startTime} - {b.endTime}
								</span>
								<span className="text-sm font-semibold">{b.bookedBy}</span>
							</div>

							{/* Right side - Amenity */}
							<Badge
								variant="secondary"
								className="px-3 py-1 text-sm"
								style={{
									backgroundColor: `${b.color}20`,
									color: b.color,
								}}
							>
								{b.amenity}
							</Badge>
						</div>

						{/* Separator except after last item */}
						{idx < bookings.length - 1 && (
							<Separator className="my-2 w-full h-1" />
						)}
					</div>
				))}
			</CardContent>
		</Card>
	);
}
