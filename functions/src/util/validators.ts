const isEmpty = (str: string) => {
	if (str.trim() === '') return true;
	return false;
}

const validateLoginRequest = function(data: Record<string, string>) {
	let errors: Record<string, string> = {}
	if (isEmpty(data.email)) 
		errors.email = "Empty"
	if (isEmpty(data.password)) 
		errors.password = "Empty"
	return {
		errors, 
		valid: Object.keys(errors).length === 0
	}
}

export {validateLoginRequest}