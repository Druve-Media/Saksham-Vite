import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SuperAdminSettings() {
	const [appName, setAppName] = useState("SocietyPro");
	const [defaultLanguage, setDefaultLanguage] = useState("en");
	const [defaultCurrency, setDefaultCurrency] = useState<string | number>(1);
	const [requiresApproval, setRequiresApproval] = useState(false);

	return (
		<div className="min-h-screen p-6 bg-background">
			<div className="max-w-7xl mx-auto">
				<div className="text-sm font-medium text-center border-b border-muted/60">
					<ul className="flex flex-wrap -mb-px">
						<li className="me-2">
							<a className="inline-block p-4 border-b-2 rounded-t-lg text-skin-base border-skin-base">
								App Settings
							</a>
						</li>
						<li className="me-2">
							<a className="inline-block p-4 border-b-2 rounded-t-lg border-transparent">
								Language Settings
							</a>
						</li>
						<li className="me-2">
							<a className="inline-block p-4 border-b-2 rounded-t-lg border-transparent">
								Storage Settings
							</a>
						</li>
						<li className="me-2">
							<a className="inline-block p-4 border-b-2 rounded-t-lg border-transparent">
								Theme Settings
							</a>
						</li>
						<li className="me-2">
							<a className="inline-block p-4 border-b-2 rounded-t-lg border-transparent">
								Currency Settings
							</a>
						</li>
						<li className="me-2">
							<a className="inline-block p-4 border-b-2 rounded-t-lg border-transparent">
								Email Settings
							</a>
						</li>
						<li className="me-2">
							<a className="inline-block p-4 border-b-2 rounded-t-lg border-transparent">
								Payment Gateway Settings
							</a>
						</li>
						<li className="me-2">
							<a className="inline-block p-4 border-b-2 rounded-t-lg border-transparent">
								Web Push Notification Keys
							</a>
						</li>
						<li className="me-2">
							<a className="inline-block p-4 border-b-2 rounded-t-lg border-transparent">
								Security Settings
							</a>
						</li>
					</ul>
				</div>

				<div className="grid grid-cols-1 pt-6">
					<div className="mx-4 p-4 mb-4 bg-card border rounded-lg shadow-sm dark:bg-secondary">
						<h3 className="mb-4 text-xl font-semibold">App Settings</h3>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								// stub: submit handler
								console.log({
									appName,
									defaultLanguage,
									defaultCurrency,
									requiresApproval,
								});
							}}
						>
							<div className="grid gap-6">
								<div className="grid lg:grid-cols-3 gap-6">
									<div>
										<label
											htmlFor="appName"
											className="block font-medium text-sm mb-2"
										>
											App Name
										</label>
										<Input
											id="appName"
											value={appName}
											onChange={(e) => setAppName(e.target.value)}
										/>
									</div>

									<div>
										<label
											htmlFor="defaultLanguage"
											className="block font-medium text-sm mb-2"
										>
											Default Language
										</label>
										<select
											id="defaultLanguage"
											value={defaultLanguage}
											onChange={(e) => setDefaultLanguage(e.target.value)}
											className="w-full rounded-md border bg-input"
										>
											<option value="en">English (English)</option>
										</select>
									</div>

									<div>
										<label
											htmlFor="defaultCurrency"
											className="block font-medium text-sm mb-2"
										>
											Default Currency
										</label>
										<select
											id="defaultCurrency"
											value={String(defaultCurrency)}
											onChange={(e) =>
												setDefaultCurrency(Number(e.target.value))
											}
											className="w-full rounded-md border bg-input"
										>
											<option value={1}>Dollars (USD)</option>
											<option value={2}>Rupee (INR)</option>
											<option value={3}>Pounds (GBP)</option>
											<option value={4}>Euros (EUR)</option>
										</select>
									</div>
								</div>

								<div>
									<div className="flex items-start gap-3">
										<input
											id="requiresApproval"
											type="checkbox"
											checked={requiresApproval}
											onChange={(e) => setRequiresApproval(e.target.checked)}
											className="rounded border text-indigo-600"
										/>

										<div className="flex flex-col">
											<label
												htmlFor="requiresApproval"
												className="text-sm font-semibold"
											>
												Society Requires Approval
											</label>
											<span className="text-sm text-muted-foreground mt-1">
												Enable this to require admin approval for new society
												registrations.
											</span>
										</div>
									</div>
								</div>

								<div>
									<Button type="submit" className="bg-[#e11d48]">
										Save
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
