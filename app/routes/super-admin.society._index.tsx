import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const societies = [
	{
		id: 5,
		name: "Oakwood Community",
		email: "oakwood.community@example.com",
		package: "Trial Package (trial)",
		status: "ACTIVE",
		slug: "oakwood-community",
	},
	{
		id: 4,
		name: "Sunset Villas",
		email: "sunset.villas@example.com",
		package: "Trial Package (trial)",
		status: "ACTIVE",
		slug: "sunset-villas",
	},
	{
		id: 3,
		name: "Urban Retreat",
		email: "urban.retreat@example.com",
		package: "Trial Package (trial)",
		status: "ACTIVE",
		slug: "urban-retreat",
	},
	{
		id: 2,
		name: "Harmony Heights",
		email: "harmony.heights@example.com",
		package: "Trial Package (trial)",
		status: "ACTIVE",
		slug: "harmony-heights",
	},
	{
		id: 1,
		name: "Demo Society",
		email: "demo.society@example.com",
		package: "Trial Package (trial)",
		status: "ACTIVE",
		slug: "demo-society",
	},
];

export default function SuperAdminSociety() {
	const [searchTerm, setSearchTerm] = useState("");
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		societyName: "",
		fullName: "",
		email: "",
		password: "",
		phone: "",
		country: "India",
		facebookLink: "",
		instagramLink: "",
		twitterLink: "",
		address: "",
	});

	const filteredSocieties = societies.filter(
		(society) =>
			society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			society.email.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		setOpen(false);
		setFormData({
			societyName: "",
			fullName: "",
			email: "",
			password: "",
			phone: "",
			country: "India",
			facebookLink: "",
			instagramLink: "",
			twitterLink: "",
			address: "",
		});
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold tracking-tight">Societies</h1>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button className="bg-[#ffb400] hover:bg-[#ffb400]/90 text-black">
							Add Society
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-3xl p-0 overflow-y-auto max-h-[90vh]">
						<DialogHeader className="bg-surface-800 text-white rounded-t-md p-4">
							<div className="flex items-start justify-between">
								<DialogTitle className="text-2xl font-bold text-white">
									Add Society
								</DialogTitle>
							</div>
						</DialogHeader>
						<form
							onSubmit={handleSubmit}
							className="space-y-6 p-6 bg-surface-900 text-white"
						>
							{/* Society Name */}
							<div className="space-y-2">
								<Label
									htmlFor="societyName"
									className="text-sm font-medium text-white"
								>
									Society Name <span className="text-red-500">*</span>
								</Label>
								<Input
									id="societyName"
									value={formData.societyName}
									onChange={(e) =>
										handleInputChange("societyName", e.target.value)
									}
									required
									className="w-full bg-transparent border border-neutral-700 text-white placeholder:text-neutral-400"
								/>
							</div>

							{/* Full Name */}
							<div className="space-y-2">
								<Label
									htmlFor="fullName"
									className="text-sm font-medium text-white"
								>
									Your Full Name <span className="text-red-500">*</span>
								</Label>
								<Input
									id="fullName"
									value={formData.fullName}
									onChange={(e) =>
										handleInputChange("fullName", e.target.value)
									}
									required
									className="w-full bg-transparent border border-neutral-700 text-white placeholder:text-neutral-400"
								/>
							</div>

							{/* Email */}
							<div className="space-y-2">
								<Label
									htmlFor="email"
									className="text-sm font-medium text-white"
								>
									Email <span className="text-red-500">*</span>
								</Label>
								<Input
									id="email"
									type="email"
									value={formData.email}
									onChange={(e) => handleInputChange("email", e.target.value)}
									required
									className="w-full bg-transparent border border-neutral-700 text-white placeholder:text-neutral-400"
								/>
							</div>

							{/* Password */}
							<div className="space-y-2">
								<Label
									htmlFor="password"
									className="text-sm font-medium text-white"
								>
									Password <span className="text-red-500">*</span>
								</Label>
								<Input
									id="password"
									type="password"
									value={formData.password}
									onChange={(e) =>
										handleInputChange("password", e.target.value)
									}
									required
									className="w-full bg-transparent border border-neutral-700 text-white placeholder:text-neutral-400"
								/>
							</div>

							{/* Phone and Country Row */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label
										htmlFor="phone"
										className="text-sm font-medium text-white"
									>
										Phone
									</Label>
									<Input
										id="phone"
										value={formData.phone}
										onChange={(e) => handleInputChange("phone", e.target.value)}
										className="w-full bg-transparent border border-neutral-700 text-white placeholder:text-neutral-400"
									/>
								</div>
								<div className="space-y-2">
									<Label
										htmlFor="country"
										className="text-sm font-medium text-white"
									>
										Country
									</Label>
									<Select
										value={formData.country}
										onValueChange={(value) =>
											handleInputChange("country", value)
										}
									>
										<SelectTrigger className="w-full bg-transparent border border-neutral-700 text-white">
											<SelectValue />
										</SelectTrigger>
										<SelectContent className="bg-surface-800 text-white">
											<SelectItem value="India">India</SelectItem>
											<SelectItem value="United States">
												United States
											</SelectItem>
											<SelectItem value="United Kingdom">
												United Kingdom
											</SelectItem>
											<SelectItem value="Canada">Canada</SelectItem>
											<SelectItem value="Australia">Australia</SelectItem>
											<SelectItem value="Germany">Germany</SelectItem>
											<SelectItem value="France">France</SelectItem>
											<SelectItem value="Japan">Japan</SelectItem>
											<SelectItem value="Singapore">Singapore</SelectItem>
											<SelectItem value="UAE">UAE</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* Social Media Links */}
							<div className="space-y-4">
								<h3 className="text-lg font-semibold text-white">
									Social Media Links
								</h3>
								{/* Facebook Link */}
								<div className="space-y-2">
									<Label
										htmlFor="facebookLink"
										className="text-sm font-medium text-white"
									>
										Facebook Link
									</Label>
									<Input
										id="facebookLink"
										value={formData.facebookLink}
										onChange={(e) =>
											handleInputChange("facebookLink", e.target.value)
										}
										placeholder="https://facebook.com/your-society"
										className="w-full bg-transparent border border-neutral-700 text-white placeholder:text-neutral-400"
									/>
								</div>
								{/* Instagram Link */}
								<div className="space-y-2">
									<Label
										htmlFor="instagramLink"
										className="text-sm font-medium text-white"
									>
										Instagram Link
									</Label>
									<Input
										id="instagramLink"
										value={formData.instagramLink}
										onChange={(e) =>
											handleInputChange("instagramLink", e.target.value)
										}
										placeholder="https://instagram.com/your-society"
										className="w-full bg-transparent border border-neutral-700 text-white placeholder:text-neutral-400"
									/>
								</div>
								{/* Twitter Link */}
								<div className="space-y-2">
									<Label
										htmlFor="twitterLink"
										className="text-sm font-medium text-white"
									>
										Twitter Link
									</Label>
									<Input
										id="twitterLink"
										value={formData.twitterLink}
										onChange={(e) =>
											handleInputChange("twitterLink", e.target.value)
										}
										placeholder="https://twitter.com/your-society"
										className="w-full bg-transparent border border-neutral-700 text-white placeholder:text-neutral-400"
									/>
								</div>
							</div>

							{/* Address */}
							<div className="space-y-2">
								<Label
									htmlFor="address"
									className="text-sm font-medium text-white"
								>
									Address <span className="text-red-500">*</span>
								</Label>
								<Textarea
									id="address"
									value={formData.address}
									onChange={(e) => handleInputChange("address", e.target.value)}
									required
									className="w-full min-h-[100px] resize-y bg-transparent border border-neutral-700 text-white placeholder:text-neutral-400"
									placeholder="Enter complete address with city, state, and postal code"
								/>
							</div>

							{/* Form Actions */}
							<div className="flex gap-4 pt-6 justify-end">
								<Button
									variant="outline"
									type="button"
									onClick={() => setOpen(false)}
									className="text-white border-neutral-700"
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="bg-[#ffb400] hover:bg-[#ffb400]/90 text-black px-6"
								>
									Save
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			<div className="mb-6 flex gap-4">
				<Input
					placeholder="Search by name or email"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="max-w-sm"
				/>
				<Button variant="outline" className="flex items-center gap-2">
					Need Approval
					<Badge variant="destructive" className="ml-1">
						0
					</Badge>
				</Button>
			</div>

			<Card>
				<CardContent className="p-0">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="border-b bg-muted/50">
								<tr>
									<th className="text-left p-4 font-medium">ID</th>
									<th className="text-left p-4 font-medium">SOCIETY NAME</th>
									<th className="text-left p-4 font-medium">
										SOCIETY EMAIL ADDRESS
									</th>
									<th className="text-left p-4 font-medium">PACKAGE</th>
									<th className="text-left p-4 font-medium">STATUS</th>
									<th className="text-left p-4 font-medium">ACTION</th>
								</tr>
							</thead>
							<tbody>
								{filteredSocieties.map((society) => (
									<tr
										key={society.id}
										className="border-b hover:bg-muted/30 transition-colors"
									>
										<td className="p-4">{society.id}</td>
										<td className="p-4">
											<Link
												to={`/super-admin/society/${society.slug}`}
												className="flex items-center gap-3 hover:text-[#1a5fd8] transition-colors"
											>
												<Avatar className="h-10 w-10">
													<AvatarFallback className="bg-[#1a5fd8] text-white font-semibold">
														{society.name.charAt(0)}
													</AvatarFallback>
												</Avatar>
												<span className="font-medium underline">
													{society.name}
												</span>
											</Link>
										</td>
										<td className="p-4 text-muted-foreground">
											{society.email}
										</td>
										<td className="p-4">
											<div className="flex flex-col gap-1">
												<span className="text-sm">{society.package}</span>
												<Button
													variant="outline"
													size="sm"
													className="w-fit text-xs"
												>
													🔄 Change
												</Button>
											</div>
										</td>
										<td className="p-4">
											<Badge
												variant="outline"
												className="text-green-600 border-green-600"
											>
												{society.status}
											</Badge>
										</td>
										<td className="p-4">
											<Button
												variant="outline"
												size="sm"
												className="flex items-center gap-1"
											>
												ACTION
												<IconChevronDown className="h-4 w-4" />
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
