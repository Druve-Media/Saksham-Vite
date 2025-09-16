import { useNavigate } from "react-router";
import { LoginForm } from "@/components/login-form";
import { useAuthStore } from "@/stores/auth-store";

export default function LoginPage() {
	const login = useAuthStore((s) => s.login);
	const navigate = useNavigate();

	const handleLogin = (data: { mobile: string }) => {
		// Demo only — no API
		login({
			name: "Demo User",
			email: `${data.mobile}@demo.com`,
			avatar: "https://avatar.vercel.sh/demo",
			mobile: data.mobile,
		});
		navigate("/society-admin/dashboard", { replace: true });
	};

	return (
		<div className="    overflow-hidden  bg-background   shadow-lg">
			<LoginForm onLogin={handleLogin} />
		</div>
	);
}
