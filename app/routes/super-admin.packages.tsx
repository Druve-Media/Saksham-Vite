import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PackageDetailsDialog from "../components/super-admin/package-details-dialog";

type Package = {
	id: number;
	name: string;
	monthly: string;
	annual: string;
	lifetime: string;
	tags?: string[];
};

const samplePackages: Package[] = [
	{
		id: 1,
		name: "Default",
		monthly: "$0.00",
		annual: "$0.00",
		lifetime: "$0.00",
		tags: ["Recommended"],
	},
	{
		id: 2,
		name: "Subscription Package",
		monthly: "$10.00",
		annual: "$100.00",
		lifetime: "$0.00",
		tags: ["Popular"],
	},
	{
		id: 3,
		name: "Lifetime Access",
		monthly: "$0.00",
		annual: "$0.00",
		lifetime: "$199.00",
		tags: ["Lifetime"],
	},
];

export default function SuperAdminPackages() {
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState<Package | null>(null);
	const [open, setOpen] = useState(false);

	const filtered = samplePackages.filter((p) =>
		p.name.toLowerCase().includes(query.toLowerCase()),
	);

	return (
		<div className="min-h-screen p-6 bg-background">
			<div className="max-w-7xl mx-auto">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold">Packages</h1>
					<div className="flex items-center gap-3">
						<Input
							placeholder="Search your package here"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="max-w-xs"
						/>
						<Button className="bg-[#e91e63] hover:bg-[#e91e63]/90 flex items-center gap-2">
							<IconPlus className="h-4 w-4" /> Add Package
						</Button>
					</div>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Package List</CardTitle>
					</CardHeader>
					<CardContent className="p-0">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="text-xs text-muted-foreground border-b bg-muted/50">
									<tr>
										<th className="p-4 text-left">ID</th>
										<th className="p-4 text-left">PACKAGE NAME</th>
										<th className="p-4 text-left">MONTHLY PLAN PRICE</th>
										<th className="p-4 text-left">ANNUAL PLAN PRICE</th>
										<th className="p-4 text-left">LIFETIME PRICE</th>
										<th className="p-4 text-left">TAGS</th>
										<th className="p-4 text-left">ACTION</th>
									</tr>
								</thead>
								<tbody>
									{filtered.map((pkg) => (
										<tr key={pkg.id} className="border-b hover:bg-muted/30">
											<td className="p-4">{pkg.id}</td>
											<td className="p-4 font-medium">{pkg.name}</td>
											<td className="p-4">{pkg.monthly}</td>
											<td className="p-4">{pkg.annual}</td>
											<td className="p-4">{pkg.lifetime}</td>
											<td className="p-4">
												<div className="flex items-center gap-2">
													{(pkg.tags || []).map((t) => (
														<Badge key={t} className="bg-[#1a5fd8] text-white">
															{t}
														</Badge>
													))}
												</div>
											</td>
											<td className="p-4">
												<div className="flex items-center gap-2">
													<Button
														variant="outline"
														size="sm"
														className="flex items-center gap-2"
														onClick={() => {
															setSelected(pkg);
															setOpen(true);
														}}
													>
														View
													</Button>
													<Button
														variant="outline"
														size="sm"
														className="flex items-center gap-2"
													>
														<IconPencil className="h-4 w-4" /> Update
													</Button>
													<Button
														variant="destructive"
														size="sm"
														className="flex items-center gap-2"
													>
														<IconTrash className="h-4 w-4" />
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
				<PackageDetailsDialog pkg={selected} open={open} setOpen={setOpen} />
			</div>
		</div>
	);
}
