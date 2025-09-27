import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { requestOtp, verifyLogin } from "@/api/auth";
import { useToast } from "@/components/ui/use-toast";

export const useRequestOtp = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: (phone: number) => requestOtp(phone),
		onSuccess: () => {
			toast({
				title: "Success",
				description: "OTP sent successfully",
				variant: "default",
			});
		},
		onError: (error: AxiosError<{ message?: string }>) => {
			const message =
				error?.response?.data?.message ||
				"Failed to send OTP. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		},
	});
};

export const useLogin = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: (payload: {
			phone: number;
			reqId: string;
			otp: string;
			society_id: string;
		}) => verifyLogin(payload),
		onSuccess: () => {
			toast({
				title: "Success",
				description: "Login successful",
				variant: "default",
			});
		},
		onError: (error: AxiosError<{ message?: string }>) => {
			const message =
				error?.response?.data?.message || "Failed to login. Please try again.";
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
		},
	});
};
