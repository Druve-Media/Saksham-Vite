// import constants from "@/components/configurations/axios-config/Constants";
// import axios, { AxiosError } from "axios";
// import type { InternalAxiosRequestConfig } from "axios";

// let isRefreshing = false;
// let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void }[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// const axiosClient = axios.create({
//   baseURL: constants.HOST_URL_OLD,
//   withCredentials: true,
// });

// axiosClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.set("Authorization", `Bearer ${token}`);
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosClient.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const originalRequest: any = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.set("Authorization", `Bearer ${token}`);
//             return axiosClient(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         if (!refreshToken) throw new Error("No refresh token");

//         // 👉 replace with your actual refresh endpoint
//         const { data } = await axios.post(`${constants.HOST_URL_OLD}/auth/refresh`, {
//           refreshToken,
//         });

//         const newAccessToken = (data as any)?.accessToken;
//         localStorage.setItem("accessToken", newAccessToken);

//         axiosClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
//         processQueue(null, newAccessToken);

//         return axiosClient(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login"; // or React Router redirect
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // --- ✅ Helper API methods ---
// function handleApiError(error: any) {
//   console.error("API Error:", error);
//   throw error;
// }

// export function get(URL: string, payload?: object | FormData) {
//   return axiosClient.get(URL, { params: payload }).catch(handleApiError);
// }

// export function postRequest(URL: string, payload: object | FormData) {
//   return axiosClient.post(URL, payload).catch(handleApiError);
// }

// export function put(URL: string, payload: object | FormData) {
//   return axiosClient.put(URL, payload).catch(handleApiError);
// }

// export function patch(URL: string, payload?: object | FormData) {
//   return axiosClient.patch(URL, payload).catch(handleApiError);
// }

// export function deleteReq(URL: string, payload?: object | FormData) {
//   return axiosClient.delete(URL, { data: payload }).catch(handleApiError);
// }

// export default axiosClient;

import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios, { type AxiosError } from "axios";
import constants from "@/components/configurations/axios-config/Constants";
import { useAuthStore } from "@/stores/auth-store";

let isRefreshing = false;
let failedQueue: {
	resolve: (value?: unknown) => void;
	reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) prom.reject(error);
		else prom.resolve(token);
	});
	failedQueue = [];
};

const axiosClient = axios.create({
	baseURL: constants.HOST_URL_OLD,
	withCredentials: false,
});
console.log(constants.HOST_URL_OLD, "localhost:5771/v1");
// --- Request Interceptor ---
axiosClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = useAuthStore.getState().user?.token;
		// const token = localStorage.getItem("accessToken");
		console.log(token, "token ");
		if (token) {
			config.headers = config.headers || {};
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// --- Response Interceptor ---
axiosClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const originalRequest: any = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers["Authorization"] = `Bearer ${token}`;
						return axiosClient(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const refreshToken = localStorage.getItem("refreshToken");
				if (!refreshToken) throw new Error("No refresh token");

				const { data } = await axios.post<{ accessToken: string }>(
					`${constants.HOST_URL_OLD}/auth/refresh`,
					{ refreshToken },
				);

				const newAccessToken = data.accessToken;
				localStorage.setItem("accessToken", newAccessToken);

				axiosClient.defaults.headers.common["Authorization"] =
					`Bearer ${newAccessToken}`;
				processQueue(null, newAccessToken);

				return axiosClient(originalRequest);
			} catch (err) {
				processQueue(err, null);
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				window.location.href = "/login";
				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);

// --- Error Handler ---
function handleApiError(error: any): never {
	console.error("API Error:", error);
	throw error;
}

// --- Generic Helpers (always unwrap .data) ---
export async function get<T>(URL: string, payload?: object): Promise<T> {
	try {
		const res: AxiosResponse<T> = await axiosClient.get(URL, {
			params: payload,
		});
		return res.data;
	} catch (err) {
		handleApiError(err);
	}
}

export async function postRequest<T>(
	URL: string,
	payload: object | FormData,
): Promise<T> {
	try {
		const res: AxiosResponse<T> = await axiosClient.post(URL, payload);
		console.log(URL, "payloadddd");
		return res.data;
	} catch (err) {
		handleApiError(err);
	}
}

export async function put<T>(
	URL: string,
	payload: object | FormData,
): Promise<T> {
	try {
		const res: AxiosResponse<T> = await axiosClient.put(URL, payload);
		return res.data;
	} catch (err) {
		handleApiError(err);
	}
}

export async function patch<T>(
	URL: string,
	payload?: object | FormData,
): Promise<T> {
	try {
		const res: AxiosResponse<T> = await axiosClient.patch(URL, payload);
		return res.data;
	} catch (err) {
		handleApiError(err);
	}
}

export async function deleteReq<T>(
	URL: string,
	payload?: object | FormData,
): Promise<T> {
	try {
		const res: AxiosResponse<T> = await axiosClient.delete(URL, {
			data: payload,
		});
		return res.data;
	} catch (err) {
		handleApiError(err);
	}
}

export default axiosClient;
