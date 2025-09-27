export interface Society {
	society_id: string;
	name: string;
	role: string;
	status: string;
}

export interface RequestOtpResponse {
	status: string;
	data: {
		reqId: string;
		societies: Society[];
	};
}

export interface LoginResponse {
	status: string;
	data: {
		token: string;
	};
	sub: string;
	role: string;
	society_id: string;
	society_status: string;
}
