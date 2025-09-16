import { ArrowRight, Building2, FileText, Settings, Users } from "lucide-react";
import { Link, Navigate } from "react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/auth-store";

export default function MainDashboard() {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to="/auth/login" replace />;
	}

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<span className="font-semibold text-lg">Dashboard</span>
					</div>
					<div className="ml-auto flex items-center gap-2 px-4">
						<ModeToggle />
						<Avatar className="h-8 w-8">
							<AvatarImage
								src={user?.avatar || "/avatars/shadcn.jpg"}
								alt="User"
							/>
							<AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
						</Avatar>
					</div>
				</header>

				<div className="flex flex-1 flex-col gap-6 p-6">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold">Welcome to Saksham</h1>
						<p className="text-muted-foreground">
							Your comprehensive property management solution platform
						</p>
					</div>

					{/* Main Navigation Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
						{/* Society Administration */}
						<Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<div className="p-2 bg-blue-100 rounded-lg">
										<Building2 className="h-6 w-6 text-blue-600" />
									</div>
									Society Administration
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground">
									Manage residents, maintenance, financials, and community
									services
								</p>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>• User & Tenant Management</li>
									<li>• Maintenance Requests</li>
									<li>• Financial Reports</li>
									<li>• Amenities & Services</li>
								</ul>
								<Link to="/society-admin/dashboard">
									<Button className="w-full">
										Access Society Admin
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</Link>
							</CardContent>
						</Card>

						{/* User Portal */}
						<Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer opacity-60">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<div className="p-2 bg-green-100 rounded-lg">
										<Users className="h-6 w-6 text-green-600" />
									</div>
									User Portal
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground">
									Resident dashboard for personal requests and information
								</p>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>• Personal Dashboard</li>
									<li>• Submit Requests</li>
									<li>• View Notices</li>
									<li>• Book Amenities</li>
								</ul>
								<Button className="w-full" disabled>
									Coming Soon
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</CardContent>
						</Card>

						{/* System Settings */}
						<Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer opacity-60">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<div className="p-2 bg-purple-100 rounded-lg">
										<Settings className="h-6 w-6 text-purple-600" />
									</div>
									System Settings
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground">
									Configure system-wide settings and preferences
								</p>
								<ul className="text-sm text-muted-foreground space-y-1">
									<li>• Global Configuration</li>
									<li>• User Roles & Permissions</li>
									<li>• Integration Settings</li>
									<li>• Security Policies</li>
								</ul>
								<Button className="w-full" disabled>
									Coming Soon
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</CardContent>
						</Card>
					</div>

					{/* Quick Info Section */}
					<Card className="max-w-4xl">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<FileText className="h-5 w-5" />
								Getting Started
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h3 className="font-semibold mb-2">Society Administration</h3>
									<p className="text-muted-foreground text-sm mb-2">
										Complete property management solution for residential
										communities
									</p>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>✓ Resident and tenant management</li>
										<li>✓ Maintenance request tracking</li>
										<li>✓ Financial reporting and billing</li>
										<li>✓ Amenity booking system</li>
									</ul>
								</div>
								<div>
									<h3 className="font-semibold mb-2">What's Available</h3>
									<p className="text-muted-foreground text-sm mb-2">
										Currently available features and modules
									</p>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>🏢 Society Admin Portal (Active)</li>
										<li>👥 User Portal (Coming Soon)</li>
										<li>⚙️ System Settings (Coming Soon)</li>
										<li>📊 Advanced Analytics (Coming Soon)</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
