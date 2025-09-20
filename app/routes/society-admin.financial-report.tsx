import {
	Calendar,
	DollarSign,
	Download,
	PieChart,
	Receipt,
	TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const financialData = {
	totalRevenue: "₹125,430",
	totalExpenses: "₹78,920",
	netIncome: "₹46,510",
	monthlyTrend: "+12.5%",
	revenueByCategory: [
		{ category: "Rent Collection", amount: "₹89,200", percentage: "71%" },
		{ category: "Maintenance Fees", amount: "₹24,500", percentage: "19%" },
		{ category: "Parking Fees", amount: "₹8,730", percentage: "7%" },
		{ category: "Amenity Bookings", amount: "₹3,000", percentage: "3%" },
	],
	expensesByCategory: [
		{ category: "Maintenance & Repairs", amount: "₹32,100", percentage: "41%" },
		{ category: "Utilities", amount: "₹18,900", percentage: "24%" },
		{ category: "Security Services", amount: "₹15,200", percentage: "19%" },
		{ category: "Cleaning Services", amount: "₹8,720", percentage: "11%" },
		{ category: "Administrative", amount: "₹4,000", percentage: "5%" },
	],
};

export default function FinancialReportPage() {
	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col gap-2 pt-2 pb-4">
				<h1 className="text-3xl font-bold">Financial Report</h1>
				<p className="text-muted-foreground">
					Comprehensive financial analysis and revenue/expense breakdown
				</p>
			</div>

			{/* Actions Bar */}
			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					style={{ border: "none", color: "#1a5fd8", cursor: "pointer" }}
				>
					<Calendar className="h-4 w-4 mr-2" />
					Select Period
				</Button>
				<Button
					size="sm"
					style={{
						backgroundColor: "#ffb400",
						color: "#1a5fd8",
						border: "none",
						cursor: "pointer",
					}}
				>
					<Download className="h-4 w-4 mr-2" />
					Export Report
				</Button>
			</div>

			{/* Financial Overview Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="bg-background border rounded-lg shadow p-4">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">
							{financialData.totalRevenue}
						</div>
						<p className="text-xs text-muted-foreground">
							<TrendingUp className="inline h-3 w-3 mr-1" />
							{financialData.monthlyTrend} from last month
						</p>
					</CardContent>
				</Card>

				<Card className="bg-background border rounded-lg shadow p-4">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Expenses
						</CardTitle>
						<Receipt className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-red-600">
							{financialData.totalExpenses}
						</div>
						<p className="text-xs text-muted-foreground">
							Operating expenses this month
						</p>
					</CardContent>
				</Card>

				<Card className="bg-background border rounded-lg shadow p-4">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Net Income</CardTitle>
						<TrendingUp className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-blue-600">
							{financialData.netIncome}
						</div>
						<p className="text-xs text-muted-foreground">
							Profit after all expenses
						</p>
					</CardContent>
				</Card>

				<Card className="bg-background border rounded-lg shadow p-4">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
						<PieChart className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{financialData.monthlyTrend}
						</div>
						<p className="text-xs text-muted-foreground">
							Month-over-month growth
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Revenue and Expense Breakdown */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Revenue Breakdown */}
				<Card className="bg-background border rounded-lg shadow p-4">
					<CardHeader>
						<CardTitle>Revenue Breakdown</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{financialData.revenueByCategory.map((item, index) => (
							<div key={index} className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">{item.category}</span>
									<div className="flex items-center gap-2">
										<Badge
											style={{ backgroundColor: "#ffb400", color: "#1a5fd8" }}
										>
											{item.percentage}
										</Badge>
										<span className="text-sm font-semibold text-green-600">
											{item.amount}
										</span>
									</div>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-green-600 h-2 rounded-full"
										style={{ width: item.percentage }}
									/>
								</div>
							</div>
						))}
					</CardContent>
				</Card>

				{/* Expense Breakdown */}
				<Card className="bg-background border rounded-lg shadow p-4">
					<CardHeader>
						<CardTitle>Expense Breakdown</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{financialData.expensesByCategory.map((item, index) => (
							<div key={index} className="space-y-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">{item.category}</span>
									<div className="flex items-center gap-2">
										<Badge
											style={{ backgroundColor: "#1a5fd8", color: "#fff" }}
										>
											{item.percentage}
										</Badge>
										<span className="text-sm font-semibold text-red-600">
											{item.amount}
										</span>
									</div>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-red-600 h-2 rounded-full"
										style={{ width: item.percentage }}
									/>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			{/* Additional Financial Insights */}
			<Card className="bg-background border rounded-lg shadow p-4">
				<CardHeader>
					<CardTitle>Financial Insights</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div
							className="text-center p-4"
							style={{ backgroundColor: "#e6f7ff" }}
						>
							<div className="text-2xl font-bold" style={{ color: "#1a5fd8" }}>
								94%
							</div>
							<div className="text-sm text-muted-foreground">
								Collection Rate
							</div>
						</div>
						<div
							className="text-center p-4"
							style={{ backgroundColor: "#e6f7ff" }}
						>
							<div className="text-2xl font-bold" style={{ color: "#1a5fd8" }}>
								37%
							</div>
							<div className="text-sm text-muted-foreground">Profit Margin</div>
						</div>
						<div
							className="text-center p-4"
							style={{ backgroundColor: "#fff7e6" }}
						>
							<div className="text-2xl font-bold" style={{ color: "#ffb400" }}>
								$2,847
							</div>
							<div className="text-sm text-muted-foreground">
								Avg Revenue per Unit
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
