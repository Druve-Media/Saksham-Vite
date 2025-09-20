"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { rentPayments } from "@/utils/data/rentPayments";

export default function RentPaymentsDue() {
	const pendingCount = rentPayments.length;

	return (
		<Card className="col-span-1">
			{/* Header */}
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle>Rent Payments Due</CardTitle>
				<Badge variant="secondary" className="bg-[#ffb400]/30 text-[#ffb400]">
					{pendingCount} Pending
				</Badge>
			</CardHeader>

			{/* List */}
			<CardContent className="space-y-2">
				{rentPayments.map((payment, index) => (
					<div key={payment.id}>
						<div className="flex items-center gap-2 hover:bg-muted/5 p-2 rounded">
							{/* Left details */}
							<div className="flex flex-col">
								<span className="text-sm font-medium">
									Wing {payment.wing} • Flat {payment.flatNo}
								</span>
								<span className="text-xs text-muted-foreground">
									{payment.occupant} • {payment.month}
								</span>
							</div>

							{/* Amount */}
							<span
								className="ml-auto font-semibold whitespace-nowrap"
								style={{ color: "#ffb400" }}
							>
								${payment.amount.toLocaleString()}
							</span>

							{/* Status */}
							<Badge
								variant="secondary"
								className="bg-[#ffb400]/30 text-[#ffb400]"
							>
								{payment.status}
							</Badge>
						</div>

						{/* Separator between rows */}
						{index < rentPayments.length - 1 && <Separator />}
					</div>
				))}
			</CardContent>
		</Card>
	);
}
