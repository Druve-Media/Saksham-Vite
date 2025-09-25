import type { LoginResponse, RequestOtpResponse } from "@/beans/auth/login";
import { postRequest } from "@/components/configurations/axios-config/Axiosclient";

export const requestOtp = (phone: number) =>
	postRequest<RequestOtpResponse>("/auth/request-otp", { phone });

export const verifyLogin = (payload: {
	phone: number;
	reqId: string;
	otp: string;
}) => postRequest<LoginResponse>("/auth/login", payload);
