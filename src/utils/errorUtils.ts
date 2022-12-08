export const mapRequestErrors = (e: { response: { data: { errors: [] } } }) => {
	return e.response.data.errors.map((error: { message: string }) => error.message);
};
