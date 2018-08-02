
export function responseErrorHandler(errorResponse: any): string {
    if (errorResponse.response && errorResponse.response.data && errorResponse.response.data.errors) {
        return errorResponse.response.data.errors.map((error: any) => error.message);
    } else {
        return errorResponse.toString();
    }
}