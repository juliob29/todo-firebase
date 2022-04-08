import {firebaseConfig} from "../util/admin";
import * as firebase from "firebase/app";
import { validateLoginRequest } from "../util/validators";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"

/* This was confusing, but I think this is a different
initializeApp. The one in admin.ts is for the entire thing, 
and this is just for... user login? */

firebase.initializeApp(firebaseConfig);

const loginUser = async (request:any, response: any) => {
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

export {loginUser}