import { useMutation } from "@tanstack/react-query";
import { requestOtp, verifyLogin } from "@/api/auth";

export const useRequestOtp = () => {
	return useMutation({
		mutationFn: (phone: number) => requestOtp(phone),
	});
};

export const useLogin = () => {
	return useMutation({
		mutationFn: (payload: { phone: number; reqId: string; otp: string }) =>
			verifyLogin(payload),
	});
};
