import { ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-8">
			<div className="container mx-auto max-w-2xl">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-5xl font-bold tracking-tight mb-4">
						Welcome to Society Management
					</h1>
					<p className="text-xl text-muted-foreground">
						Comprehensive residential community management platform
					</p>
				</div>

				{/* Society Admin Card */}
				<Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm hover:shadow-3xl transition-shadow mb-8">
					<CardHeader className="text-center pb-6">
						<CardTitle className="text-2xl flex items-center justify-center gap-3">
							<Building2 className="h-8 w-8 text-blue-600" />
							Society Administration
						</CardTitle>
					</CardHeader>

					<CardContent className="text-center">
						<p className="text-muted-foreground mb-8 text-lg">
							Access the comprehensive management dashboard for residential
							community administration, including resident management, property
							overight, maintenance tracking, and financial reporting.
						</p>

						<Link to="/society-admin/dashboard" className="w-full">
							<Button size="lg" className="w-full text-lg py-6">
								Access Society Admin Dashboard
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</Link>

						<div className="mt-6 pt-6 border-t">
							<p className="text-sm text-muted-foreground">
								Manage residents • Track maintenance • Generate reports • Handle
								finances
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Super Admin Card */}
				<Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm hover:shadow-3xl transition-shadow">
					<CardHeader className="text-center pb-6">
						<CardTitle className="text-2xl flex items-center justify-center gap-3">
							<Building2 className="h-8 w-8 text-yellow-500" />
							Super Administration
						</CardTitle>
					</CardHeader>

					<CardContent className="text-center">
						<p className="text-muted-foreground mb-8 text-lg">
							Access the super admin dashboard for managing multiple societies,
							overseeing packages, billing, requests, and platform-wide
							settings.
						</p>

						<Link to="/super-admin/dashboard" className="w-full">
							<Button
								size="lg"
								variant="secondary"
								className="w-full text-lg py-6"
							>
								Access Super Admin Dashboard
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</Link>

						<div className="mt-6 pt-6 border-t">
							<p className="text-sm text-muted-foreground">
								Manage societies • Oversee packages • Handle billing • Platform
								settings
							</p>
						</div>
					</CardContent>
				</Card>

				{/* Footer */}
				<div className="text-center mt-8">
					<p className="text-sm text-muted-foreground">
						Secure • Reliable • Comprehensive
					</p>
				</div>
			</div>
		</div>
	);
}
