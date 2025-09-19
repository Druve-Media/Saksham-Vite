import {
	IconCalendar,
	IconFilter,
	IconHeart,
	IconMessageCircle,
	IconPlus,
	IconSearch,
	IconShare,
	IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
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

const forumPosts = [
	{
		id: 1,
		title: "Community Garden Initiative",
		author: "John Smith",
		authorApartment: "101",
		category: "Community",
		content:
			"I'd like to propose setting up a community garden on the rooftop. We could grow herbs and vegetables together. What does everyone think?",
		timestamp: "2 hours ago",
		replies: 12,
		likes: 8,
		status: "Open",
	},
	{
		id: 2,
		title: "Parking Issue - Visitors",
		author: "Sarah Wilson",
		authorApartment: "205",
		category: "Issues",
		content:
			"There's an ongoing issue with visitor parking. Many residents are not getting proper visitor spots during weekends.",
		timestamp: "5 hours ago",
		replies: 6,
		likes: 15,
		status: "Under Review",
	},
	{
		id: 3,
		title: "New Year Celebration Planning",
		author: "Mike Johnson",
		authorApartment: "302",
		category: "Events",
		content:
			"Let's start planning for the New Year celebration! Looking for volunteers to help organize activities and decorations.",
		timestamp: "1 day ago",
		replies: 24,
		likes: 32,
		status: "Open",
	},
	{
		id: 4,
		title: "Security Update - New System",
		author: "Admin Team",
		authorApartment: "Admin",
		category: "Announcements",
		content:
			"We're implementing a new security system next month. All residents will receive new access cards.",
		timestamp: "2 days ago",
		replies: 8,
		likes: 22,
		status: "Closed",
	},
	{
		id: 5,
		title: "Gym Equipment Maintenance",
		author: "David Lee",
		authorApartment: "145",
		category: "Maintenance",
		content:
			"The treadmill in the gym has been making strange noises. Can we schedule maintenance for it?",
		timestamp: "3 days ago",
		replies: 3,
		likes: 7,
		status: "Resolved",
	},
];

const categories = [
	{
		value: "community",
		label: "Community",
		color: "bg-[#1a5fd8]/10 text-[#1a5fd8]",
	},
	{ value: "issues", label: "Issues", color: "bg-[#ffb400]/20 text-[#ffb400]" },
	{ value: "events", label: "Events", color: "bg-[#1a5fd8]/20 text-[#1a5fd8]" },
	{
		value: "announcements",
		label: "Announcements",
		color: "bg-[#1a5fd8]/30 text-[#1a5fd8]",
	},
	{
		value: "maintenance",
		label: "Maintenance",
		color: "bg-[#ffb400]/20 text-[#ffb400]",
	},
];

export default function SocietyForumPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [statusFilter, setStatusFilter] = useState("all");

	const [form, setForm] = useState({
		title: "",
		category: "",
		content: "",
	});

	const handleAdd = () => {
		console.log("Adding forum post:", form);
		setIsDialogOpen(false);
		setForm({
			title: "",
			category: "",
			content: "",
		});
	};

	const filteredPosts = forumPosts.filter((post) => {
		const matchesSearch =
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.content.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			categoryFilter === "all" ||
			post.category.toLowerCase() === categoryFilter;
		const matchesStatus =
			statusFilter === "all" ||
			post.status.toLowerCase().includes(statusFilter.toLowerCase());
		return matchesSearch && matchesCategory && matchesStatus;
	});

	const getCategoryColor = (category: string) => {
		const cat = categories.find(
			(c) => c.label.toLowerCase() === category.toLowerCase(),
		);
		return cat?.color || "bg-gray-100 text-gray-800";
	};

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case "open":
				return "bg-green-100 text-green-800";
			case "under review":
				return "bg-yellow-100 text-yellow-800";
			case "closed":
				return "bg-gray-100 text-gray-800";
			case "resolved":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="space-y-6">
			{/* Header with Add Button */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold">Society Forum</h1>
					<p className="text-muted-foreground">
						Community discussions and announcements
					</p>
				</div>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button className="bg-[#ffb400] hover:bg-[#ffb400]/80 cursor-pointer">
							<IconPlus className="mr-2 h-4 w-4" />
							Start Discussion
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-lg">
						<DialogHeader>
							<DialogTitle>Start New Discussion</DialogTitle>
							<DialogDescription>
								Share your thoughts or raise concerns with the community.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<div className="grid gap-2">
								<Label htmlFor="title">Title *</Label>
								<Input
									id="title"
									placeholder="Discussion title"
									value={form.title}
									onChange={(e) =>
										setForm((f) => ({ ...f, title: e.target.value }))
									}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="category">Category *</Label>
								<Select
									onValueChange={(value) =>
										setForm((f) => ({ ...f, category: value }))
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select Category" />
									</SelectTrigger>
									<SelectContent>
										{categories.map((category) => (
											<SelectItem key={category.value} value={category.value}>
												{category.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="content">Message *</Label>
								<Textarea
									id="content"
									placeholder="Share your thoughts..."
									className="min-h-[100px]"
									value={form.content}
									onChange={(e) =>
										setForm((f) => ({ ...f, content: e.target.value }))
									}
								/>
							</div>
						</div>
						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setIsDialogOpen(false)}
								className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
							>
								Cancel
							</Button>
							<Button
								onClick={handleAdd}
								className="bg-[#1a5fd8] hover:bg-[#1a5fd8]/80 cursor-pointer"
							>
								Post
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{/* Search and Filters */}
			<div className="flex items-center gap-4">
				<div className="relative flex-1">
					<IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search discussions by title, author, or content"
						className="pl-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Select value={categoryFilter} onValueChange={setCategoryFilter}>
					<SelectTrigger className="w-48">
						<SelectValue placeholder="Filter by Category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						{categories.map((category) => (
							<SelectItem key={category.value} value={category.value}>
								{category.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select value={statusFilter} onValueChange={setStatusFilter}>
					<SelectTrigger className="w-40">
						<SelectValue placeholder="Filter by Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Status</SelectItem>
						<SelectItem value="open">Open</SelectItem>
						<SelectItem value="under review">Under Review</SelectItem>
						<SelectItem value="closed">Closed</SelectItem>
						<SelectItem value="resolved">Resolved</SelectItem>
					</SelectContent>
				</Select>
				<Button
					variant="outline"
					size="sm"
					className="border-[#ffb400] text-[#ffb400] hover:bg-[#ffb400]/10 cursor-pointer"
				>
					<IconFilter className="mr-2 h-4 w-4" />
					FILTERS
				</Button>
			</div>

			{/* Forum Posts */}
			<div className="space-y-4">
				{filteredPosts.map((post) => (
					<Card
						key={post.id}
						className="bg-background border rounded-lg shadow hover:shadow-md transition-shadow"
					>
						<CardHeader className="pb-3">
							<div className="flex items-start justify-between">
								<div className="flex items-start gap-3">
									<Avatar className="h-10 w-10">
										<AvatarImage
											src={`https://api.dicebear.com/6/initials/svg?seed=${post.author}`}
										/>
										<AvatarFallback>
											{post.author
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div className="flex-1">
										<div className="flex items-center gap-2">
											<h3 className="font-semibold text-lg">{post.title}</h3>
											<Badge className={getCategoryColor(post.category)}>
												{post.category}
											</Badge>
											<Badge className={getStatusColor(post.status)}>
												{post.status}
											</Badge>
										</div>
										<div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
											<div className="flex items-center gap-1">
												<IconUser className="h-3 w-3" />
												{post.author}
												{post.authorApartment !== "Admin" &&
													`(Apt ${post.authorApartment})`}
											</div>
											<div className="flex items-center gap-1">
												<IconCalendar className="h-3 w-3" />
												{post.timestamp}
											</div>
										</div>
									</div>
								</div>
							</div>
						</CardHeader>
						<CardContent className="pt-0">
							<p className="text-muted-foreground mb-4">{post.content}</p>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<Button
										variant="ghost"
										size="sm"
										className="text-muted-foreground"
									>
										<IconHeart className="mr-1 h-4 w-4" />
										{post.likes}
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="text-muted-foreground"
									>
										<IconMessageCircle className="mr-1 h-4 w-4" />
										{post.replies} replies
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="text-muted-foreground"
									>
										<IconShare className="mr-1 h-4 w-4" />
										Share
									</Button>
								</div>
								<Button
									variant="outline"
									size="sm"
									className="border-[#1a5fd8] text-[#1a5fd8] hover:bg-[#1a5fd8]/10 cursor-pointer"
								>
									View Discussion
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Pagination */}
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">
					Showing 1 to {filteredPosts.length} of {filteredPosts.length}{" "}
					discussions
				</p>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						disabled
						className="cursor-not-allowed"
					>
						&lt;
					</Button>
					<Button
						variant="default"
						size="sm"
						className="bg-[#1a5fd8] hover:bg-[#1a5fd8]/80 cursor-pointer"
					>
						1
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="border-[#ffb400] text-[#ffb400] hover:bg-[#ffb400]/10 cursor-pointer"
					>
						&gt;
					</Button>
				</div>
			</div>
		</div>
	);
}
