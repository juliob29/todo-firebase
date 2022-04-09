import { db } from "./admin";

const isEmpty = (str: string) => {
	if (!str) 
		return true;

	if (str.trim() === '') return true;
	return false;
}

const isValidEmail = function (email: string) {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(emailRegEx)) return true;
	else return false;
}

const validateSignUpRequest = async(data: Record<string, string>) => {
		let errors: Record<string, string> = {};

		if (isEmpty(data.email)) {
			errors.email = 'Must not be empty';
		} else if (!isValidEmail(data.email)) {
			errors.email = 'Must be valid email address';
		}

		if (isEmpty(data.firstName)) errors.firstName = 'Must not be empty';
		if (isEmpty(data.lastName)) errors.lastName = 'Must not be empty';
		if (isEmpty(data.phoneNumber)) errors.phoneNumber = 'Must not be empty';
		if (isEmpty(data.country)) errors.country = 'Must not be empty';

		if (isEmpty(data.password)) errors.password = 'Must not be empty';
		if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passowrds must be the same';
		if (isEmpty(data.username)) errors.username = 'Must not be empty';
		else {
			/* Let's also ensure username isn't in use... */
			let doc = await db.doc(`/users/$(data.username)`).get()
			if (doc.exists) {
				errors.username = "Username already in use."
			}
		}

		return {
			errors,
			valid: Object.keys(errors).length === 0
		};
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

export {validateLoginRequest, validateSignUpRequest}