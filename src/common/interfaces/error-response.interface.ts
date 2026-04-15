export interface ErrorResponse {
  success: boolean;
  statusCode: number;
  message: string | string[];
  error: string;
  path: string;
  timestamp: string;
  devMessage?: string; // Only shown in Dev Mode 👨‍🍳
}
