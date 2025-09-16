import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";

export default function VisitorsPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [form, setForm] = useState({ name: "", purpose: "" });

	const handleAdd = () => {
		// Placeholder for add logic
		setIsDialogOpen(false);
		setForm({ name: "", purpose: "" });
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Visitors</h1>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button>Add Visitor</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Add Visitor</DialogTitle>
							<DialogDescription>
								Enter details for the new visitor.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<Input
								placeholder="Name"
								value={form.name}
								onChange={(e) =>
									setForm((f) => ({ ...f, name: e.target.value }))
								}
							/>
							<Textarea
								placeholder="Purpose of visit"
								value={form.purpose}
								onChange={(e) =>
									setForm((f) => ({ ...f, purpose: e.target.value }))
								}
							/>
						</div>
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
								Cancel
							</Button>
							<Button onClick={handleAdd}>Add</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<Card className="bg-background border rounded-lg shadow">
				<CardContent className="p-6">
					<p className="text-muted-foreground">
						No visitors yet. Add a new visitor to get started.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
