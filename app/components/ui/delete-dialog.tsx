import { IconTrash, IconX } from "@tabler/icons-react";
import type { ReactNode } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteDialogProps {
	itemName: string;
	title?: string;
	description?: string;
	deleteButtonText?: string;
	onDelete: () => void;
	trigger: ReactNode;
	disabled?: boolean;
}

export function DeleteDialog({
	itemName,
	title,
	description,
	deleteButtonText,
	onDelete,
	trigger,
	disabled,
}: DeleteDialogProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild disabled={disabled}>
				{trigger}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex items-center justify-between">
						<AlertDialogTitle>{title || "Are you sure?"}</AlertDialogTitle>
						<Button
							variant="ghost"
							size="sm"
							className="h-6 w-6 p-0"
							onClick={() => {}}
						>
							<IconX className="h-4 w-4" />
						</Button>
					</div>
					<AlertDialogDescription>
						{description ||
							`This action cannot be undone. This will permanently delete ${itemName}.`}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete}>
						{deleteButtonText || "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
