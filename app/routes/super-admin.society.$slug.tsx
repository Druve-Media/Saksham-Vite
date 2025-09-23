import { IconArrowLeft, IconUser } from "@tabler/icons-react";
import { Link, useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const societyDetails = {
	"oakwood-community": {
		id: 5,
		name: "Oakwood Community",
		address: "56746 Pasochha Dale Apt. 396, Averyside, NY 56384-6878",
		email: "oakwood.community@example.com",
		phone: "+12404592646",
		timezone: "America/New_York",
		country: "United States",
		currency: "Dollars (USD)",
		status: "ACTIVE",
		package: {
			name: "Trial Package",
			type: "Trial (trial)",
			expires: "22 Oct, 2025",
		},
		admin: {
			name: "Holden Wisoky",
			email: "santa.oconnell@example.com",
			avatar: "/api/placeholder/150/150",
		},
		payments: [
			{
				id: 6,
				societyName: "Oakwood Community",
				packageDetails: "Trial Package",
				billingCycle: "Trial",
				paymentDate: "22 Sep 2025",
				nextPaymentDate: "22 Oct 2025",
				transactionId: "I8LH882FACU5UB3",
				gateway: "offline",
				amount: "-",
			},
		],
	},
};

export default function SuperAdminSocietyDetails() {
	const { slug } = useParams();
	const society = societyDetails[slug as keyof typeof societyDetails];

	if (!society) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Society Not Found</h1>
					<Link to="/super-admin/society">
						<Button>Back to Societies</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
			<div className="mb-6">
				<Link
					to="/super-admin/society"
					className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
				>
					<IconArrowLeft className="h-4 w-4" />
					Back to Societies
				</Link>
				<h1 className="text-3xl font-bold tracking-tight">Society Details</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Society Information */}
				<div className="lg:col-span-2">
					<Card>
						<CardHeader className="pb-4">
							<div className="flex items-center gap-4">
								<Avatar className="h-16 w-16">
									<AvatarFallback className="bg-[#1a5fd8] text-white text-xl font-bold">
										{society.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="flex items-center gap-2 mb-1">
										<h2 className="text-xl font-bold">{society.name}</h2>
										<Badge className="bg-blue-100 text-blue-800 border-blue-200">
											FREE
										</Badge>
										<Badge variant="outline" className="text-muted-foreground">
											<IconUser className="h-3 w-3 mr-1" />
											IMPERSONATE
										</Badge>
									</div>
									<p className="text-sm text-muted-foreground">
										{society.address}
									</p>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<span className="text-sm font-medium text-muted-foreground">
										Id
									</span>
									<p className="font-medium">{society.id}</p>
								</div>
								<div>
									<span className="text-sm font-medium text-muted-foreground">
										Status
									</span>
									<div className="mt-1">
										<Badge
											variant="outline"
											className="text-green-600 border-green-600"
										>
											{society.status}
										</Badge>
									</div>
								</div>
								<div>
									<span className="text-sm font-medium text-muted-foreground">
										Phone Number
									</span>
									<p className="font-medium">{society.phone}</p>
								</div>
								<div>
									<span className="text-sm font-medium text-muted-foreground">
										Email Address
									</span>
									<p className="font-medium">{society.email}</p>
								</div>
								<div>
									<span className="text-sm font-medium text-muted-foreground">
										Time Zone
									</span>
									<p className="font-medium">{society.timezone}</p>
								</div>
								<div>
									<span className="text-sm font-medium text-muted-foreground">
										Country
									</span>
									<p className="font-medium flex items-center gap-2">
										🇺🇸 {society.country}
									</p>
								</div>
								<div>
									<span className="text-sm font-medium text-muted-foreground">
										Currency
									</span>
									<p className="font-medium">{society.currency}</p>
								</div>
								<div>
									<span className="text-sm font-medium text-muted-foreground">
										Date & Time
									</span>
									<p className="font-medium">Mon, 22 Sep 2025, 05:31 PM</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Current Package & First Admin */}
				<div className="space-y-6">
					{/* Current Package */}
					<Card>
						<CardHeader>
							<CardTitle>Current Package</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div>
								<span className="text-sm font-medium text-muted-foreground">
									Package Name:
								</span>
								<p className="font-medium">{society.package.name}</p>
							</div>
							<div>
								<span className="text-sm font-medium text-muted-foreground">
									Package Type:
								</span>
								<p className="font-medium">{society.package.type}</p>
							</div>
							<div>
								<span className="text-sm font-medium text-muted-foreground">
									Trial Expires On:
								</span>
								<p className="font-medium">{society.package.expires}</p>
							</div>
						</CardContent>
					</Card>

					{/* First Admin */}
					<Card>
						<CardHeader>
							<CardTitle>First Admin</CardTitle>
						</CardHeader>
						<CardContent className="text-center space-y-4">
							<Avatar className="h-20 w-20 mx-auto">
								<AvatarImage src={society.admin.avatar} />
								<AvatarFallback className="bg-[#1a5fd8] text-white text-xl">
									{society.admin.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div>
								<h3 className="font-bold text-lg">{society.admin.name}</h3>
								<p className="text-sm text-muted-foreground">
									{society.admin.email}
								</p>
							</div>
							<Button className="bg-[#e91e63] hover:bg-[#e91e63]/90 text-white">
								Change Password
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Payments Section */}
			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Payments</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="border-b bg-muted/50">
								<tr>
									<th className="text-left p-4 font-medium text-xs uppercase text-muted-foreground">
										ID
									</th>
									<th className="text-left p-4 font-medium text-xs uppercase text-muted-foreground">
										SOCIETY NAME
									</th>
									<th className="text-left p-4 font-medium text-xs uppercase text-muted-foreground">
										PACKAGE DETAILS
									</th>
									<th className="text-left p-4 font-medium text-xs uppercase text-muted-foreground">
										BILLING CYCLE
									</th>
									<th className="text-left p-4 font-medium text-xs uppercase text-muted-foreground">
										PAYMENT DATE
									</th>
									<th className="text-left p-4 font-medium text-xs uppercase text-muted-foreground">
										NEXT PAYMENT DATE
									</th>
									<th className="text-left p-4 font-medium text-xs uppercase text-muted-foreground">
										TRANSACTION ID
									</th>
									<th className="text-left p-4 font-medium text-xs uppercase text-muted-foreground">
										PAYMENT GATEWAY
									</th>
									<th className="text-left p-4 font-medium text-xs uppercase text-muted-foreground">
										AMOUNT
									</th>
									<th className="text-left p-4 font-medium text-xs uppercase text-muted-foreground">
										ACTION
									</th>
								</tr>
							</thead>
							<tbody>
								{society.payments.map((payment) => (
									<tr
										key={payment.id}
										className="border-b hover:bg-muted/30 transition-colors"
									>
										<td className="p-4">{payment.id}</td>
										<td className="p-4 font-medium">{payment.societyName}</td>
										<td className="p-4">
											<div className="flex items-center gap-2">
												<span>{payment.packageDetails}</span>
												<Badge className="bg-[#ffb400] text-black text-xs">
													TRIAL
												</Badge>
											</div>
										</td>
										<td className="p-4">{payment.billingCycle}</td>
										<td className="p-4">{payment.paymentDate}</td>
										<td className="p-4">{payment.nextPaymentDate}</td>
										<td className="p-4 font-mono text-sm">
											{payment.transactionId}
										</td>
										<td className="p-4">{payment.gateway}</td>
										<td className="p-4">{payment.amount}</td>
										<td className="p-4">
											<Button variant="ghost" size="sm">
												📥
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
