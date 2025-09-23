import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type Package = {
	id: number;
	name: string;
	monthly: string;
	annual: string;
	lifetime: string;
	tags?: string[];
	modules?: string[];
};

export default function PackageDetailsDialog({
	pkg,
	open,
	setOpen,
}: {
	pkg: Package | null;
	open: boolean;
	setOpen: (v: boolean) => void;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedPkg, setEditedPkg] = useState<Package | null>(null);
	const [newModuleInput, setNewModuleInput] = useState("");

	const allAvailableModules = [
		"Tower",
		"Owner",
		"Common Area Bills",
		"Visitors",
		"Service Provider",
		"Event",
		"Floor",
		"Tenant",
		"Maintenance",
		"Notice Board",
		"Service Time Logging",
		"Forum",
		"Apartment",
		"Rent",
		"Amenities",
		"Tickets",
		"Settings",
		"User",
		"Utility Bills",
		"Book Amenity",
		"Parking",
		"Assets",
	];

	if (!pkg) return null;

	// Initialize edited package when entering edit mode
	const handleEdit = () => {
		setEditedPkg({
			...pkg,
			modules: pkg.modules || allAvailableModules,
		});
		setIsEditing(true);
	};

	const handleSave = () => {
		// Here you would typically save to your backend
		console.log("Saving package:", editedPkg);
		setIsEditing(false);
		setEditedPkg(null);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setEditedPkg(null);
	};

	const removeModule = (moduleToRemove: string) => {
		if (editedPkg) {
			setEditedPkg({
				...editedPkg,
				modules: (editedPkg.modules || []).filter(
					(m: string) => m !== moduleToRemove,
				),
			});
		}
	};

	const addModule = (moduleToAdd: string) => {
		if (
			editedPkg &&
			moduleToAdd.trim() &&
			!editedPkg.modules?.includes(moduleToAdd)
		) {
			setEditedPkg({
				...editedPkg,
				modules: [...(editedPkg.modules || []), moduleToAdd.trim()],
			});
		}
	};

	const handleNewModuleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewModuleInput(e.target.value);
		const values = e.target.value.split(/[, ]+/).filter(Boolean);
		if (values.length > 1) {
			values.forEach((mod) => {
				addModule(mod);
			});
			setNewModuleInput("");
		}
	};

	const handleNewModuleAdd = () => {
		if (newModuleInput.trim()) {
			addModule(newModuleInput.trim());
			setNewModuleInput("");
		}
	};

	const getAvailableModules = () => {
		return allAvailableModules.filter(
			(module) => !(editedPkg?.modules || []).includes(module),
		);
	};

	const currentPkg = isEditing ? editedPkg : pkg;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-3xl p-0">
				<DialogHeader className="p-4">
					<DialogTitle className="text-lg font-bold">
						{isEditing ? (
							<Input
								value={editedPkg?.name || ""}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setEditedPkg((prev: Package | null) =>
										prev ? { ...prev, name: e.target.value } : null,
									)
								}
								className="text-lg font-bold border-none p-0 h-auto"
							/>
						) : (
							currentPkg?.name
						)}
					</DialogTitle>
				</DialogHeader>
				<Card>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<h4 className="text-sm font-medium text-muted-foreground">
									Monthly Plan Price
								</h4>
								{isEditing ? (
									<Input
										value={editedPkg?.monthly || ""}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setEditedPkg((prev: Package | null) =>
												prev ? { ...prev, monthly: e.target.value } : null,
											)
										}
										className="mt-2"
										placeholder="$0.00"
									/>
								) : (
									<div className="mt-2 font-medium">{currentPkg?.monthly}</div>
								)}
							</div>
							<div>
								<h4 className="text-sm font-medium text-muted-foreground">
									Annual Plan Price
								</h4>
								{isEditing ? (
									<Input
										value={editedPkg?.annual || ""}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setEditedPkg((prev: Package | null) =>
												prev ? { ...prev, annual: e.target.value } : null,
											)
										}
										className="mt-2"
										placeholder="$0.00"
									/>
								) : (
									<div className="mt-2 font-medium">{currentPkg?.annual}</div>
								)}
							</div>
							<div>
								<h4 className="text-sm font-medium text-muted-foreground">
									Lifetime Price
								</h4>
								{isEditing ? (
									<Input
										value={editedPkg?.lifetime || ""}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											setEditedPkg((prev: Package | null) =>
												prev ? { ...prev, lifetime: e.target.value } : null,
											)
										}
										className="mt-2"
										placeholder="$0.00"
									/>
								) : (
									<div className="mt-2 font-medium">{currentPkg?.lifetime}</div>
								)}
							</div>
						</div>
						<div className="mt-6">
							<h4 className="text-sm font-medium text-muted-foreground">
								Modules in Package
							</h4>
							{isEditing ? (
								<div className="mt-3 space-y-3">
									<div className="p-3 border rounded-lg min-h-[60px] bg-background focus-within:ring-2 focus-within:ring-ring flex flex-wrap gap-2 items-center">
										{(editedPkg?.modules || []).map((module: string) => (
											<Badge
												key={module}
												variant="secondary"
												className="flex items-center gap-1 pr-1 bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100"
											>
												<span className="text-xs">{module}</span>
												<button
													type="button"
													onClick={() => removeModule(module)}
													className="ml-1 hover:bg-red-500 hover:text-white rounded-full p-0.5 transition-colors"
												>
													<IconX className="h-3 w-3" />
												</button>
											</Badge>
										))}
										<Input
											value={newModuleInput}
											onChange={handleNewModuleInput}
											onKeyDown={(e) => {
												if (e.key === "Enter") handleNewModuleAdd();
											}}
											placeholder="Type and press space/comma/enter"
											className="w-auto min-w-[120px] flex-1 border-none bg-transparent focus:ring-0"
										/>
									</div>
									{getAvailableModules().length > 0 && (
										<div className="flex gap-2 items-center mt-2">
											<Select onValueChange={addModule}>
												<SelectTrigger className="w-[250px]">
													<SelectValue placeholder="Select a module to add..." />
												</SelectTrigger>
												<SelectContent>
													{getAvailableModules().map((module) => (
														<SelectItem key={module} value={module}>
															{module}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<span className="text-xs text-muted-foreground">
												{getAvailableModules().length} modules available
											</span>
										</div>
									)}
								</div>
							) : (
								<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
									{(currentPkg?.modules || allAvailableModules).map(
										(m: string) => (
											<div key={m} className="flex items-center gap-2 text-sm">
												<IconCheck className="h-4 w-4 text-green-500" />
												<span>{m}</span>
											</div>
										),
									)}
								</div>
							)}
						</div>{" "}
						<div className="flex justify-end gap-2 mt-6">
							{isEditing ? (
								<>
									<Button variant="outline" onClick={handleCancel}>
										Cancel
									</Button>
									<Button
										onClick={handleSave}
										className="bg-[#ffb400] hover:bg-[#ffb400]/90 text-black"
									>
										Save
									</Button>
								</>
							) : (
								<>
									<Button variant="outline" onClick={() => setOpen(false)}>
										Close
									</Button>
									<Button
										onClick={handleEdit}
										className="bg-[#ffb400] hover:bg-[#ffb400]/90 text-black flex items-center gap-2"
									>
										<IconPencil className="h-4 w-4" />
										Edit
									</Button>
								</>
							)}
						</div>
					</CardContent>
				</Card>
			</DialogContent>
		</Dialog>
	);
}
