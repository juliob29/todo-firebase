import {db, firebaseConfig} from "../util/admin";
import * as firebase from "firebase/app";
import { validateLoginRequest, validateSignUpRequest } from "../util/validators";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth"

/* This was confusing, but I think this is a different
initializeApp. The one in admin.ts is for the entire thing, 
and this is just for... user login? */

firebase.initializeApp(firebaseConfig);

export const loginUser = async (request:any, response: any) => {
	console.log("loginUser is running...");

	let loginRequest = {
		email: request.body.email,
		password: request.body.password
	}
	console.log(loginRequest);

	let {errors, valid} = validateLoginRequest(loginRequest);

	console.log(errors);
	console.log(valid);


	if (!valid)
		return response.status(400).json({errors});
	
	/* at this point, we presumably have an email and password */
	/* now, we can use firebase API to login */

	const auth = getAuth()
	try {
		let signInStatus = await signInWithEmailAndPassword(auth, loginRequest.email, loginRequest.password);
		let token: string = await signInStatus.user.getIdToken();
		return response.json(token);
	} catch (e) {
		return response.status(403).json({general: "Wrong Credentials! Try again."})
	}
};

export const signUpUser = async (request:any, response:any) => {
	let signUpInfo: Record<string, string> = {
		firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber,
        country: request.body.country,
		password: request.body.password,
		confirmPassword: request.body.confirmPassword,
		username: request.body.username
	}

	let {errors, valid} = await validateSignUpRequest(signUpInfo);
	if (!valid) {
		return response.status(400).json(errors);
	}

	const auth = getAuth();
	try {
		let signUpStatus = await createUserWithEmailAndPassword(auth, signUpInfo.email, signUpInfo.password);
		const token = await signUpStatus.user.getIdToken();
		/* Signup successful. Let's create a document for this user. */

		/* Want to include user id, along with when it was created */
		signUpInfo.userId = signUpStatus.user.uid;
		signUpInfo.createdAt = new Date().toISOString();

		/* this is the call to set the document at this location */
		await db.doc(`/users/${signUpStatus.user.uid}`).set(signUpInfo);

		
		return response.status(201).json({token});
	} catch (e : any) {
		let error : string;
		console.log(e);
		if (e.code === 'auth/email-already-in-use') {
			error = "Email already in use."
		} else {
			error = "Something went wrong... Please try again."
		}
		return response.status(500).json({error_message: error});
	}

}
