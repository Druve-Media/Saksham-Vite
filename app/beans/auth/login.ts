export interface RequestOtpResponse {
	status: string;
	data: {
		reqId: string;
		role: string;
	};
}

export interface LoginResponse {
	status: string;
	data: {
		token: string;
	};
	sub: string;
	society_id: string;
	role: string;
}
