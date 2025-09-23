"use client";

import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Action = {
	label: string;
	onClick: () => void;
	variant?: "default" | "danger";
};

type RowActionsMenuProps = {
	actions: Action[];
};

export function RowActionsMenu({ actions }: RowActionsMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" className="h-8 w-8">
					<MoreVertical className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{actions.map((action, index) => (
					<DropdownMenuItem
						key={index}
						onClick={action.onClick}
						className={action.variant === "danger" ? "text-red-600" : ""}
					>
						{action.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
