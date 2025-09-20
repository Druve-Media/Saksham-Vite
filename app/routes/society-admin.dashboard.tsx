"use client";
import { IconPlug, IconUsers } from "@tabler/icons-react";
import RentPaymentsDue from "@/components/dashboard/RentPaymentsDue";
import SocietyStats from "@/components/dashboard/SocietyStats";
import TodayBookings from "@/components/dashboard/TodayBookings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Page() {
	return (
		<>
			<SocietyStats />
			{/* Main grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Today's Bookings */}
				<TodayBookings />
				{/* Rent Payments Due */}
				<RentPaymentsDue />
				{/* Open and Pending Tickets */}
				<Card className="col-span-1">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>Open and Pending Tickets</CardTitle>
						<Badge
							variant="secondary"
							className="bg-[#1a5fd8]/20 text-[#1a5fd8]"
						>
							6 Pending <span className="mx-1">|</span> 8 Open
						</Badge>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="flex items-center gap-2 hover:bg-muted/5 p-2 rounded">
							<div className="flex flex-col">
								<span className="text-sm font-medium">38256944</span>
								<span className="text-xs text-muted-foreground">
									Patricia Brown
								</span>
							</div>
							<Badge
								variant="secondary"
								className="ml-auto bg-[#1a5fd8]/20 text-[#1a5fd8]"
							>
								Open
							</Badge>
						</div>
						<Separator />
						<div className="flex items-center gap-2 hover:bg-muted/5 p-2 rounded">
							<div className="flex flex-col">
								<span className="text-sm font-medium">39337893</span>
								<span className="text-xs text-muted-foreground">
									Elizabeth Thomas, James Miller
								</span>
							</div>
							<Badge
								variant="secondary"
								className="ml-auto bg-[#1a5fd8]/10 text-[#1a5fd8]"
							>
								Open
							</Badge>
						</div>
						<Separator />
						<div className="flex items-center gap-2 hover:bg-muted/5 p-2 rounded">
							<div className="flex flex-col">
								<span className="text-sm font-medium">7143298</span>
								<span className="text-xs text-muted-foreground">
									Jennifer Garcia, Michael Davis
								</span>
							</div>
							<Badge
								variant="secondary"
								className="ml-auto bg-[#ffb400]/30 text-[#ffb400]"
							>
								Open
							</Badge>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Lower grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Utility Bills Payments Due */}
				<Card className="col-span-1">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>Utility Bills Payments Due</CardTitle>
						<Badge
							variant="secondary"
							className="bg-[#ffb400]/30 text-[#ffb400]"
						>
							$1,459.50 Total Due
						</Badge>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="flex items-center gap-2 hover:bg-muted/5 p-2 rounded">
							<div className="flex flex-col">
								<span className="text-sm font-medium">101</span>
								<span className="text-xs text-muted-foreground">
									Water Bill • 01 Sep 2025
								</span>
							</div>
							<span className="ml-auto font-semibold">$469.00</span>
							<Badge
								variant="secondary"
								className="bg-[#ffb400]/30 text-[#ffb400]"
							>
								Unpaid
							</Badge>
						</div>
						<Separator />
						<div className="flex items-center gap-2 hover:bg-muted/5 p-2 rounded">
							<div className="flex flex-col">
								<span className="text-sm font-medium">103</span>
								<span className="text-xs text-muted-foreground">
									Water Bill • 29 Aug 2025
								</span>
							</div>
							<span className="ml-auto font-semibold">$215.86</span>
							<Badge
								variant="secondary"
								className="bg-[#ffb400]/30 text-[#ffb400]"
							>
								Unpaid
							</Badge>
						</div>
						<Separator />
						<div className="flex items-center gap-2 hover:bg-muted/5 p-2 rounded">
							<div className="flex flex-col">
								<span className="text-sm font-medium">104</span>
								<span className="text-xs text-muted-foreground">
									Water Bill • 10 Aug 2025
								</span>
							</div>
							<span className="ml-auto font-semibold">$108.71</span>
							<Badge
								variant="secondary"
								className="bg-[#ffb400]/30 text-[#ffb400]"
							>
								Unpaid
							</Badge>
						</div>
						<Separator />
						<div className="flex items-center gap-2 hover:bg-muted/5 p-2 rounded">
							<div className="flex flex-col">
								<span className="text-sm font-medium">102</span>
								<span className="text-xs text-muted-foreground">
									Water Bill • 16 Aug 2025
								</span>
							</div>
							<span className="ml-auto font-semibold">$458.50</span>
							<Badge
								variant="secondary"
								className="bg-[#ffb400]/30 text-[#ffb400]"
							>
								Unpaid
							</Badge>
						</div>
					</CardContent>
				</Card>

				{/* Common Area Bills Payments Due */}
				<Card className="col-span-1">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>Common Area Bills Payments Due</CardTitle>
						<Badge
							variant="secondary"
							className="bg-[#ffb400]/30 text-[#ffb400]"
						>
							$1,290.00 Total Due
						</Badge>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="flex items-center gap-2">
							<Badge
								variant="secondary"
								className="bg-[#ffb400]/20 text-[#ffb400]"
							>
								Electricity bill
							</Badge>
							<span className="text-xs">05 October 2024</span>
							<span className="ml-auto font-semibold">$757.00</span>
							<Badge
								variant="secondary"
								className="bg-[#ffb400]/30 text-[#ffb400]"
							>
								Unpaid
							</Badge>
						</div>
						<div className="flex items-center gap-2">
							<Badge
								variant="secondary"
								className="bg-[#1a5fd8]/20 text-[#1a5fd8]"
							>
								Electricity bill
							</Badge>
							<span className="text-xs">01 August 2025</span>
							<span className="ml-auto font-semibold">$480.00</span>
							<Badge
								variant="secondary"
								className="bg-[#ffb400]/30 text-[#ffb400]"
							>
								Unpaid
							</Badge>
						</div>
						<div className="flex items-center gap-2">
							<Badge
								variant="secondary"
								className="bg-[#ffb400]/10 text-[#ffb400]"
							>
								Electricity bill
							</Badge>
							<span className="text-xs">22 February 2025</span>
							<span className="ml-auto font-semibold">$463.00</span>
							<Badge
								variant="secondary"
								className="bg-[#ffb400]/30 text-[#ffb400]"
							>
								Unpaid
							</Badge>
						</div>
					</CardContent>
				</Card>

				{/* Service Clock-in/Clock-out */}
				<Card className="col-span-1">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>Service Clock-in/Clock-out</CardTitle>
						<Button
							style={{
								backgroundColor: "#ffb400",
								color: "#1a5fd8",
								border: "1px solid #ffb400",
							}}
							size="sm"
						>
							Clock in
						</Button>
					</CardHeader>
					<CardContent className="flex flex-col items-center justify-center min-h-[120px] text-center">
						<IconPlug className="text-muted-foreground mb-2" size={32} />
						<span className="text-sm text-muted-foreground">
							No clock-in/clock-out records found
						</span>
						<CardFooter className="pt-4">
							<Button
								size="sm"
								style={{
									backgroundColor: "#1a5fd8",
									color: "#fff",
									border: "1px solid #1a5fd8",
									cursor: "pointer",
								}}
							>
								View Service Logs
							</Button>
						</CardFooter>
					</CardContent>
				</Card>
			</div>

			{/* Bottom grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Today's Visitors */}
				<Card className="col-span-1">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>Today's Visitors</CardTitle>
						<Badge
							variant="secondary"
							className="bg-[#1a5fd8]/20 text-[#1a5fd8]"
						>
							Sunday, 07 Sep 2025
						</Badge>
					</CardHeader>
					<CardContent className="flex flex-col items-center justify-center min-h-[80px]">
						<IconUsers className="text-muted-foreground mb-2" size={32} />
						<span className="text-muted-foreground text-sm">
							No visitors found
						</span>
					</CardContent>
				</Card>

				{/* Notices */}
				<Card className="col-span-2">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle>Notices</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<div className="flex items-center gap-2 hover:bg-muted/5 p-2 rounded">
							<div className="flex-1">
								<div className="font-medium">Annual General Meeting Notice</div>
								<div className="text-xs text-muted-foreground">
									Scheduled for 15 Sep 2025
								</div>
							</div>
							<div className="flex gap-1">
								<Badge style={{ backgroundColor: "#1a5fd8", color: "#fff" }}>
									Admin
								</Badge>
								<Badge style={{ backgroundColor: "#ffb400", color: "#1a5fd8" }}>
									Manager
								</Badge>
							</div>
						</div>
						<Separator />
						<div className="flex items-center gap-2 hover:bg-muted/5 p-2 rounded">
							<div className="flex-1">
								<div className="font-medium">Building Maintenance Schedule</div>
								<div className="text-xs text-muted-foreground">
									Multiple blocks affected
								</div>
							</div>
							<div className="flex gap-1">
								<Badge style={{ backgroundColor: "#ffb400", color: "#1a5fd8" }}>
									Manager
								</Badge>
								<Badge style={{ backgroundColor: "#1a5fd8", color: "#fff" }}>
									Admin
								</Badge>
								<Badge style={{ backgroundColor: "#ffb400", color: "#1a5fd8" }}>
									Society
								</Badge>
							</div>
						</div>
						<Separator />
						<div className="flex items-center gap-2 hover:bg-muted/5 p-2 rounded">
							<div className="flex-1">
								<div className="font-medium">
									New Security Measures Implementation
								</div>
								<div className="text-xs text-muted-foreground">
									Please review guidelines
								</div>
							</div>
							<div className="flex gap-1">
								<Badge style={{ backgroundColor: "#1a5fd8", color: "#fff" }}>
									Guard
								</Badge>
								<Badge style={{ backgroundColor: "#ffb400", color: "#1a5fd8" }}>
									Admin
								</Badge>
								<Badge style={{ backgroundColor: "#1a5fd8", color: "#fff" }}>
									Tenant
								</Badge>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-end">
						<Button
							size="sm"
							style={{
								backgroundColor: "#1a5fd8",
								color: "#fff",
								border: "1px solid #1a5fd8",
								cursor: "pointer",
							}}
						>
							View All Notices
						</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
