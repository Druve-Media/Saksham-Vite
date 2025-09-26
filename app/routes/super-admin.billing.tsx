import { IconDownload } from "@tabler/icons-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Billing = {
	id: number;
	society: string;
	packageName: string;
	cycle: string;
	paymentDate: string;
	nextPaymentDate: string;
	txId: string;
	gateway: string;
	amount: string;
};

const sample: Billing[] = [
	{
		id: 5,
		society: "Oakwood Community",
		packageName: "Trial Package",
		cycle: "Trial",
		paymentDate: "26 Sep 2025",
		nextPaymentDate: "26 Oct 2025",
		txId: "EW1OSJH3FMGW08Y",
		gateway: "offline",
		amount: "-",
	},
	{
		id: 4,
		society: "Sunset Villas",
		packageName: "Trial Package",
		cycle: "Trial",
		paymentDate: "26 Sep 2025",
		nextPaymentDate: "26 Oct 2025",
		txId: "HTTZSC1LJDBIYLO",
		gateway: "offline",
		amount: "-",
	},
	{
		id: 3,
		society: "Urban Retreat",
		packageName: "Trial Package",
		cycle: "Trial",
		paymentDate: "26 Sep 2025",
		nextPaymentDate: "26 Oct 2025",
		txId: "KFUIVNLISMXS30L",
		gateway: "offline",
		amount: "-",
	},
	{
		id: 2,
		society: "Harmony Heights",
		packageName: "Trial Package",
		cycle: "Trial",
		paymentDate: "26 Sep 2025",
		nextPaymentDate: "26 Oct 2025",
		txId: "EJU5B3ZMWECIB7",
		gateway: "offline",
		amount: "-",
	},
	{
		id: 1,
		society: "Demo Society",
		packageName: "Trial Package",
		cycle: "Trial",
		paymentDate: "26 Sep 2025",
		nextPaymentDate: "26 Oct 2025",
		txId: "ZFK7BABCG7L8GSX",
		gateway: "offline",
		amount: "-",
	},
];

export default function SuperAdminBilling() {
	const [query, setQuery] = useState("");

	const filtered = sample.filter(
		(s) =>
			s.society.toLowerCase().includes(query.toLowerCase()) ||
			s.txId.toLowerCase().includes(query.toLowerCase()) ||
			s.amount.toLowerCase().includes(query.toLowerCase()),
	);

	return (
		<div className="min-h-screen p-6 bg-background">
			<div className="max-w-7xl mx-auto">
				<div className="mb-6">
					<h1 className="text-2xl font-bold">Billing</h1>
				</div>

				<div className="flex items-center gap-3 mb-4">
					<Input
						placeholder="Search payments by amount, method, TX ID"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="max-w-2xl"
					/>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Payments</CardTitle>
					</CardHeader>
					<CardContent className="p-0">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="text-xs text-muted-foreground border-b bg-muted/50">
									<tr>
										<th className="p-4 text-left">ID</th>
										<th className="p-4 text-left">SOCIETY NAME</th>
										<th className="p-4 text-left">PACKAGE DETAILS</th>
										<th className="p-4 text-left">BILLING CYCLE</th>
										<th className="p-4 text-left">PAYMENT DATE</th>
										<th className="p-4 text-left">NEXT PAYMENT DATE</th>
										<th className="p-4 text-left">TRANSACTION ID</th>
										<th className="p-4 text-left">PAYMENT GATEWAY</th>
										<th className="p-4 text-left">AMOUNT</th>
										<th className="p-4 text-left">ACTION</th>
									</tr>
								</thead>
								<tbody>
									{filtered.map((row) => (
										<tr key={row.id} className="border-b hover:bg-muted/30">
											<td className="p-4">{row.id}</td>
											<td className="p-4 font-medium underline">
												{row.society}
											</td>
											<td className="p-4">
												{row.packageName}{" "}
												<Badge className="bg-[#f59e0b] text-white">Trial</Badge>
											</td>
											<td className="p-4">{row.cycle}</td>
											<td className="p-4">{row.paymentDate}</td>
											<td className="p-4">{row.nextPaymentDate}</td>
											<td className="p-4 font-mono text-sm">{row.txId}</td>
											<td className="p-4">{row.gateway}</td>
											<td className="p-4">{row.amount}</td>
											<td className="p-4">
												<div className="flex items-center gap-2 justify-end">
													<Button variant="ghost" size="sm" className="p-2">
														<IconDownload className="h-4 w-4" />
													</Button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
