// import { Minus, Plus, RotateCcw } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { useBearStore } from "@/stores/demo-store";

// export default function Index() {
// 	const { bears, increase } = useBearStore();

// 	return (
// 		<div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-8">
// 			<div className="container mx-auto max-w-4xl">
// 				{/* Header */}
// 				<div className="text-center mb-12">
// 					<h1 className="text-4xl font-bold tracking-tight mb-4">
// 						🐻 Bear Counter Demo
// 					</h1>
// 					<p className="text-xl text-muted-foreground">
// 						A simple Zustand store demonstration with beautiful UI
// 					</p>
// 				</div>

// 				{/* Main Card */}
// 				<Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
// 					<CardHeader className="text-center pb-2">
// 						<CardTitle className="text-2xl">Current Bear Count</CardTitle>
// 						<CardDescription>
// 							Track your bear population with our interactive counter
// 						</CardDescription>
// 					</CardHeader>

// 					<CardContent className="text-center py-8">
// 						{/* Bear Count Display */}
// 						<div className="flex items-center justify-center mb-8">
// 							<Badge
// 								variant="secondary"
// 								className="text-6xl px-8 py-4 font-mono"
// 							>
// 								{bears}
// 							</Badge>
// 						</div>

// 						{/* Bear Emojis Visual */}
// 						<div className="mb-8">
// 							<div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
// 								{Array.from({ length: Math.min(bears, 20) }, (_, i) => (
// 									<span
// 										key={`bear-${i.toString()}`}
// 										className="text-2xl animate-pulse"
// 									>
// 										🐻
// 									</span>
// 								))}
// 								{bears > 20 && (
// 									<span className="text-lg text-muted-foreground ml-2">
// 										+{bears - 20} more...
// 									</span>
// 								)}
// 							</div>
// 						</div>

// 						<Separator className="my-6" />

// 						{/* Action Buttons */}
// 						<div className="flex flex-wrap justify-center gap-4">
// 							<Button
// 								onClick={() => increase(1)}
// 								size="lg"
// 								className="min-w-32"
// 							>
// 								<Plus className="mr-2 h-4 w-4" />
// 								Add 1 Bear
// 							</Button>

// 							<Button
// 								onClick={() => increase(5)}
// 								size="lg"
// 								variant="secondary"
// 								className="min-w-32"
// 							>
// 								<Plus className="mr-2 h-4 w-4" />
// 								Add 5 Bears
// 							</Button>

// 							<Button
// 								onClick={() => increase(-1)}
// 								size="lg"
// 								variant="outline"
// 								disabled={bears <= 0}
// 								className="min-w-32"
// 							>
// 								<Minus className="mr-2 h-4 w-4" />
// 								Remove 1
// 							</Button>

// 							<Button
// 								onClick={() => increase(-bears)}
// 								size="lg"
// 								variant="destructive"
// 								disabled={bears <= 0}
// 								className="min-w-32"
// 							>
// 								<RotateCcw className="mr-2 h-4 w-4" />
// 								Reset
// 							</Button>
// 						</div>
// 					</CardContent>

// 					<CardFooter className="justify-center">
// 						<p className="text-sm text-muted-foreground">
// 							Powered by Zustand state management
// 						</p>
// 					</CardFooter>
// 				</Card>

// 				{/* Stats Card */}
// 				<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
// 					<Card>
// 						<CardHeader className="pb-3">
// 							<CardTitle className="text-sm font-medium">Total Bears</CardTitle>
// 						</CardHeader>
// 						<CardContent>
// 							<div className="text-2xl font-bold">{bears}</div>
// 						</CardContent>
// 					</Card>

// 					<Card>
// 						<CardHeader className="pb-3">
// 							<CardTitle className="text-sm font-medium">Status</CardTitle>
// 						</CardHeader>
// 						<CardContent>
// 							<div className="text-2xl font-bold">
// 								{bears === 0 ? "Empty" : bears < 10 ? "Few" : "Many"}
// 							</div>
// 						</CardContent>
// 					</Card>

// 					<Card>
// 						<CardHeader className="pb-3">
// 							<CardTitle className="text-sm font-medium">Bear Emojis</CardTitle>
// 						</CardHeader>
// 						<CardContent>
// 							<div className="text-2xl font-bold">{Math.min(bears, 20)}/20</div>
// 						</CardContent>
// 					</Card>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

import { Navigate } from "react-router";

export default function Index() {
  return <Navigate to="/dashboard" replace />;
}
