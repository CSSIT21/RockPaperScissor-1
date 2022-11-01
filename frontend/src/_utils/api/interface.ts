export type InfoResponse<T = any> = {
	success: boolean;
	message: string;
	code?: string;
	data?: T;
};

export type ErrorResponse = {
	success: boolean;
	message: string;
	code?: string;
	error?: string;
};

export class ApiError extends Error {
	public code: string;

	constructor(message, code) {
		super(message);
		this.message = message;
		this.code = code;
	}
}