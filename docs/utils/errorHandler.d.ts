/**
 * Custom error class for API-related errors
 */
export declare class ApiError extends Error {
    statusCode?: number | undefined;
    constructor(message: string, statusCode?: number | undefined);
}
/**
 * Custom error class for network connectivity errors
 */
export declare class NetworkError extends Error {
    constructor(message: string);
}
/**
 * Custom error class for data validation errors
 */
export declare class ValidationError extends Error {
    constructor(message: string);
}
/**
 * Handles API errors gracefully
 * @param error - The error to handle
 */
export declare function handleApiError(error: Error): void;
/**
 * Handles network errors gracefully
 * @param error - The error to handle
 */
export declare function handleNetworkError(error: Error): void;
/**
 * Logs errors with context information
 * @param error - The error to log
 * @param context - Additional context about where the error occurred
 */
export declare function logError(error: Error, context?: string): void;
//# sourceMappingURL=errorHandler.d.ts.map