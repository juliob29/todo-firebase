import {admin, db} from "../util/admin";
import {firebaseConfig} from "../util/admin";
import * as firebase from "firebase/app";
import { validateLoginRequest } from "../util/validators";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"

/* This was confusing, but I think this is a different
initializeApp. The one in admin.ts is for the entire thing, 
and this is just for... user login? */

firebase.initializeApp(firebaseConfig);

const loginUser = async (request:any, response: any) => {

	let loginRequest = {
		email: request.params.email,
		password: request.params.password
	}

	let {errors, valid} = validateLoginRequest(loginRequest);

	if (!valid)
		return response.status(400).json({errors});
	
	/* at this point, we presumably have an email and password */
	/* now, we can use firebase API to login */

	const auth = getAuth()
	try {
		let signInStatus = await signInWithEmailAndPassword(auth, loginRequest.email, loginRequest.password);
		return response.json(signInStatus.user.getIdToken());
	} catch (e) {
		return response.status(403).json({general: "Wrong Credentials! Try again."})
	}
};

export {loginUser}